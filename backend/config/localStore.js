import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.resolve(__dirname, '../data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

let inMemoryDb = {
  users: [],
  presentations: []
};

const ensureDbLoaded = () => {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (fs.existsSync(DB_FILE)) {
      const raw = fs.readFileSync(DB_FILE, 'utf8');
      inMemoryDb = JSON.parse(raw);
      if (!Array.isArray(inMemoryDb.users)) inMemoryDb.users = [];
      if (!Array.isArray(inMemoryDb.presentations)) inMemoryDb.presentations = [];
    } else {
      saveDbToFile();
    }
  } catch (err) {
    console.error('[LocalStore] Error reading local db file:', err.message);
  }
};

const saveDbToFile = () => {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(inMemoryDb, null, 2), 'utf8');
  } catch (err) {
    console.error('[LocalStore] Error saving local db file:', err.message);
  }
};

export const initLocalStore = () => {
  ensureDbLoaded();
  console.log(`[LocalStore] Initialized file-based database at ${DB_FILE}`);
};

const sanitizeUser = (user, includePassword = false) => {
  if (!user) return null;
  const clone = { ...user };
  if (!includePassword) {
    delete clone.password;
  }
  return clone;
};

// Emulate Mongoose User Model
export const localUserStore = {
  async exists(filter = {}) {
    ensureDbLoaded();
    const found = inMemoryDb.users.some((u) => {
      if (filter.email && u.email?.toLowerCase() === filter.email?.toLowerCase()) return true;
      if (filter._id && (u._id === filter._id || u.id === filter._id)) return true;
      if (filter.id && (u.id === filter.id || u._id === filter.id)) return true;
      return false;
    });
    return Boolean(found);
  },

  async create(userData) {
    ensureDbLoaded();
    const id = `usr_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    const now = new Date().toISOString();
    const user = {
      id,
      _id: id,
      name: userData.name,
      email: userData.email.toLowerCase(),
      password: userData.password,
      plan: userData.plan || 'Free',
      avatar: userData.avatar || '',
      createdAt: now,
      updatedAt: now
    };
    inMemoryDb.users.push(user);
    saveDbToFile();
    return sanitizeUser(user, false);
  },

  findOne(filter = {}) {
    ensureDbLoaded();
    let includePassword = false;

    const findMatch = () => {
      return inMemoryDb.users.find((u) => {
        if (filter.email && u.email?.toLowerCase() === filter.email?.toLowerCase()) return true;
        if (filter._id && (u._id === filter._id || u.id === filter._id)) return true;
        if (filter.id && (u.id === filter.id || u._id === filter.id)) return true;
        return false;
      }) || null;
    };

    const queryPromise = Promise.resolve().then(() => {
      const match = findMatch();
      return sanitizeUser(match, includePassword);
    });

    queryPromise.select = (projection) => {
      if (typeof projection === 'string' && projection.includes('+password')) {
        includePassword = true;
      }
      return Promise.resolve().then(() => {
        const match = findMatch();
        return sanitizeUser(match, includePassword);
      });
    };

    return queryPromise;
  },

  async findById(id) {
    ensureDbLoaded();
    const user = inMemoryDb.users.find((u) => u.id === id || u._id === id);
    return sanitizeUser(user, false);
  },

  async findByIdAndUpdate(id, updates = {}, _options = {}) {
    ensureDbLoaded();
    const index = inMemoryDb.users.findIndex((u) => u.id === id || u._id === id);
    if (index === -1) return null;

    const current = inMemoryDb.users[index];
    const updated = {
      ...current,
      ...updates,
      updatedAt: new Date().toISOString()
    };
    inMemoryDb.users[index] = updated;
    saveDbToFile();
    return sanitizeUser(updated, false);
  }
};

// Emulate Mongoose Presentation Model
export const localPresentationStore = {
  find(filter = {}) {
    ensureDbLoaded();
    const userId = filter.userId?.toString();
    const items = inMemoryDb.presentations.filter((p) => p.userId === userId);

    const resultPromise = Promise.resolve(items.map((item) => wrapPresentationDoc(item)));

    resultPromise.sort = (_sortObj) => {
      // Typically sort by createdAt: -1
      return Promise.resolve(
        [...items]
          .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
          .map((item) => wrapPresentationDoc(item))
      );
    };

    return resultPromise;
  },

  async create(doc) {
    ensureDbLoaded();
    const userId = doc.userId?.toString();
    const reportId = doc.report?.id;
    const now = new Date().toISOString();

    // Check if report already exists for user (upsert behavior)
    const existingIndex = inMemoryDb.presentations.findIndex(
      (p) => p.userId === userId && p.report?.id === reportId
    );

    let record;
    if (existingIndex !== -1) {
      record = {
        ...inMemoryDb.presentations[existingIndex],
        report: doc.report,
        updatedAt: now
      };
      inMemoryDb.presentations[existingIndex] = record;
    } else {
      const id = `pres_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
      record = {
        id,
        _id: id,
        userId,
        report: doc.report,
        createdAt: now,
        updatedAt: now
      };
      inMemoryDb.presentations.push(record);
    }

    saveDbToFile();
    return wrapPresentationDoc(record);
  },

  async findOne(filter = {}) {
    ensureDbLoaded();
    const userId = filter.userId?.toString();
    const reportId = filter['report.id'];

    const found = inMemoryDb.presentations.find(
      (p) => p.userId === userId && p.report?.id === reportId
    );

    return found ? wrapPresentationDoc(found) : null;
  },

  async deleteOne(filter = {}) {
    ensureDbLoaded();
    const userId = filter.userId?.toString();
    const reportId = filter['report.id'];

    const prevLength = inMemoryDb.presentations.length;
    inMemoryDb.presentations = inMemoryDb.presentations.filter(
      (p) => !(p.userId === userId && p.report?.id === reportId)
    );
    const deletedCount = prevLength - inMemoryDb.presentations.length;
    if (deletedCount > 0) {
      saveDbToFile();
    }
    return { acknowledged: true, deletedCount };
  }
};

const wrapPresentationDoc = (raw) => {
  return {
    ...raw,
    userId: raw.userId,
    report: raw.report,
    createdAt: raw.createdAt,
    updatedAt: raw.updatedAt,
    async save() {
      ensureDbLoaded();
      const idx = inMemoryDb.presentations.findIndex((p) => p.id === raw.id || p._id === raw.id);
      if (idx !== -1) {
        raw.updatedAt = new Date().toISOString();
        inMemoryDb.presentations[idx] = { ...raw };
        saveDbToFile();
      }
      return this;
    }
  };
};

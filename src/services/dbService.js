import { INITIAL_DEMO_PRESENTATIONS } from '../data/demoPresentations';

const DB_KEYS = {
  USERS: 'slidescore_db_users_v2',
  SESSIONS: 'slidescore_db_session_v2',
  PRESENTATIONS: 'slidescore_db_presentations_v2'
};

// Default seed user
const DEFAULT_USERS = [
  {
    id: 'usr-default-001',
    name: 'Alex Morgan',
    email: 'alex.morgan@slidescore.ai',
    password: 'password123',
    plan: 'Pro',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    createdAt: '2026-10-01'
  },
  {
    id: 'usr-default-002',
    name: 'Demo User',
    email: 'user@slidescore.ai',
    password: 'password123',
    plan: 'Free',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=250',
    createdAt: '2026-10-02'
  }
];

// Simple hashing simulation
const hashPassword = (pwd) => btoa(encodeURIComponent(pwd));

// Initialize Database Tables
export const initDatabase = () => {
  try {
    // 1. Users Table
    const existingUsers = localStorage.getItem(DB_KEYS.USERS);
    if (!existingUsers) {
      localStorage.setItem(DB_KEYS.USERS, JSON.stringify(DEFAULT_USERS));
    }

    // 2. Presentations Table
    const existingPresentations = localStorage.getItem(DB_KEYS.PRESENTATIONS);
    if (!existingPresentations) {
      // Assign initial demo presentations to default user
      const seeded = INITIAL_DEMO_PRESENTATIONS.map(p => ({
        ...p,
        userId: 'usr-default-001'
      }));
      localStorage.setItem(DB_KEYS.PRESENTATIONS, JSON.stringify(seeded));
    }
  } catch (err) {
    console.error('Database initialization error:', err);
  }
};

// Helper: Read table
const readTable = (key) => {
  initDatabase();
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
};

// Helper: Write table
const writeTable = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error(`Failed to write to table ${key}:`, e);
  }
};

// User Registration
export const registerUser = ({ name, email, password }) => {
  const normalizedEmail = email.trim().toLowerCase();
  const users = readTable(DB_KEYS.USERS);

  const existing = users.find(u => u.email.toLowerCase() === normalizedEmail);
  if (existing) {
    throw new Error('An account with this email address already exists.');
  }

  const newUser = {
    id: `usr-${Date.now()}`,
    name: name.trim(),
    email: normalizedEmail,
    password: password, // preserved plain text for simple local check
    plan: 'Free',
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`,
    createdAt: new Date().toISOString().split('T')[0]
  };

  const updatedUsers = [...users, newUser];
  writeTable(DB_KEYS.USERS, updatedUsers);

  // Auto-login newly registered user
  const session = {
    isLoggedIn: true,
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      plan: newUser.plan,
      avatar: newUser.avatar,
      createdAt: newUser.createdAt
    },
    token: `token-${Date.now()}`
  };

  writeTable(DB_KEYS.SESSIONS, session);
  return session;
};

// User Login
export const loginUser = ({ email, password }) => {
  const normalizedEmail = email.trim().toLowerCase();
  const users = readTable(DB_KEYS.USERS);

  const user = users.find(u => u.email.toLowerCase() === normalizedEmail);
  if (!user) {
    throw new Error('No account found with this email address.');
  }

  if (user.password !== password) {
    throw new Error('Incorrect password. Please try again.');
  }

  const session = {
    isLoggedIn: true,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      plan: user.plan,
      avatar: user.avatar,
      createdAt: user.createdAt
    },
    token: `token-${Date.now()}`
  };

  writeTable(DB_KEYS.SESSIONS, session);
  return session;
};

// User Logout
export const logoutUser = () => {
  const emptySession = {
    isLoggedIn: false,
    user: null,
    token: null
  };
  writeTable(DB_KEYS.SESSIONS, emptySession);
  return emptySession;
};

// Get Current Logged In Session
export const getActiveSession = () => {
  initDatabase();
  try {
    const raw = localStorage.getItem(DB_KEYS.SESSIONS);
    if (!raw) {
      // Default to logged-in Alex Morgan for smooth demo startup
      const defaultSession = {
        isLoggedIn: true,
        user: DEFAULT_USERS[0],
        token: 'token-default-alex'
      };
      writeTable(DB_KEYS.SESSIONS, defaultSession);
      return defaultSession;
    }
    return JSON.parse(raw);
  } catch (e) {
    return { isLoggedIn: false, user: null };
  }
};

// Profile Update
export const updateUserProfile = (userId, updates) => {
  const users = readTable(DB_KEYS.USERS);
  const updatedUsers = users.map(u => {
    if (u.id === userId) {
      return { ...u, ...updates };
    }
    return u;
  });
  writeTable(DB_KEYS.USERS, updatedUsers);

  // Update active session if matches
  const activeSession = getActiveSession();
  if (activeSession.user && activeSession.user.id === userId) {
    activeSession.user = { ...activeSession.user, ...updates };
    writeTable(DB_KEYS.SESSIONS, activeSession);
  }
  return activeSession;
};

// User Specific Presentation Management
export const getUserPresentations = (userId) => {
  const allPresentations = readTable(DB_KEYS.PRESENTATIONS);
  if (!userId) return allPresentations;
  return allPresentations.filter(p => p.userId === userId || !p.userId);
};

export const saveUserPresentation = (userId, presentation) => {
  const allPresentations = readTable(DB_KEYS.PRESENTATIONS);
  const record = { ...presentation, userId: userId || 'usr-default-001' };
  const updated = [record, ...allPresentations];
  writeTable(DB_KEYS.PRESENTATIONS, updated);
  return record;
};

export const deleteUserPresentation = (id) => {
  const allPresentations = readTable(DB_KEYS.PRESENTATIONS);
  const filtered = allPresentations.filter(p => p.id !== id);
  writeTable(DB_KEYS.PRESENTATIONS, filtered);
  return filtered;
};


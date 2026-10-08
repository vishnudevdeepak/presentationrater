import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const publicUser = (user) => ({
  id: (user.id || user._id)?.toString(),
  name: user.name,
  email: user.email,
  plan: user.plan || 'Free',
  avatar: user.avatar,
  createdAt: user.createdAt
});

const createSession = (user, res, status = 200) => {
  const userId = (user.id || user._id)?.toString();
  const token = jwt.sign(
    { sub: userId },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
  res.status(status).json({
    isLoggedIn: true,
    user: publicUser(user),
    token
  });
};

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (typeof name !== 'string' || !name.trim() ||
      typeof email !== 'string' || !email.trim() ||
      typeof password !== 'string' || password.length < 6) {
    return res.status(400).json({
      message: 'Name, a valid email, and a password of at least 6 characters are required.'
    });
  }

  const normalizedEmail = email.trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
    return res.status(400).json({ message: 'Please provide a valid email address.' });
  }
  const existingUser = await User.exists({ email: normalizedEmail });
  if (existingUser) {
    return res.status(409).json({ message: 'An account with this email address already exists.' });
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const user = await User.create({
    name: name.trim(),
    email: normalizedEmail,
    password: passwordHash,
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name.trim())}`
  });
  return createSession(user, res, 201);
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (typeof email !== 'string' || typeof password !== 'string') {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  const user = await User.findOne({ email: email.trim().toLowerCase() }).select('+password');
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid email or password.' });
  }
  return createSession(user, res);
};

export const getCurrentUser = (req, res) => {
  res.json({ user: publicUser(req.user) });
};

export const updateProfile = async (req, res) => {
  const updates = {};
  if (typeof req.body.name === 'string' && req.body.name.trim()) {
    updates.name = req.body.name.trim();
  } else if (req.body.name !== undefined) {
    return res.status(400).json({ message: 'Name cannot be empty.' });
  }

  if (typeof req.body.email === 'string' && req.body.email.trim()) {
    updates.email = req.body.email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(updates.email)) {
      return res.status(400).json({ message: 'Please provide a valid email address.' });
    }
  } else if (req.body.email !== undefined) {
    return res.status(400).json({ message: 'Email cannot be empty.' });
  }

  const userId = (req.user.id || req.user._id)?.toString();
  const user = await User.findByIdAndUpdate(userId, updates, {
    new: true,
    runValidators: true
  });
  res.json({ user: publicUser(user) });
};

export const logout = (_req, res) => {
  res.json({ isLoggedIn: false, user: null, token: null });
};

import mongoose from 'mongoose';
import { initLocalStore } from './localStore.js';

let fallbackMode = false;

export const isFallbackMode = () => fallbackMode;

export const connectDatabase = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.log('[Database] Notice: No MONGODB_URI configured. Running in persistent local JSON store mode.');
    fallbackMode = true;
    initLocalStore();
    return;
  }

  try {
    // Attempt MongoDB connection with 2.5s timeout
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 2500 });
    fallbackMode = false;
    console.log('[Database] Connected to MongoDB database successfully.');
  } catch (error) {
    console.warn(`[Database] Notice: Could not connect to MongoDB (${error.message}).`);
    console.log('[Database] Switching automatically to persistent local JSON store mode.');
    fallbackMode = true;
    initLocalStore();
  }
};

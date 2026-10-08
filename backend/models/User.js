import mongoose from 'mongoose';
import { isFallbackMode } from '../config/database.js';
import { localUserStore } from '../config/localStore.js';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    maxlength: 254
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  plan: {
    type: String,
    default: 'Free'
  },
  avatar: {
    type: String,
    default: ''
  }
}, { timestamps: true });

const MongooseUserModel = mongoose.models.User || mongoose.model('User', userSchema);

const User = new Proxy(MongooseUserModel, {
  get(target, prop, receiver) {
    if (isFallbackMode()) {
      if (prop in localUserStore) {
        return localUserStore[prop];
      }
    }
    return Reflect.get(target, prop, receiver);
  }
});

export default User;

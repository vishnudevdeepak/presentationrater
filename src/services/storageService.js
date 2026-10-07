import {
  initDatabase,
  getUserPresentations,
  saveUserPresentation,
  deleteUserPresentation,
  getActiveSession,
  loginUser,
  registerUser,
  logoutUser,
  updateUserProfile
} from './dbService';

export const initStorage = () => {
  initDatabase();
};

export const getPresentations = (userId) => {
  return getUserPresentations(userId);
};

export const getPresentationById = (id) => {
  const presentations = getUserPresentations();
  return presentations.find(p => p.id === id) || null;
};

export const savePresentation = (presentationData, userId) => {
  return saveUserPresentation(userId, presentationData);
};

export const deletePresentation = (id) => {
  return deleteUserPresentation(id);
};

// User Auth API Wrappers
export const getUserAuth = () => {
  return getActiveSession();
};

export const performLogin = ({ email, password }) => {
  return loginUser({ email, password });
};

export const performSignup = ({ name, email, password }) => {
  return registerUser({ name, email, password });
};

export const performLogout = () => {
  return logoutUser();
};

export const updateProfile = (userId, updates) => {
  return updateUserProfile(userId, updates);
};

// Theme preference
export const getStoredTheme = () => {
  try {
    return localStorage.getItem('slidescore_theme_v1') || 'light';
  } catch (e) {
    return 'light';
  }
};

export const setStoredTheme = (theme) => {
  try {
    localStorage.setItem('slidescore_theme_v1', theme);
  } catch (e) {
    console.error('Error storing theme:', e);
  }
};

import {
  deleteUserPresentation,
  getActiveSession,
  getUserPresentation,
  getUserPresentations,
  initDatabase,
  loginUser,
  logoutUser,
  refreshSession,
  registerUser,
  saveUserPresentation,
  updateUserProfile
} from './dbService';

export const initStorage = initDatabase;
export const getPresentations = () => getUserPresentations();
export const getPresentationById = (id) => getUserPresentation(id);
export const savePresentation = (presentationData, userId) => saveUserPresentation(userId, presentationData);
export const deletePresentation = (id) => deleteUserPresentation(id);

export const getUserAuth = getActiveSession;
export const refreshUserAuth = refreshSession;
export const performLogin = loginUser;
export const performSignup = registerUser;
export const performLogout = logoutUser;
export const updateProfile = updateUserProfile;

export const getStoredTheme = () => {
  try {
    return localStorage.getItem('slidescore_theme_v1') || 'light';
  } catch {
    return 'light';
  }
};

export const setStoredTheme = (theme) => {
  try {
    localStorage.setItem('slidescore_theme_v1', theme);
  } catch (error) {
    console.error('Error storing theme:', error);
  }
};

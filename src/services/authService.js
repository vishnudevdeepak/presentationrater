import {
  getActiveSession,
  refreshSession,
  loginUser,
  registerUser,
  logoutUser,
  updateUserProfile
} from './dbService';

export const getSession = () => getActiveSession();
export const refreshAuth = () => refreshSession();
export const login = (credentials) => loginUser(credentials);
export const register = (userData) => registerUser(userData);
export const logout = () => logoutUser();
export const updateProfile = (userId, updates) => updateUserProfile(userId, updates);

export default {
  getSession,
  refreshAuth,
  login,
  register,
  logout,
  updateProfile
};

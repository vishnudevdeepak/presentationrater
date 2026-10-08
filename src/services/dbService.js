const SESSION_KEY = 'slidescore_api_session_v1';
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const readSession = () => {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY)) || {
      isLoggedIn: false,
      user: null,
      token: null
    };
  } catch {
    return { isLoggedIn: false, user: null, token: null };
  }
};

const saveSession = (session) => {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
};

const clearSession = () => saveSession({
  isLoggedIn: false,
  user: null,
  token: null
});

const request = async (path, { method = 'GET', body, authenticated = true } = {}) => {
  const session = readSession();
  const headers = { 'Content-Type': 'application/json' };
  if (authenticated && session.token) {
    headers.Authorization = `Bearer ${session.token}`;
  }

  let response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      method,
      headers,
      body: body === undefined ? undefined : JSON.stringify(body)
    });
  } catch {
    throw new Error('Could not reach the server. Make sure the backend is running.');
  }

  if (!response.ok) {
    let message = `Request failed (${response.status}).`;
    try {
      const result = await response.json();
      message = result.message || message;
    } catch {
      // Use the HTTP status message when the response is not JSON.
    }
    const error = new Error(message);
    error.status = response.status;
    if (response.status === 401 && authenticated) {
      clearSession();
    }
    throw error;
  }
  if (response.status === 204) return null;
  return response.json();
};

export const initDatabase = () => {};

export const getActiveSession = () => readSession();

export const refreshSession = async () => {
  const session = readSession();
  if (!session.token) return clearSession();
  try {
    const result = await request('/auth/me');
    return saveSession({ ...session, isLoggedIn: true, user: result.user });
  } catch (error) {
    if (error.status === 401) return getActiveSession();
    throw error;
  }
};

export const loginUser = async ({ email, password }) => {
  const session = await request('/auth/login', {
    method: 'POST',
    body: { email, password },
    authenticated: false
  });
  return saveSession(session);
};

export const registerUser = async ({ name, email, password }) => {
  const session = await request('/auth/register', {
    method: 'POST',
    body: { name, email, password },
    authenticated: false
  });
  return saveSession(session);
};

export const logoutUser = async () => {
  return clearSession();
};

export const updateUserProfile = async (_userId, updates) => {
  const result = await request('/auth/profile', { method: 'PATCH', body: updates });
  return saveSession({ ...readSession(), user: result.user, isLoggedIn: true });
};

export const getUserPresentations = async () => request('/presentations');

export const saveUserPresentation = async (_userId, presentation) => request('/presentations', {
  method: 'POST',
  body: presentation
});

export const getUserPresentation = async (id) => request(`/presentations/${encodeURIComponent(id)}`);

export const deleteUserPresentation = async (id) => {
  await request(`/presentations/${encodeURIComponent(id)}`, { method: 'DELETE' });
  return getUserPresentations();
};

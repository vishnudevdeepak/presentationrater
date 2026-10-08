import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import GridBackground from './components/ui/grid-background';

import Home from './pages/Home';
import Analyze from './pages/Analyze';
import Results from './pages/Results';
import Dashboard from './pages/Dashboard';
import History from './pages/History';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Pricing from './pages/Pricing';
import Examples from './pages/Examples';

import {
  getUserAuth,
  setStoredTheme,
  initStorage,
  refreshUserAuth
} from './services/storageService';

function RequireAuth({ userAuth, children }) {
  return userAuth?.isLoggedIn ? children : <Navigate to="/login" replace />;
}

export default function App() {
  const [userAuth, setUserAuth] = useState(() => getUserAuth());

  useEffect(() => {
    initStorage();
    refreshUserAuth()
      .then(setUserAuth)
      .catch(() => setUserAuth(getUserAuth()));
  }, []);

  useEffect(() => {
    document.documentElement.classList.remove('dark');
    setStoredTheme('light');
  }, []);

  return (
    <Router>
      <div className="relative isolate min-h-screen">
        <GridBackground className="-z-10" />
        <div className="relative z-10 flex min-h-screen flex-col text-black transition-colors duration-300">
        
        <Navbar
          userAuth={userAuth}
        />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/analyze" element={<RequireAuth userAuth={userAuth}><Analyze userAuth={userAuth} /></RequireAuth>} />
            <Route path="/results/:id" element={<RequireAuth userAuth={userAuth}><Results /></RequireAuth>} />
            <Route path="/dashboard" element={<RequireAuth userAuth={userAuth}><Dashboard userAuth={userAuth} /></RequireAuth>} />
            <Route path="/history" element={<RequireAuth userAuth={userAuth}><History /></RequireAuth>} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/examples" element={<Examples />} />
            <Route path="/login" element={<Login setUserAuth={setUserAuth} />} />
            <Route path="/signup" element={<Signup setUserAuth={setUserAuth} />} />
            <Route
              path="/profile"
              element={
                <RequireAuth userAuth={userAuth}>
                  <Profile userAuth={userAuth} setUserAuth={setUserAuth} />
                </RequireAuth>
              }
            />
            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Footer />
        </div>
      </div>
    </Router>
  );
}

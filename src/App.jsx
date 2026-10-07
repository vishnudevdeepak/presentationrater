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

import { getUserAuth, getStoredTheme, setStoredTheme, initStorage } from './services/storageService';

export default function App() {
  const [darkMode] = useState(() => {
    const saved = getStoredTheme();
    return saved === 'dark';
  });

  const [userAuth, setUserAuth] = useState(() => getUserAuth());

  useEffect(() => {
    initStorage();
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      setStoredTheme('dark');
    } else {
      document.documentElement.classList.remove('dark');
      setStoredTheme('light');
    }
  }, [darkMode]);

  return (
    <Router>
      <div className="relative isolate min-h-screen">
        <GridBackground className="-z-10" />
        <div className="relative z-10 flex min-h-screen flex-col text-slate-900 transition-colors duration-300 dark:text-slate-100">
        
        <Navbar
          userAuth={userAuth}
        />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/analyze" element={<Analyze />} />
            <Route path="/results/:id" element={<Results />} />
            <Route path="/dashboard" element={<Dashboard userAuth={userAuth} />} />
            <Route path="/history" element={<History />} />
            <Route path="/login" element={<Login setUserAuth={setUserAuth} />} />
            <Route path="/signup" element={<Signup setUserAuth={setUserAuth} />} />
            <Route
              path="/profile"
              element={
                <Profile
                  userAuth={userAuth}
                  setUserAuth={setUserAuth}
                />
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

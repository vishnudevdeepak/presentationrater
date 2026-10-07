import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Save, Check, LogOut } from 'lucide-react';
import { getPresentations, updateProfile, performLogout } from '../services/storageService';

export default function Profile({ userAuth, setUserAuth }) {
  const navigate = useNavigate();
  const [userName, setUserName] = useState(userAuth?.user?.name || 'Alex Morgan');
  const [userEmail, setUserEmail] = useState(userAuth?.user?.email || 'alex.morgan@slidescore.ai');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const presentations = getPresentations(userAuth?.user?.id);
  const totalPresentations = presentations.length;
  const avgScore = totalPresentations > 0
    ? Math.round(presentations.reduce((acc, p) => acc + p.overallScore, 0) / totalPresentations)
    : 0;

  const handleSaveProfile = (e) => {
    e.preventDefault();
    if (userAuth?.user?.id) {
      const updatedSession = updateProfile(userAuth.user.id, {
        name: userName,
        email: userEmail
      });
      if (setUserAuth) setUserAuth(updatedSession);
    }
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleLogout = () => {
    const emptySession = performLogout();
    if (setUserAuth) setUserAuth(emptySession);
    navigate('/login');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">
            Account Profile & Settings
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            Manage your personal details, database credentials, and session preferences.
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="px-4 py-2.5 rounded-xl font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 hover:bg-rose-100 dark:hover:bg-rose-900/60 text-xs flex items-center gap-2 transition-colors shrink-0"
        >
          <LogOut className="w-4 h-4" /> Log Out of Account
        </button>
      </div>

      {/* User Overview Card */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={userAuth?.user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=250'}
            alt="Profile Avatar"
            className="w-20 h-20 rounded-2xl object-cover ring-4 ring-indigo-500/20 shadow-md"
          />
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                {userAuth?.user?.name || userName}
              </h3>
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-extrabold text-[10px] uppercase border border-indigo-200 dark:border-indigo-800">
                {userAuth?.user?.plan || 'Pro'} Member
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {userAuth?.user?.email || userEmail}
            </p>
            <p className="text-[11px] text-slate-400 mt-1">
              Database User ID: <code className="font-mono text-indigo-600 dark:text-indigo-400">{userAuth?.user?.id || 'usr-default'}</code>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6 border-t sm:border-t-0 sm:border-l border-slate-200 dark:border-slate-800 pt-4 sm:pt-0 sm:pl-6 text-center">
          <div>
            <span className="text-2xl font-black text-slate-900 dark:text-white block">
              {totalPresentations}
            </span>
            <span className="text-[11px] text-slate-400 font-medium uppercase">
              Presentations
            </span>
          </div>
          <div>
            <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400 block">
              {avgScore}
            </span>
            <span className="text-[11px] text-slate-400 font-medium uppercase">
              Avg Score
            </span>
          </div>
        </div>
      </div>

      {/* Settings Sections */}
      <div className="grid grid-cols-1 gap-8">
        
        {/* Personal Details */}
        <form onSubmit={handleSaveProfile} className="glass-panel p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
          <h4 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <User className="w-5 h-5 text-indigo-600 dark:text-indigo-400" /> Personal Information
          </h4>

          <div className="space-y-3 text-xs">
            <div>
              <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Display Name
              </label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between">
            {savedSuccess ? (
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <Check className="w-4 h-4" /> Database Profile Saved!
              </span>
            ) : <div />}

            <button
              type="submit"
              className="px-4 py-2 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 text-xs shadow-sm flex items-center gap-1.5 transition-all"
            >
              <Save className="w-4 h-4" /> Save Changes
            </button>
          </div>
        </form>

      </div>

    </div>
  );
}

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AlertCircle, Lock, Mail, Sparkles } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { performLogin } from '../services/storageService';

function BottomGradient() {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-400 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
}

export default function Login({ setUserAuth }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();
    setErrorMsg(null);
    setIsSubmitting(true);

    try {
      const session = await performLogin({ email, password });
      if (setUserAuth) setUserAuth(session);
      navigate('/dashboard');
    } catch (error) {
      setErrorMsg(error.message || 'Failed to sign in. Please check your credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-md px-4 py-12 sm:py-16">
      <div className="space-y-7 rounded-none bg-white p-5 shadow-[0_12px_48px_rgba(15,23,42,0.10)] sm:rounded-2xl sm:p-8 dark:bg-black">
        <div className="space-y-3">
          <Link to="/" className="inline-flex items-center gap-2" aria-label="SlideScore AI home">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 p-0.5">
              <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-white dark:bg-slate-900">
                <Sparkles className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              </div>
            </div>
            <span className="text-lg font-bold text-slate-900 dark:text-white">
              SlideScore <span className="gradient-text">AI</span>
            </span>
          </Link>
          <h1 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
            Welcome back
          </h1>
        </div>

        {errorMsg && (
          <div
            role="alert"
            className="flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs font-semibold text-rose-700 dark:border-rose-800 dark:bg-rose-950/40 dark:text-rose-300"
          >
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="flex flex-col space-y-2">
            <Label htmlFor="login-email">Email address</Label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-neutral-400" />
              <Input
                id="login-email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                className="pl-9"
              />
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            <Label htmlFor="login-password">Password</Label>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-neutral-400" />
              <Input
                id="login-password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter your password"
                className="pl-9"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="group/btn relative w-full rounded-xl bg-indigo-600 py-3 text-xs font-bold text-white shadow-md shadow-indigo-500/20 transition-all hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? 'Signing in...' : 'Sign in'}
            <span aria-hidden="true" className="ml-2">→</span>
            <BottomGradient />
          </button>
        </form>

        <div className="h-px w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />

        <p className="text-center text-sm text-neutral-600 dark:text-neutral-400">
          Don&apos;t have an account?{' '}
          <Link to="/signup" className="font-semibold text-indigo-600 hover:underline dark:text-indigo-400">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

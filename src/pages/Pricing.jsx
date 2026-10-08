import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Sparkles, ShieldCheck } from 'lucide-react';
import Modal from '../components/Modal';

export default function Pricing() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const handleOpenCheckout = (planName) => {
    setSelectedPlan(planName);
    setCheckoutSuccess(false);
  };

  const handleSimulatePayment = () => {
    setCheckoutSuccess(true);
    setTimeout(() => {
      setSelectedPlan(null);
      setCheckoutSuccess(false);
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
          Flexible Pricing Plans
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white">
          Simple, Transparent Pricing.
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-base">
          Start for free and upgrade as your presentation demands grow.
        </p>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        
        {/* FREE PLAN */}
        <div className="glass-panel p-8 rounded-3xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Free</h3>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-black text-slate-900 dark:text-white">₹0</span>
              <span className="text-xs font-semibold text-slate-400">/month</span>
            </div>
            <p className="text-xs text-slate-500">Perfect for trying SlideScore AI on single presentations.</p>

            <ul className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" /> 3 analyses / month
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" /> Basic 10-category scoring
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" /> Basic feedback summary
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" /> Slide-by-slide analysis
              </li>
            </ul>
          </div>

          <Link
            to="/analyze"
            className="w-full py-3 rounded-xl font-bold text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-center text-xs transition-all"
          >
            Get Started Free
          </Link>
        </div>

        {/* PRO PLAN (HIGHLIGHTED) */}
        <div className="glass-panel p-8 rounded-3xl border-2 border-indigo-600 dark:border-indigo-500 shadow-2xl relative flex flex-col justify-between space-y-6 bg-gradient-to-b from-indigo-50/50 via-white to-purple-50/50 dark:from-indigo-950/40 dark:via-slate-900 dark:to-slate-900 scale-105">
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-extrabold text-[10px] uppercase tracking-wider shadow-md">
            Most Popular
          </div>

          <div className="space-y-4 pt-2">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              Pro <Sparkles className="w-4 h-4 text-indigo-600" />
            </h3>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-black text-slate-900 dark:text-white">₹499</span>
              <span className="text-xs font-semibold text-slate-400">/month</span>
            </div>
            <p className="text-xs text-slate-500">For students, professionals, and frequent presenters.</p>

            <ul className="space-y-3 pt-4 border-t border-indigo-100 dark:border-indigo-900/60 text-xs font-medium text-slate-700 dark:text-slate-300">
              <li className="flex items-center gap-2 font-bold text-indigo-600 dark:text-indigo-400">
                <Check className="w-4 h-4 text-indigo-600 shrink-0" /> Unlimited presentation analyses
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-indigo-600 shrink-0" /> Detailed AI diagnostic engine
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-indigo-600 shrink-0" /> Priority slide recommendations
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-indigo-600 shrink-0" /> PDF report exports & checklists
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-indigo-600 shrink-0" /> Unlimited presentation history
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-indigo-600 shrink-0" /> Priority processing queue
              </li>
            </ul>
          </div>

          <button
            onClick={() => handleOpenCheckout('Pro Plan (₹499/mo)')}
            className="w-full py-3.5 rounded-xl font-extrabold text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-500/25 text-center text-xs transition-all"
          >
            Upgrade to Pro
          </button>
        </div>

        {/* TEAM PLAN */}
        <div className="glass-panel p-8 rounded-3xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Team</h3>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-black text-slate-900 dark:text-white">₹999</span>
              <span className="text-xs font-semibold text-slate-400">/month</span>
            </div>
            <p className="text-xs text-slate-500">For startups, marketing teams, and research groups.</p>

            <ul className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" /> Everything in Pro plan
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" /> Shared team workspace (5 seats)
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" /> Shared analysis reports & history
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" /> Team presentation analytics
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" /> Real-time collaboration
              </li>
            </ul>
          </div>

          <button
            onClick={() => handleOpenCheckout('Team Plan (₹999/mo)')}
            className="w-full py-3 rounded-xl font-bold text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-center text-xs transition-all"
          >
            Get Team Plan
          </button>
        </div>

      </div>

      {/* MOCK CHECKOUT MODAL */}
      <Modal
        isOpen={!!selectedPlan}
        onClose={() => setSelectedPlan(null)}
        title={`Checkout — ${selectedPlan}`}
      >
        <div className="space-y-4">
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Confirm your subscription to <strong>{selectedPlan}</strong>. This is a prototype checkout demo.
          </p>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2 text-xs">
            <div className="flex justify-between font-semibold text-slate-700 dark:text-slate-300">
              <span>Subscription</span>
              <span>{selectedPlan}</span>
            </div>
            <div className="flex justify-between font-semibold text-slate-700 dark:text-slate-300">
              <span>Tax (GST)</span>
              <span>Inclusive</span>
            </div>
            <div className="flex justify-between font-bold text-slate-900 dark:text-white pt-2 border-t border-slate-200 dark:border-slate-700 text-sm">
              <span>Total Due</span>
              <span>{selectedPlan?.includes('499') ? '₹499' : '₹999'}</span>
            </div>
          </div>

          {checkoutSuccess ? (
            <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" /> Payment Successful! Upgraded to {selectedPlan}.
            </div>
          ) : (
            <button
              onClick={handleSimulatePayment}
              className="w-full py-3 rounded-xl font-bold text-white bg-emerald-600 hover:bg-emerald-700 text-xs transition-all shadow-md"
            >
              Simulate ₹ Payment
            </button>
          )}
        </div>
      </Modal>

    </div>
  );
}


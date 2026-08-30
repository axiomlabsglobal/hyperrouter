"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { Bell, X, Crown, Check, Sparkles } from 'lucide-react';

// ─── Alert Creator Button ───
export function AlertCreatorButton() {
  const [showAlert, setShowAlert] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowAlert(true)}
        className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 text-amber-400 hover:text-amber-300 hover:border-amber-500/40 font-semibold text-sm transition-all active:scale-[0.98]"
      >
        <Bell size={16} fill="currentColor" />
        Create Availability Alert
      </button>

      <AlertCreatorModal isOpen={showAlert} onClose={() => setShowAlert(false)} />
    </>
  );
}

// ─── Alert Creator Modal ───
function AlertCreatorModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [gpu, setGpu] = useState("H100");
  const [qty, setQty] = useState("8x");
  const [maxPrice, setMaxPrice] = useState("2.00");
  const [showPaywall, setShowPaywall] = useState(false);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
        <div className="relative bg-[#16161a] border border-white/10 rounded-2xl shadow-2xl max-w-md w-full p-6 flex flex-col gap-5">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                <Bell className="text-amber-400" size={20} fill="currentColor" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">GPU Availability Alert</h2>
                <p className="text-xs text-slate-400">Get notified when your ideal GPU is available</p>
              </div>
            </div>
            <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/5">
              <X size={20} />
            </button>
          </div>

          <div className="h-px bg-white/5" />

          {/* Alert Configuration */}
          <div className="flex flex-col gap-4">
            <div className="flex gap-3">
              <div className="flex-1 flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">GPU Model</label>
                <select
                  value={gpu}
                  onChange={(e) => setGpu(e.target.value)}
                  className="bg-black/50 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-amber-500/50 appearance-none cursor-pointer"
                >
                  {["H100", "A100", "RTX 4090", "L40S", "RTX A6000"].map(g => <option key={g}>{g}</option>)}
                </select>
              </div>
              <div className="w-24 flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Qty</label>
                <select
                  value={qty}
                  onChange={(e) => setQty(e.target.value)}
                  className="bg-black/50 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-amber-500/50 appearance-none cursor-pointer"
                >
                  {["1x", "2x", "4x", "8x"].map(q => <option key={q}>{q}</option>)}
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Max Price ($/hr per GPU)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">$</span>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-lg pl-7 pr-14 py-2.5 text-white text-sm focus:outline-none focus:border-amber-500/50"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">/hr</span>
              </div>
            </div>

            <div className="bg-amber-500/5 border border-amber-500/10 rounded-xl p-3 flex items-start gap-3">
              <Sparkles size={16} className="text-amber-400 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-slate-400 leading-relaxed">
                You'll receive instant email + push notifications when <span className="text-white font-medium">{qty} {gpu}</span> becomes
                available under <span className="text-white font-medium">${maxPrice}/hr</span> from any provider.
              </p>
            </div>
          </div>

          <div className="h-px bg-white/5" />

          {/* CTA */}
          <button
            onClick={() => setShowPaywall(true)}
            className="w-full py-3 rounded-xl text-sm font-bold bg-gradient-to-r from-amber-500 to-orange-500 text-black transition-all active:scale-[0.98] shadow-[0_0_20px_rgba(245,158,11,0.2)] hover:shadow-[0_0_30px_rgba(245,158,11,0.4)] flex items-center justify-center gap-2"
          >
            <Bell size={16} />
            Enable Alert — Pro Feature
          </button>
        </div>
      </div>

      <PaywallModal isOpen={showPaywall} onClose={() => setShowPaywall(false)} />
    </>
  );
}

// ─── Pro Paywall Modal ───
function PaywallModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  const features = [
    "Unlimited GPU availability alerts",
    "Price drop notifications across 19 providers",
    "Spot instance reclaim warnings",
    "Priority search — faster data refresh",
    "Export comparison data (CSV)",
  ];

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />
      <div className="relative bg-[#16161a] border border-amber-500/20 rounded-2xl shadow-2xl max-w-sm w-full p-6 flex flex-col gap-5 overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-amber-500/10 blur-[100px] rounded-full pointer-events-none" />

        {/* Header */}
        <div className="relative flex flex-col items-center gap-3 text-center">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center text-black">
            <Crown size={28} />
          </div>
          <h2 className="text-2xl font-bold text-white">HyperRouter Pro</h2>
          <p className="text-slate-400 text-sm">Real-time alerts for scarce GPU inventory</p>
        </div>

        {/* Price */}
        <div className="relative flex items-baseline justify-center gap-1">
          <span className="text-4xl font-bold text-white tracking-tight">$19</span>
          <span className="text-slate-500 font-medium">/month</span>
        </div>

        {/* Features */}
        <div className="relative flex flex-col gap-2.5">
          {features.map((f) => (
            <div key={f} className="flex items-center gap-2.5">
              <div className="w-5 h-5 rounded-full bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                <Check size={12} className="text-amber-400" strokeWidth={3} />
              </div>
              <span className="text-sm text-slate-300">{f}</span>
            </div>
          ))}
        </div>

        <div className="h-px bg-white/5" />

        {/* CTA */}
        <a
          href="https://hyperrouter.lemonsqueezy.com/checkout/buy/pro-plan"
          target="_blank"
          rel="noopener noreferrer"
          className="relative w-full py-3 rounded-xl text-sm font-bold bg-gradient-to-r from-amber-500 to-orange-500 text-black transition-all active:scale-[0.98] shadow-[0_0_25px_rgba(245,158,11,0.3)] hover:shadow-[0_0_35px_rgba(245,158,11,0.5)] flex items-center justify-center gap-2"
        >
          <Crown size={16} />
          Upgrade to Pro
        </a>
        <button
          onClick={onClose}
          className="relative w-full py-2.5 rounded-xl text-sm font-medium text-slate-500 hover:text-white hover:bg-white/5 transition-all"
        >
          Maybe later
        </button>
      </div>
    </div>
  );
}

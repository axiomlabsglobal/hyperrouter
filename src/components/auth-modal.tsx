"use client";

import React from 'react';
import Link from 'next/link';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

export function AuthModal({ isOpen, onClose, title = "Sign in to HyperRouter" }: AuthModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-[#0a0a0a] border border-[#222] rounded-xl shadow-2xl w-full max-w-[400px] overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#1a1a1a] flex justify-between items-center">
          <h2 className="text-white text-lg font-semibold tracking-tight">{title}</h2>
          <button 
            onClick={onClose}
            className="text-[#666] hover:text-white transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 flex flex-col gap-4">
          <p className="text-[#888] text-sm text-center mb-2">
            Welcome back. Please sign in to continue accessing global GPU infrastructure.
          </p>

          <button 
            className="flex items-center justify-center gap-3 w-full bg-white hover:bg-[#f0f0f0] text-black font-semibold py-2.5 px-4 rounded-lg transition-colors active:scale-[0.98]"
            onClick={onClose}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
            Continue with Google
          </button>

          <button 
            className="flex items-center justify-center gap-3 w-full bg-[#161616] hover:bg-[#222] border border-[#333] text-white font-semibold py-2.5 px-4 rounded-lg transition-colors active:scale-[0.98]"
            onClick={onClose}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
            Continue with GitHub
          </button>

          <div className="relative my-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#2a2a2a]"></div>
            </div>
            <div className="relative flex justify-center text-[11px] uppercase tracking-wider">
              <span className="bg-[#0a0a0a] px-2 text-[#555]">Or continue with email</span>
            </div>
          </div>

          <form className="flex flex-col gap-3" onSubmit={(e) => { e.preventDefault(); onClose(); }}>
            <input 
              type="email" 
              placeholder="name@company.com" 
              className="w-full bg-[#111] border border-[#2a2a2a] rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-[#555] focus:outline-none focus:border-green-500 transition-colors"
              required
            />
            <button type="submit" className="w-full bg-green-600 hover:bg-green-500 text-black font-semibold py-2.5 rounded-lg transition-colors active:scale-[0.98]">
              Send Magic Link
            </button>
          </form>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-[#111] border-t border-[#1a1a1a] text-center">
          <p className="text-[11px] text-[#666]">
            By signing up, you automatically agree to EAR regulations and AUP. <br/>
            <Link href="/terms" onClick={onClose} className="underline hover:text-[#888]">Terms of Service</Link> and <Link href="/privacy" onClick={onClose} className="underline hover:text-[#888]">Privacy Notice</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}

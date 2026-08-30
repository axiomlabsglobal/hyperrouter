import React from 'react';
import { ShieldAlert } from 'lucide-react';

export default function BlockedPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0c] flex items-center justify-center px-4">
      <div className="max-w-lg text-center flex flex-col items-center gap-6">
        <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
          <ShieldAlert className="text-red-400" size={32} />
        </div>
        <h1 className="text-3xl font-bold text-white">Access Denied</h1>
        <p className="text-slate-400 text-lg leading-relaxed">
          Service unavailable in your region due to international compliance regulations.
        </p>
        <p className="text-sm text-slate-500">
          HyperRouter complies with OFAC (Office of Foreign Assets Control) sanctions and export control laws.
          If you believe this is an error, please contact{' '}
          <a href="mailto:compliance@hyperrouter.com" className="text-teal-400 hover:underline">
            compliance@hyperrouter.com
          </a>.
        </p>
        <div className="text-xs text-slate-600 mt-4">
          HTTP 403 Forbidden
        </div>
      </div>
    </div>
  );
}

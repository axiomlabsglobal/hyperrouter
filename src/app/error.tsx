"use client";

import React from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
      <div className="max-w-md text-center flex flex-col items-center gap-5">
        <div className="w-14 h-14 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
          <AlertTriangle className="text-amber-400" size={28} />
        </div>
        <h2 className="text-xl font-bold text-white">
          Something went wrong
        </h2>
        <p className="text-sm text-[#888] leading-relaxed">
          Unable to load pricing data for this region. This could be a temporary
          issue with one of our upstream providers. Please try again.
        </p>
        {error.digest && (
          <p className="text-[10px] font-data text-[#444]">
            Error ID: {error.digest}
          </p>
        )}
        <button
          onClick={reset}
          className="flex items-center gap-2 px-5 py-2 bg-[#1a1a1a] hover:bg-[#222] border border-[#2a2a2a] rounded-lg text-sm font-medium text-white transition-all active:scale-[0.97]"
        >
          <RefreshCw size={14} />
          Try again
        </button>
      </div>
    </div>
  );
}

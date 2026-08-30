"use client";

import React, { useCallback, useEffect } from 'react';
import { ExternalLink, X } from 'lucide-react';

const REDIRECT_DELAY_SECONDS = 3;
const REDIRECT_DELAY_MS = 2500;

interface RedirectModalProps {
  isOpen: boolean;
  providerName: string;
  providerUrl: string;
  onClose: () => void;
  onRedirect: () => void;
}

export function RedirectModal({
  isOpen,
  providerName,
  providerUrl,
  onClose,
  onRedirect,
}: RedirectModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const redirectTimer = window.setTimeout(onRedirect, REDIRECT_DELAY_MS);

    return () => {
      window.clearTimeout(redirectTimer);
    };
  }, [isOpen, onRedirect]);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="redirect-title">
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-[#16161a] p-6 shadow-2xl animate-in fade-in zoom-in-95">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1 text-slate-500 transition-colors hover:bg-white/5 hover:text-white"
          aria-label="Cancel redirect"
        >
          <X size={20} />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="mb-5 h-12 w-12 animate-spin rounded-full border-2 border-emerald-500/20 border-t-emerald-400" aria-hidden="true" />
          <h2 id="redirect-title" className="text-lg font-bold text-white">
            Redirecting to {providerName}...
          </h2>
          <p className="mt-2 text-xs text-slate-400" aria-live="polite">
            Opening a new tab in a few seconds.
          </p>

          <div className="my-5 h-px w-full bg-white/5" />

          <p className="text-sm leading-relaxed text-slate-300">
            You are now leaving HyperRouter. Please verify the final pricing, availability, and SLA on the provider&apos;s official console before provisioning. We are not responsible for external transactions.
          </p>

          <a
            href={providerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 transition-colors hover:text-emerald-300"
          >
            Open {providerName} now <ExternalLink size={12} />
          </a>
        </div>
      </div>
    </div>
  );
}

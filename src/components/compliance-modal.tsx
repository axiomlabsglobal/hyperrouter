"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { ShieldCheck, X } from 'lucide-react';

interface ComplianceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  providerName: string;
}

export function ComplianceModal({ isOpen, onClose, onConfirm, providerName }: ComplianceModalProps) {
  const [gdprChecked, setGdprChecked] = useState(false);
  const [exportChecked, setExportChecked] = useState(false);

  // Reset on open
  useEffect(() => {
    if (isOpen) {
      setGdprChecked(false);
      setExportChecked(false);
    }
  }, [isOpen]);

  // Close on Escape
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

  const canProceed = gdprChecked && exportChecked;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-[#16161a] border border-white/10 rounded-2xl shadow-2xl max-w-md w-full p-6 flex flex-col gap-5 animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center">
              <ShieldCheck className="text-teal-400" size={22} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Compliance Check</h2>
              <p className="text-xs text-slate-400">Required before redirecting to {providerName}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/5">
            <X size={20} />
          </button>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/5" />

        {/* Checkboxes */}
        <div className="flex flex-col gap-4">
          <label
            className="flex items-start gap-3 cursor-pointer group"
            onClick={() => setGdprChecked(!gdprChecked)}
          >
            <div className={`mt-0.5 w-5 h-5 rounded flex-shrink-0 flex items-center justify-center border transition-all ${gdprChecked ? 'bg-teal-500 border-teal-500' : 'bg-white/5 border-white/20 group-hover:border-white/40'}`}>
              {gdprChecked && <span className="text-black text-xs font-bold">✓</span>}
            </div>
            <div>
              <span className="text-sm font-medium text-white">GDPR Data Processing Agreement</span>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                I acknowledge that my data (IP address, usage metadata) may be processed by {providerName} under their Data Processing Agreement in accordance with GDPR and applicable data protection laws.
              </p>
            </div>
          </label>

          <label
            className="flex items-start gap-3 cursor-pointer group"
            onClick={() => setExportChecked(!exportChecked)}
          >
            <div className={`mt-0.5 w-5 h-5 rounded flex-shrink-0 flex items-center justify-center border transition-all ${exportChecked ? 'bg-teal-500 border-teal-500' : 'bg-white/5 border-white/20 group-hover:border-white/40'}`}>
              {exportChecked && <span className="text-black text-xs font-bold">✓</span>}
            </div>
            <div>
              <span className="text-sm font-medium text-white">Export Control Compliance</span>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                I confirm that I am not located in, under the control of, or a national or resident of any country subject to U.S. export restrictions (OFAC/EAR), and will not use these computing resources in violation of any export control laws.
              </p>
            </div>
          </label>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/5" />

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={() => { if (canProceed) onConfirm(); }}
            disabled={!canProceed}
            className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${canProceed ? 'bg-teal-500 hover:bg-teal-400 text-black shadow-[0_0_20px_rgba(20,184,166,0.3)] active:scale-95' : 'bg-white/5 text-slate-600 cursor-not-allowed'}`}
          >
            Proceed to {providerName}
          </button>
        </div>
      </div>
    </div>
  );
}

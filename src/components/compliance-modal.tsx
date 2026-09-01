"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { ShieldCheck, X } from 'lucide-react';
import { useI18n } from '@/i18n/context';
import { motion, AnimatePresence } from 'framer-motion';

interface ComplianceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  providerName: string;
}

export function ComplianceModal({ isOpen, onClose, onConfirm, providerName }: ComplianceModalProps) {
  const [exportChecked, setExportChecked] = useState(false);
  const [aupChecked, setAupChecked] = useState(false);
  const [amlChecked, setAmlChecked] = useState(false);
  const { t } = useI18n();

  // Reset on open
  useEffect(() => {
    if (isOpen) {
      setExportChecked(false);
      setAupChecked(false);
      setAmlChecked(false);
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

  const handleConfirm = () => {
    if (canProceed) {
      localStorage.setItem('hyperrouter_compliance', 'true');
      onConfirm();
    }
  };

  const canProceed = exportChecked && aupChecked && amlChecked;

  // Bypass on mount if already agreed
  useEffect(() => {
    if (isOpen && localStorage.getItem('hyperrouter_compliance') === 'true') {
      onConfirm();
    }
  }, [isOpen, onConfirm]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-md" 
            onClick={onClose} 
          />

          {/* Modal */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", duration: 0.4, bounce: 0 }}
            className="relative bg-[#0a0a0a] border border-[#222] rounded-2xl shadow-2xl max-w-md w-full p-6 flex flex-col gap-5"
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#1a1a1a] flex items-center justify-center border border-[#333]">
                  <ShieldCheck className="text-white" size={20} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">{t('compliance.title')}</h2>
                  <p className="text-xs text-slate-400">{t('compliance.subtitle')}</p>
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
                onClick={() => setExportChecked(!exportChecked)}
              >
                <div className={`mt-0.5 w-5 h-5 rounded flex-shrink-0 flex items-center justify-center border transition-all ${exportChecked ? 'bg-white border-white' : 'bg-white/5 border-white/20 group-hover:border-white/40'}`}>
                  {exportChecked && <span className="text-black text-xs font-bold">✓</span>}
                </div>
                <div>
                  <span className="text-sm font-medium text-white">{t('compliance.earTitle')}</span>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    {t('compliance.earDesc')}
                  </p>
                </div>
              </label>

              <label
                className="flex items-start gap-3 cursor-pointer group"
                onClick={() => setAupChecked(!aupChecked)}
              >
                <div className={`mt-0.5 w-5 h-5 rounded flex-shrink-0 flex items-center justify-center border transition-all ${aupChecked ? 'bg-white border-white' : 'bg-white/5 border-white/20 group-hover:border-white/40'}`}>
                  {aupChecked && <span className="text-black text-xs font-bold">✓</span>}
                </div>
                <div>
                  <span className="text-sm font-medium text-white">{t('compliance.aupTitle')}</span>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    {t('compliance.aupDesc')}
                  </p>
                </div>
              </label>
              
              <label
                className="flex items-start gap-3 cursor-pointer group"
                onClick={() => setAmlChecked(!amlChecked)}
              >
                <div className={`mt-0.5 w-5 h-5 rounded flex-shrink-0 flex items-center justify-center border transition-all ${amlChecked ? 'bg-white border-white' : 'bg-white/5 border-white/20 group-hover:border-white/40'}`}>
                  {amlChecked && <span className="text-black text-xs font-bold">✓</span>}
                </div>
                <div>
                  <span className="text-sm font-medium text-white">{t('compliance.amlTitle')}</span>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    {t('compliance.amlDesc')}
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
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-slate-400 hover:text-white bg-[#1a1a1a] hover:bg-[#222] border border-[#2a2a2a] transition-all"
              >
                {t('compliance.cancel')}
              </button>
              <button
                onClick={handleConfirm}
                disabled={!canProceed}
                className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${canProceed ? 'bg-white hover:bg-gray-200 text-black active:scale-[0.98] shadow-lg' : 'bg-[#1a1a1a] text-[#555] border border-[#222] cursor-not-allowed'}`}
              >
                {t('compliance.proceed')}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

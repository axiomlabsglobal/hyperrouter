"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Logo } from './logo';
import { motion, AnimatePresence } from 'framer-motion';
import { useI18n } from '@/i18n/context';

const FOOTER_COLS = [
  {
    title: "Product",
    links: [
      { href: "/", label: "GPU Meta-Search" },
      { href: "/pricing", label: "Pricing" },
      { href: "/api-docs", label: "API Docs" },
      { href: "/docs", label: "Documentation" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "/docs", label: "Getting Started" },
      { href: "/api-docs", label: "API Reference" },
      { href: "https://status.hyperrouter.com", label: "Status", ext: true },
      { href: "mailto:sales@hyperrouter.com", label: "Contact Sales", ext: true },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/docs", label: "About" },
      { href: "/docs", label: "Blog" },
      { href: "/docs", label: "Careers" },
      { href: "https://github.com/hyperrouter", label: "GitHub", ext: true },
    ],
  },
  {
    title: "Legal & Compliance",
    links: [
      { href: "#", label: "Acceptable Use (AUP)", modalType: "aup" },
      { href: "#", label: "Export Control (EAR)", modalType: "export" },
      { href: "#", label: "Terms of Aggregation", modalType: "aml" },
      { href: "/privacy", label: "Privacy Policy" },
    ],
  },
];

export function Footer() {
  const [legalModalType, setLegalModalType] = useState<'aup' | 'export' | 'aml' | null>(null);
  const { t } = useI18n();

  return (
    <footer className="border-t border-[#1a1a1a] bg-[#080808] mt-auto">
      <div className="max-w-[1600px] mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-block mb-3">
              <Logo size={20} />
            </Link>
            <p className="text-[11px] text-[#444] leading-relaxed mb-4">
              Global GPU compute metasearch.<br />Compare. Deploy. Save.
            </p>
            {/* Status Indicator */}
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
              <span className="text-[9px] text-[#444] font-data">All systems normal</span>
            </div>
          </div>

          {/* 4 Link Columns */}
          {FOOTER_COLS.map(col => (
            <div key={col.title}>
              <h4 className="text-[11px] font-semibold text-[#666] uppercase tracking-wider mb-3">{col.title}</h4>
              <ul className="flex flex-col gap-2">
                {col.links.map(link => (
                  <li key={link.label}>
                    {'modalType' in link ? (
                      <button onClick={() => setLegalModalType(link.modalType as 'aup'|'export'|'aml')} className="text-[12px] text-[#555] hover:text-white transition-colors text-left">
                        {link.label}
                      </button>
                    ) : 'ext' in link ? (
                      <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-[12px] text-[#555] hover:text-white transition-colors">
                        {link.label}
                      </a>
                    ) : (
                      <Link href={link.href} className="text-[12px] text-[#555] hover:text-white transition-colors">
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Legal Bar */}
        <div className="mt-8 pt-5 border-t border-[#141414] flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-[10px] text-[#333] font-data">
            © {new Date().getFullYear()} HyperRouter, Inc. All rights reserved.
          </p>
        </div>
        <div className="mt-4 space-y-2 text-xs text-gray-500 leading-relaxed">
          <p>
            HyperRouter operates strictly as an independent search aggregator. We do not provision compute resources, process payments, or manage infrastructure. Users are solely responsible for complying with all applicable local and international laws, including U.S. Export Administration Regulations (EAR) and OFAC sanctions. By using this site, you acknowledge that all transactions and identity verifications (KYC/AML) are handled directly by the respective third-party cloud providers.
          </p>
        </div>
      </div>

      {/* Legal Compliance Modal */}
      <AnimatePresence>
        {legalModalType && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm" 
              onClick={() => setLegalModalType(null)} 
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: "spring", duration: 0.4, bounce: 0 }}
              className="relative bg-[#16161a] border border-white/10 rounded-2xl shadow-2xl max-w-md w-full p-6 flex flex-col gap-4"
            >
              <h2 className="text-lg font-bold text-white mb-2">
                {legalModalType === 'aup' && t('compliance.aupTitle')}
                {legalModalType === 'export' && t('compliance.earTitle')}
                {legalModalType === 'aml' && t('compliance.amlTitle')}
              </h2>
              <div className="h-px bg-white/5" />
              <p className="text-sm text-slate-300 leading-relaxed">
                {legalModalType === 'aup' && t('compliance.aupDesc')}
                {legalModalType === 'export' && t('compliance.earDesc')}
                {legalModalType === 'aml' && t('compliance.amlDesc')}
              </p>
              <div className="mt-2 flex justify-end">
                <button 
                  onClick={() => setLegalModalType(null)}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-semibold transition-colors"
                >
                  {t('compliance.acknowledge')}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </footer>
  );
}

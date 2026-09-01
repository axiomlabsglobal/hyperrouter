"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Logo } from './logo';
import { useI18n } from '@/i18n/context';
import { ComplianceModal } from './compliance-modal';

export function Footer() {
  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const { t } = useI18n();

  const FOOTER_COLS = [
    {
      title: t('footer.product'),
      links: [
        { href: "/", label: t('footer.gpuSearch') },
        { href: "/pricing", label: t('footer.pricing') },
        { href: "/api-docs", label: t('footer.apiDocs') },
        { href: "/docs", label: t('footer.docs') },
      ],
    },
    {
      title: t('footer.resources'),
      links: [
        { href: "/docs", label: t('footer.gettingStarted') },
        { href: "/api-docs", label: t('footer.apiReference') },
        { href: "https://status.hyperrouter.com", label: t('footer.status'), ext: true },
        { href: "mailto:sales@hyperrouter.com", label: t('footer.contactSales'), ext: true },
      ],
    },
    {
      title: t('footer.company'),
      links: [
        { href: "/about", label: t('footer.about') },
        { href: "/blog", label: t('footer.blog') },
        { href: "/careers", label: t('footer.careers') },
        { href: "https://github.com/hyperrouter", label: t('footer.github'), ext: true },
      ],
    },
    {
      title: t('footer.legal'),
      links: [
        { href: "#", label: t('footer.aup'), isLegal: true },
        { href: "#", label: t('footer.ear'), isLegal: true },
        { href: "#", label: t('footer.aml'), isLegal: true },
        { href: "/privacy", label: t('footer.privacyPolicy') },
        { href: "/terms", label: t('footer.terms') },
      ],
    },
  ];

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
                    {'isLegal' in link ? (
                      <button onClick={() => setLegalModalOpen(true)} className="text-[12px] text-[#555] hover:text-white transition-colors text-left">
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

      <ComplianceModal 
        isOpen={legalModalOpen} 
        onClose={() => setLegalModalOpen(false)} 
        onConfirm={() => setLegalModalOpen(false)}
        providerName="" 
      />
    </footer>
  );
}

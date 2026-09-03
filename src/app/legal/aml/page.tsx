"use client";

import React from 'react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { useI18n } from '@/i18n/context';

export default function LegalPage() {
  const { t } = useI18n();

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e0e0e0] font-sans flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto px-4 py-20">
        <h1 className="text-3xl font-bold text-white mb-8">{t('legal.aml.title')}</h1>
        <div className="prose prose-invert max-w-none text-slate-400">
          <p>{t('legal.contentPlaceholder')}</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}

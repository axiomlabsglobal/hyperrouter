const fs = require('fs');
const path = require('path');

const pages = [
  { path: 'src/app/legal/aup/page.tsx', key: 'legal.aup' },
  { path: 'src/app/legal/ear/page.tsx', key: 'legal.ear' },
  { path: 'src/app/legal/aml/page.tsx', key: 'legal.aml' },
  { path: 'src/app/privacy/page.tsx', key: 'legal.privacy' },
  { path: 'src/app/terms/page.tsx', key: 'legal.terms' }
];

const template = (key) => `"use client";

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
        <h1 className="text-3xl font-bold text-white mb-8">{t('${key}.title')}</h1>
        <div className="prose prose-invert max-w-none text-slate-400">
          <p>{t('legal.contentPlaceholder')}</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
`;

pages.forEach(p => {
  const dir = path.dirname(p.path);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(p.path, template(p.key));
});

console.log("Legal pages created!");

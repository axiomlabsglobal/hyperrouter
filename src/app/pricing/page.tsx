"use client";

import React from 'react';
import { Navbar } from '@/components/navbar';
import { SubscribeButton } from '@/components/subscribe-button';
import { useI18n } from '@/i18n/context';

export default function PricingPage() {
  const { t } = useI18n();

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e0e0e0] font-sans">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">{t('pricing.title')}</h1>
        <p className="text-[#888] text-lg mb-16">{t('pricing.subtitle')}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {/* Starter Plan */}
          <div className="p-8 border border-[#222] rounded-xl bg-[#111] flex flex-col">
            <h2 className="text-xl font-semibold text-white mb-2">{t('pricing.starter')}</h2>
            <div className="text-3xl font-bold text-white mb-4">$29<span className="text-sm text-[#666] font-normal">/mo</span></div>
            <p className="text-sm text-[#888] mb-8 min-h-[40px]">{t('pricing.starterDesc')}</p>
            <ul className="text-[#888] space-y-3 mb-8 text-sm flex-1">
              <li className="flex items-start gap-2"><span className="text-white">✓</span> Inventory search</li>
              <li className="flex items-start gap-2"><span className="text-white">✓</span> Basic availability alerts (Up to 3)</li>
              <li className="flex items-start gap-2"><span className="text-white">✓</span> Standard support</li>
            </ul>
            <SubscribeButton tier="starter" />
          </div>

          {/* Pro Team Plan (Most Popular) */}
          <div className="p-8 border-2 border-green-500/50 rounded-xl bg-[#111] relative flex flex-col transform md:-translate-y-4 shadow-2xl shadow-green-900/20">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-green-500 text-black text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
              Most Popular
            </div>
            <h2 className="text-xl font-semibold text-white mb-2">{t('pricing.pro')}</h2>
            <div className="text-3xl font-bold text-white mb-4">$99<span className="text-sm text-[#666] font-normal">/mo</span></div>
            <p className="text-sm text-[#888] mb-8 min-h-[40px]">{t('pricing.proDesc')}</p>
            <ul className="text-[#888] space-y-3 mb-8 text-sm flex-1">
              <li className="flex items-start gap-2"><span className="text-green-400">✓</span> Real-time Slack/Discord webhooks (20)</li>
              <li className="flex items-start gap-2"><span className="text-green-400">✓</span> Team account sharing</li>
              <li className="flex items-start gap-2"><span className="text-green-400">✓</span> Priority support</li>
            </ul>
            <SubscribeButton tier="pro" />
          </div>

          {/* Enterprise API Plan */}
          <div className="p-8 border border-[#222] rounded-xl bg-[#111] flex flex-col">
            <h2 className="text-xl font-semibold text-white mb-2">{t('pricing.enterprise')}</h2>
            <div className="text-3xl font-bold text-white mb-4">$299<span className="text-sm text-[#666] font-normal">/mo</span></div>
            <p className="text-sm text-[#888] mb-8 min-h-[40px]">{t('pricing.enterpriseDesc')}</p>
            <ul className="text-[#888] space-y-3 mb-8 text-sm flex-1">
              <li className="flex items-start gap-2"><span className="text-white">✓</span> Unlimited real-time routing API</li>
              <li className="flex items-start gap-2"><span className="text-white">✓</span> 30-second ultra-fast tracking</li>
              <li className="flex items-start gap-2"><span className="text-white">✓</span> Dedicated account manager</li>
            </ul>
            <SubscribeButton tier="enterprise" />
          </div>
        </div>
      </main>
    </div>
  );
}

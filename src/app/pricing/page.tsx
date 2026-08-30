import React from 'react';
import { Navbar } from '@/components/navbar';

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e0e0e0] font-sans">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">Simple, Transparent Pricing</h1>
        <p className="text-[#888] text-lg">HyperRouter is currently in public beta. All routing features are free to use.</p>
        
        <div className="mt-12 p-8 border border-[#222] rounded-xl bg-[#111] max-w-md mx-auto">
          <h2 className="text-xl font-semibold text-white mb-2">Pro Plan</h2>
          <div className="text-3xl font-bold text-white mb-6">$19<span className="text-sm text-[#666] font-normal">/mo</span></div>
          <ul className="text-left text-[#888] space-y-3 mb-8 text-sm">
            <li className="flex items-center gap-2">✓ Unlimited Availability Alerts</li>
            <li className="flex items-center gap-2">✓ Early Access to New Providers</li>
            <li className="flex items-center gap-2">✓ API Access (10k req/mo)</li>
          </ul>
          <button className="w-full bg-white text-black font-semibold py-2 rounded-lg hover:bg-[#e0e0e0] transition-colors">
            Subscribe Now
          </button>
        </div>
      </main>
    </div>
  );
}

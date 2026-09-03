import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e0e0e0] flex flex-col font-sans">
      <Navbar />
      <div className="max-w-[1200px] w-full mx-auto px-4 py-8 flex-1 flex flex-col">
        {/* Navigation Tabs */}
        <div className="flex items-center justify-between border-b border-[#1f1f1f] pb-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Enterprise Console</h1>
            <p className="text-xs text-[#888] mt-1">Manage cloud routing policies, automated Slack alerts, and Lemon Squeezy billing.</p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard/billing"
              className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-[#141414] hover:bg-[#1c1c1c] border border-[#262626] hover:border-[#404040] text-white transition-all"
            >
              💳 Billing & Plan
            </Link>
            <Link
              href="/dashboard/alerts"
              className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-[#141414] hover:bg-[#1c1c1c] border border-[#262626] hover:border-[#404040] text-white transition-all"
            >
              🔔 Stock Alerts
            </Link>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1">
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
}

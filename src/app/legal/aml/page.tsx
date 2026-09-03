import React from 'react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

export default function AMLPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e0e0e0] font-sans flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto px-6 py-16 text-gray-300 leading-relaxed w-full">
        <h1 className="text-3xl font-bold text-white mb-2">AML / KYC & Aggregator Limitation of Liability</h1>
        <p className="text-sm text-gray-500 mb-8">Last Updated: September 2026</p>

        <section className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-white mb-2">1. Anti-Money Laundering (AML) Standards</h2>
            <p>
              HyperRouter adheres to international standards set by the Financial Action Task Force (FATF). We strictly prohibit the use of subscription tiers or prepaid API routing services for money laundering, structuring transactions, or masking the origin of illicit funds.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-2">2. Provider-Side KYC Verification</h2>
            <p>
              HyperRouter acts strictly as a search aggregation, metadata normalization, and telemetry routing gateway. We do not hold customer funds for compute fulfillment. Actual financial transactions, hardware provisioning, and mandatory Know-Your-Customer (KYC) identity verifications remain the exclusive contractual obligation of the respective upstream cloud provider.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-2">3. Limitation of Liability</h2>
            <p>
              HyperRouter disclaims all implied warranties regarding vendor compute uptime, hardware integrity, cluster network stability, or pricing discrepancies. HyperRouter shall not be held liable for indirect, incidental, or consequential damages resulting from upstream vendor outages or transaction failures.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

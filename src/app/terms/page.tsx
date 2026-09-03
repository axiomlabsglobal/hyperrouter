import React from 'react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e0e0e0] font-sans flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto px-6 py-16 text-gray-300 leading-relaxed w-full">
        <h1 className="text-3xl font-bold text-white mb-2">Terms of Service (ToS)</h1>
        <p className="text-sm text-gray-500 mb-8">Last Updated: September 2026</p>

        <section className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-white mb-2">1. Acceptance of Terms</h2>
            <p>
              By accessing HyperRouter, utilizing our search dashboard, subscribing to inventory alerts, or making calls via our routing APIs, you agree to be bound by these Terms of Service, along with our Acceptable Use Policy and Compliance guidelines.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-2">2. Service Architecture & Telemetry</h2>
            <p>
              HyperRouter provides real-time compute pricing indices, availability indicators, and programmatic routing. While we strive for accuracy through multi-region polling and cache invalidation, pricing and availability fluctuate dynamically at the provider level and are subject to immediate change without notice.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-2">3. Subscription Tiers & Billing</h2>
            <p>
              Billing cycles for paid tiers (Starter, Pro Team, Enterprise API) are recurring. Cancellations take effect at the conclusion of the current billing cycle. Merchant of Record (MoR) facilities handle payment collection, currency conversion, and applicable sales tax/VAT compliance.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-2">4. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with applicable corporate laws, without regard to its conflict of law principles. Any dispute arising under these terms shall be subject to the exclusive jurisdiction of the competent arbitration bodies.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

import React from 'react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e0e0e0] font-sans flex flex-col">
      <Navbar />
      <main className="flex-1 w-full max-w-5xl mx-auto px-6 py-20">
        <article className="max-w-none text-slate-300 leading-relaxed space-y-8">
          <header className="mb-16">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">Master Terms of Service</h1>
            <p className="text-sm font-medium text-slate-500 uppercase tracking-widest">Effective Date: September 1, 2026</p>
            <p className="text-sm font-medium text-slate-500 uppercase tracking-widest mt-1">Version: 3.0.0-Enterprise</p>
          </header>

          <section>
            <h2 className="text-2xl font-semibold text-slate-100 mt-12 mb-6 tracking-wide border-b border-slate-800 pb-3">1. Binding Agreement and Acceptance</h2>
            <p className="mb-4">
              These Master Terms of Service ("Terms") constitute a legally binding agreement between you, either an individual or a corporate entity ("Customer", "you", or "your"), and HyperRouter Inc. ("HyperRouter", "we", "us"). By registering an account, invoking our API endpoints, utilizing our routing dashboard, or remitting payment for our services, you expressly acknowledge that you have read, understood, and agree to be bound by these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-100 mt-12 mb-6 tracking-wide border-b border-slate-800 pb-3">2. Service Architecture and Aggregation Limitations</h2>
            <p className="mb-4">
              HyperRouter provides an intelligent orchestration, pricing metadata normalization, and telemetry routing gateway (the "Service") for high-performance GPU compute. You acknowledge that HyperRouter operates strictly as a <strong>broker and middleware aggregator</strong>. We do not own, operate, or maintain the underlying physical data centers, host hypervisors, or hardware instances (e.g., NVIDIA H100s, B200s). The execution of your compute workloads relies entirely on third-party upstream providers (the "Vendors").
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-100 mt-12 mb-6 tracking-wide border-b border-slate-800 pb-3">3. Account Registration and Corporate Identity</h2>
            <p className="mb-4">
              Customers must provide accurate, current, and complete corporate identity information during registration. You are strictly responsible for maintaining the confidentiality of your API keys, OAuth tokens, and IAM credentials. HyperRouter holds no liability for compromised API keys that result in unauthorized cluster provisioning or excessive billing charges.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-100 mt-12 mb-6 tracking-wide border-b border-slate-800 pb-3">4. Pricing Fluctuation and Spot Instance Volatility</h2>
            <p className="mb-4">
              Due to the nature of the global GPU spot market, pricing metadata displayed on the HyperRouter dashboard or queried via API is highly volatile. HyperRouter makes no guarantees regarding the execution price of a spot instance until the terminal Vendor explicitly confirms the bid. You accept all financial risk associated with dynamic spot pricing surges and interruptible workloads.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-100 mt-12 mb-6 tracking-wide border-b border-slate-800 pb-3">5. Subscription Billing, Taxes, and Payment</h2>
            <p className="mb-4">
              Access to premium API tiers (e.g., Starter, Pro Team, Enterprise) requires a valid recurring payment method. Billing is executed in advance on a monthly or annual cadence. All fees are exclusive of applicable federal, state, local, or international taxes (including VAT, GST, and sales tax), which will be calculated and collected by our Merchant of Record (MoR) based on your billing jurisdiction. Failure to remit payment will result in immediate suspension of API routing capabilities.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-100 mt-12 mb-6 tracking-wide border-b border-slate-800 pb-3">6. No Service Level Agreement (SLA) Warranty</h2>
            <p className="mb-4">
              While HyperRouter engineers our edge infrastructure for high availability, <strong>we explicitly disclaim any Service Level Agreement (SLA) or uptime guarantees</strong>. The Service is provided on an "AS IS" and "AS AVAILABLE" basis. Uptime representations made by upstream Vendors do not transfer through HyperRouter. We bear no liability for dropped routing packets, stale API cache hits, or upstream hardware degradation.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-100 mt-12 mb-6 tracking-wide border-b border-slate-800 pb-3">7. Absolute Limitation of Liability</h2>
            <p className="mb-4">
              TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL HYPERROUTER, ITS DIRECTORS, EMPLOYEES, OR INVESTORS BE LIABLE FOR ANY INDIRECT, PUNITIVE, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR EXEMPLARY DAMAGES, INCLUDING WITHOUT LIMITATION DAMAGES FOR LOSS OF PROFITS, LOSS OF TRAINING RUNS, CORRUPTED AI MODELS, OR BUSINESS INTERRUPTION, ARISING OUT OF OR RELATING TO THE USE OF THE SERVICE.
            </p>
            <p className="mb-4">
              UNDER NO CIRCUMSTANCES WILL HYPERROUTER'S AGGREGATE CUMULATIVE LIABILITY EXCEED THE TOTAL AMOUNTS ACTUALLY PAID BY YOU TO HYPERROUTER FOR THE SERVICE DURING THE THREE (3) MONTHS IMMEDIATELY PRECEDING THE CLAIM.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-100 mt-12 mb-6 tracking-wide border-b border-slate-800 pb-3">8. Comprehensive Indemnification</h2>
            <p className="mb-4">
              You agree to indemnify, defend, and hold harmless HyperRouter and its upstream Vendors from any claims, damages, liabilities, costs, and expenses (including reasonable attorneys' fees) arising out of: (a) your violation of these Terms or the Acceptable Use Policy; (b) your deployment of malicious code, deepfakes, or non-compliant workloads; or (c) any regulatory penalties incurred due to your breach of EAR/OFAC sanctions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-100 mt-12 mb-6 tracking-wide border-b border-slate-800 pb-3">9. Intellectual Property and API License</h2>
            <p className="mb-4">
              HyperRouter grants you a limited, non-exclusive, non-transferable, revocable license to access our proprietary dashboard and REST/GraphQL APIs. You shall not reverse engineer, decompile, or attempt to extract the source code of our routing algorithms. All trademarks, telemetry schemas, and UI/UX designs remain the exclusive intellectual property of HyperRouter Inc.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-100 mt-12 mb-6 tracking-wide border-b border-slate-800 pb-3">10. User Content and Telemetry Rights</h2>
            <p className="mb-4">
              You retain all rights to the code and Docker containers you deploy to upstream Vendors. HyperRouter does not inspect your payload memory or storage volumes. However, you grant HyperRouter a perpetual, royalty-free license to utilize anonymized routing telemetry, latency metrics, and API request metadata to improve our global load-balancing algorithms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-100 mt-12 mb-6 tracking-wide border-b border-slate-800 pb-3">11. Termination and Suspension Rights</h2>
            <p className="mb-4">
              We reserve the right to suspend or terminate your API access instantly and without notice if we detect anomalous behavior, unpaid invoices, or violations of our AUP/EAR policies. Upon termination, all active routing tokens will be revoked. Clauses relating to Limitation of Liability, Indemnification, and Governing Law shall survive termination.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-100 mt-12 mb-6 tracking-wide border-b border-slate-800 pb-3">12. Governing Law and Jurisdiction</h2>
            <p className="mb-4">
              These Terms, and any dispute arising from them, shall be governed by and construed in accordance with the laws of the Republic of Korea (South Korea), without regard to its conflict of law principles. The United Nations Convention on Contracts for the International Sale of Goods is explicitly excluded.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-100 mt-12 mb-6 tracking-wide border-b border-slate-800 pb-3">13. Binding Arbitration and Class Action Waiver</h2>
            <p className="mb-4">
              Any controversy or claim arising out of or relating to these Terms shall be settled by the exclusive jurisdiction of the competent courts in Seoul, Republic of Korea. <strong>YOU WAIVE YOUR RIGHT TO PARTICIPATE IN A CLASS ACTION LAWSUIT OR CLASS-WIDE ARBITRATION.</strong>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-100 mt-12 mb-6 tracking-wide border-b border-slate-800 pb-3">14. Severability and Entire Agreement</h2>
            <p className="mb-4">
              If any provision of these Terms is found to be unenforceable or invalid by a court of competent jurisdiction, that provision will be limited or eliminated to the minimum extent necessary so that the remainder of the Terms will continue in full force and effect. These Terms constitute the entire agreement between you and HyperRouter.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-100 mt-12 mb-6 tracking-wide border-b border-slate-800 pb-3">15. Contact Information</h2>
            <p className="mb-4">
              Formal legal notices should be sent via registered mail to our corporate counsel or electronically to our legal department:
            </p>
            <ul className="list-none space-y-2 text-slate-400">
              <li><strong>Email:</strong> legal@hyperrouter.com</li>
              <li><strong>Address:</strong> HyperRouter Legal Dept., Incheon, Republic of Korea</li>
            </ul>
          </section>
        </article>
      </main>
      <Footer />
    </div>
  );
}

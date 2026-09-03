import React from 'react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

export default function AMLPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e0e0e0] font-sans flex flex-col">
      <Navbar />
      <main className="flex-1 w-full max-w-5xl mx-auto px-6 py-20">
        <article className="max-w-none text-slate-300 leading-relaxed space-y-8">
          <header className="mb-16">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">Anti-Money Laundering (AML) & KYC Policy</h1>
            <p className="text-sm font-medium text-slate-500 uppercase tracking-widest">Effective Date: September 1, 2026</p>
            <p className="text-sm font-medium text-slate-500 uppercase tracking-widest mt-1">Version: 1.2.0-FinCrime</p>
          </header>

          <section>
            <h2 className="text-2xl font-semibold text-slate-100 mt-12 mb-6 tracking-wide border-b border-slate-800 pb-3">1. Policy Statement and Commitment</h2>
            <p className="mb-4">
              HyperRouter Inc. is fundamentally committed to preventing our aggregation infrastructure and API endpoints from being utilized to facilitate money laundering, terrorist financing, or any other financial crimes. We enforce stringent anti-money laundering (AML) protocols to ensure the integrity of the global GPU compute ecosystem.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-100 mt-12 mb-6 tracking-wide border-b border-slate-800 pb-3">2. Regulatory Framework Alignment</h2>
            <p className="mb-4">
              While HyperRouter operates strictly as a metadata aggregator and routing middleware—not a licensed financial institution—we voluntarily align our compliance standards with the guidelines established by the Financial Action Task Force (FATF) and the US Bank Secrecy Act (BSA) to mitigate regulatory risk.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-100 mt-12 mb-6 tracking-wide border-b border-slate-800 pb-3">3. Prohibition of Illicit Funds</h2>
            <p className="mb-4">
              Users are strictly prohibited from using subscription tiers, purchasing routing credits, or paying for upstream compute usage with funds derived from illegal activities, including but not limited to drug trafficking, ransomware extortion, cyber fraud, or human trafficking.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-100 mt-12 mb-6 tracking-wide border-b border-slate-800 pb-3">4. Aggregation Gateway Nature (MoR Handoff)</h2>
            <p className="mb-4">
              HyperRouter utilizes licensed Merchant of Record (MoR) facilities (e.g., Stripe, LemonSqueezy) to process fiat transactions. HyperRouter does not directly process, hold, or transmit customer funds. All Payment Card Industry (PCI) compliance and baseline transactional AML monitoring are executed by our MoR partners prior to the issuance of API routing tokens.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-100 mt-12 mb-6 tracking-wide border-b border-slate-800 pb-3">5. Upstream Provider KYC Obligations</h2>
            <p className="mb-4">
              When HyperRouter routes a workload to a specialized GPU vendor (e.g., Lambda, CoreWeave), the final provisioning of the hardware may require you to pass the upstream Vendor’s proprietary Know-Your-Customer (KYC) identity verification. HyperRouter cannot bypass or override a Vendor’s KYC failure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-100 mt-12 mb-6 tracking-wide border-b border-slate-800 pb-3">6. User Identity Obligations</h2>
            <p className="mb-4">
              For Enterprise API tiers, HyperRouter requires the submission of verifiable corporate identities, including valid business registration numbers, corporate domains, and the identification of Ultimate Beneficial Owners (UBOs) holding more than 25% equity, prior to lifting API rate limits.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-100 mt-12 mb-6 tracking-wide border-b border-slate-800 pb-3">7. Suspicious Activity Monitoring</h2>
            <p className="mb-4">
              We employ heuristic monitoring to detect anomalous financial behavior, such as:
            </p>
            <ul className="list-disc pl-6 space-y-3 text-slate-400 mb-6">
              <li>High-velocity prepaid credit stacking followed by immediate instance abandonment.</li>
              <li>Usage of anonymous, untraceable prepaid cards or high-risk virtual credit cards (VCCs).</li>
              <li>Discrepancies between the geolocation of the IP address, the billing address, and the BIN country of the issuing bank.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-100 mt-12 mb-6 tracking-wide border-b border-slate-800 pb-3">8. Sanctions Screening Integration</h2>
            <p className="mb-4">
              In conjunction with our EAR/OFAC policies, all billing details are cross-referenced against global sanctions lists (including the SDN list, EU Consolidated List, and HM Treasury sanctions). Any match will result in an immediate rejection of the transaction and the freezing of the account.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-100 mt-12 mb-6 tracking-wide border-b border-slate-800 pb-3">9. Refusal of Service</h2>
            <p className="mb-4">
              HyperRouter reserves the absolute right to refuse service, cancel routing tokens, or refund transactions if we cannot satisfactorily verify your corporate identity, or if our risk algorithms flag the transaction as possessing a high probability of money laundering or fraud.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-100 mt-12 mb-6 tracking-wide border-b border-slate-800 pb-3">10. Record Keeping and Audit Trails</h2>
            <p className="mb-4">
              To assist in financial crime investigations, we retain API access logs, billing metadata, and KYC artifacts (where applicable) for a minimum of seven (7) years, or as mandated by applicable regulatory requirements in the jurisdiction of operation.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-100 mt-12 mb-6 tracking-wide border-b border-slate-800 pb-3">11. Law Enforcement Cooperation</h2>
            <p className="mb-4">
              HyperRouter proactively cooperates with international law enforcement agencies, including FinCEN, the FBI, and Europol. We will promptly comply with valid subpoenas, warrants, and Suspicious Activity Report (SAR) filing requirements without providing notice to the suspected user (anti-tipping rules).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-100 mt-12 mb-6 tracking-wide border-b border-slate-800 pb-3">12. Non-Circumvention of Payment Routing</h2>
            <p className="mb-4">
              Users may not attempt to construct "layering" schemes by bouncing routing credits between multiple HyperRouter accounts. API credits are strictly non-transferable and cannot be liquidated back into fiat currency under any circumstances, mitigating their utility for money laundering.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-100 mt-12 mb-6 tracking-wide border-b border-slate-800 pb-3">13. Cryptographic Payment Rules</h2>
            <p className="mb-4">
              Should HyperRouter ever integrate Web3 or cryptocurrency payment gateways in the future, all on-chain transactions will be subjected to blockchain analytics screening (e.g., via Chainalysis or Elliptic) to reject funds originating from sanctioned mixers (e.g., Tornado Cash), darknet markets, or known ransomware wallets.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-100 mt-12 mb-6 tracking-wide border-b border-slate-800 pb-3">14. Internal AML Training</h2>
            <p className="mb-4">
              All HyperRouter employees with access to billing resolution systems undergo mandatory, annual AML and Anti-Fraud training to ensure they can adequately identify and escalate suspicious red flags during customer support interactions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-100 mt-12 mb-6 tracking-wide border-b border-slate-800 pb-3">15. Contact the AML Compliance Officer</h2>
            <p className="mb-4">
              Financial institutions, upstream providers, or law enforcement entities seeking to verify our AML controls or issue a subpoena may contact our designated compliance department:
            </p>
            <ul className="list-none space-y-2 text-slate-400">
              <li><strong>Email:</strong> aml-compliance@hyperrouter.com</li>
              <li><strong>Address:</strong> HyperRouter Legal Dept., Incheon, Republic of Korea</li>
            </ul>
          </section>
        </article>
      </main>
      <Footer />
    </div>
  );
}

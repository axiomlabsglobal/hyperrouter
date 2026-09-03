import React from 'react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e0e0e0] font-sans flex flex-col">
      <Navbar />
      <main className="flex-1 w-full max-w-5xl mx-auto px-6 py-20">
        <article className="max-w-none text-slate-300 leading-relaxed space-y-8">
          <header className="mb-16">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">Master Privacy Policy</h1>
            <p className="text-sm font-medium text-slate-500 uppercase tracking-widest">Effective Date: September 1, 2026</p>
            <p className="text-sm font-medium text-slate-500 uppercase tracking-widest mt-1">Version: 2.1.0-Global</p>
          </header>

          <section>
            <h2 className="text-2xl font-semibold text-slate-100 mt-12 mb-6 tracking-wide border-b border-slate-800 pb-3">1. Introduction and Scope</h2>
            <p className="mb-4">
              HyperRouter Inc. ("HyperRouter," "we," "our," or "us") is deeply committed to protecting the privacy and security of your personal data. This Master Privacy Policy ("Policy") governs the collection, processing, and transfer of personal information across our global GPU compute aggregation platform, API endpoints, telemetry gateways, and associated services (collectively, the "Services").
            </p>
            <p className="mb-4">
              This Policy has been architected to strictly comply with the General Data Protection Regulation (Regulation (EU) 2016/679) ("GDPR"), the California Consumer Privacy Act ("CCPA") as amended by the California Privacy Rights Act ("CPRA"), the UK Data Protection Act 2018, and other applicable global data protection frameworks.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-100 mt-12 mb-6 tracking-wide border-b border-slate-800 pb-3">2. Data Controller vs. Data Processor</h2>
            <p className="mb-4">
              Under the GDPR and equivalent frameworks, HyperRouter operates primarily as a <strong>Data Controller</strong> concerning the account, billing, and telemetry information of our direct users. However, in scenarios where HyperRouter routes cryptographic keys or specific operational payloads to upstream GPU infrastructure providers (e.g., AWS, GCP, CoreWeave), HyperRouter acts as a <strong>Data Processor</strong> or <strong>Sub-processor</strong>, transferring processing obligations to the terminal host.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-100 mt-12 mb-6 tracking-wide border-b border-slate-800 pb-3">3. Categories of Personal Data Collected</h2>
            <p className="mb-4">We collect the following categories of personal data to facilitate our aggregation ecosystem:</p>
            <ul className="list-disc pl-6 space-y-3 text-slate-400 mb-6">
              <li><strong className="text-slate-200">Identity & Contact Data:</strong> Full legal name, corporate email address, organizational affiliation, and authorized representative details.</li>
              <li><strong className="text-slate-200">Financial & Transactional Data:</strong> Encrypted payment tokens, billing address, tax identification numbers (VAT/GST), and API usage ledgers. (Note: Raw credit card numbers are tokenized via PCI-DSS Level 1 compliant Merchant of Record facilities and never touch HyperRouter's internal memory).</li>
              <li><strong className="text-slate-200">Technical & Telemetry Data:</strong> IP addresses, BGP routing anomalies, TLS handshake parameters, browser user agents, MAC addresses (if applicable via agent), and API request headers.</li>
              <li><strong className="text-slate-200">Usage & Behavioral Data:</strong> Search queries within our inventory, cluster provisioning requests, frequency of alerts, and navigation paths across our dashboard.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-100 mt-12 mb-6 tracking-wide border-b border-slate-800 pb-3">4. Cookies, Web Beacons, and Tracking Technologies</h2>
            <p className="mb-4">
              We employ automated tracking technologies to ensure session integrity, prevent CSRF attacks, and monitor platform performance. Our use of cookies is categorized into:
            </p>
            <ul className="list-disc pl-6 space-y-3 text-slate-400 mb-6">
              <li><strong className="text-slate-200">Strictly Necessary Cookies:</strong> Essential for API authentication, load balancing, and maintaining Zero Trust network access boundaries. Cannot be disabled.</li>
              <li><strong className="text-slate-200">Analytical/Performance Cookies:</strong> Utilized for distributed tracing and capturing latency metrics (e.g., via Datadog or OpenTelemetry).</li>
              <li><strong className="text-slate-200">Targeting/Advertising Cookies:</strong> We do <strong>not</strong> deploy third-party advertising cookies. HyperRouter does not sell your telemetry data to data brokers.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-100 mt-12 mb-6 tracking-wide border-b border-slate-800 pb-3">5. Purpose and Legal Basis for Processing</h2>
            <p className="mb-4">We process your Personal Data relying on the following lawful bases under Art. 6 GDPR:</p>
            <ul className="list-disc pl-6 space-y-3 text-slate-400 mb-6">
              <li><strong>Contractual Necessity:</strong> To provision routing tokens, maintain API access, and process automated billing settlements.</li>
              <li><strong>Legitimate Interests:</strong> To detect DDoS attacks, prevent fraudulent API requests, and improve our proprietary routing algorithms.</li>
              <li><strong>Legal Obligation:</strong> To comply with OFAC sanctions screening, export control regulations (EAR), and financial auditing requirements.</li>
              <li><strong>Consent:</strong> For opt-in marketing communications and non-essential analytical tracking.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-100 mt-12 mb-6 tracking-wide border-b border-slate-800 pb-3">6. Sub-processors and Third-Party Data Sharing</h2>
            <p className="mb-4">
              To operate our globally distributed infrastructure, HyperRouter engages trusted third-party Sub-processors. We maintain strict Data Processing Agreements (DPAs) with all entities. Current Sub-processors include:
            </p>
            <ul className="list-disc pl-6 space-y-3 text-slate-400 mb-6">
              <li><strong>Upstream GPU Providers:</strong> AWS, Google Cloud, CoreWeave, Lambda, etc., for the explicit purpose of routing your compute workloads.</li>
              <li><strong>Identity & Authentication:</strong> Auth0 / NextAuth for OIDC and SAML SSO resolution.</li>
              <li><strong>Payment Processors:</strong> Stripe or LemonSqueezy (acting as MoR) for handling financial compliance.</li>
              <li><strong>Security & Anti-Fraud:</strong> Cloudflare for WAF, Bot Management, and edge compute execution.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-100 mt-12 mb-6 tracking-wide border-b border-slate-800 pb-3">7. International Data Transfers (Cross-Border)</h2>
            <p className="mb-4">
              HyperRouter is a startup incorporated in the Republic of Korea, providing services globally. Data submitted to our platform may be routed globally to optimize latency. Transfers of personal data originating from the European Economic Area (EEA), the UK, or Switzerland to non-adequate jurisdictions are safeguarded by the <strong>Standard Contractual Clauses (SCCs)</strong> approved by the European Commission, alongside supplementary technical measures including AES-256 encryption at rest and TLS 1.3 in transit.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-100 mt-12 mb-6 tracking-wide border-b border-slate-800 pb-3">8. European Privacy Rights (GDPR)</h2>
            <p className="mb-4">If you are a resident of the EEA, UK, or Switzerland, you possess absolute rights regarding your data:</p>
            <ul className="list-disc pl-6 space-y-3 text-slate-400 mb-6">
              <li><strong className="text-slate-200">Right to be Forgotten (Erasure):</strong> You may request the permanent deletion of your PII from our active databases, subject to legal retention overrides (e.g., tax law, OFAC logs).</li>
              <li><strong className="text-slate-200">Right to Portability:</strong> You may request a machine-readable export (JSON/CSV) of your historical API usage and billing ledgers.</li>
              <li><strong className="text-slate-200">Right to Rectification:</strong> You may correct inaccurate organizational or billing data directly via the dashboard or by contacting DPO@hyperrouter.com.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-100 mt-12 mb-6 tracking-wide border-b border-slate-800 pb-3">9. California Privacy Rights (CCPA/CPRA)</h2>
            <p className="mb-4">
              Pursuant to the CCPA and CPRA, California residents have the right to know what personal information is collected, the right to delete that information, and the right to opt-out of the "sale" or "sharing" of personal information.
            </p>
            <p className="mb-4">
              <strong>HyperRouter does not sell your personal information.</strong> We do not engage in behavioral advertising cross-context sharing that qualifies as a "sale" under CPRA. You may exercise your rights by submitting a verifiable consumer request via our privacy portal. We will not discriminate against you for exercising your CCPA rights.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-100 mt-12 mb-6 tracking-wide border-b border-slate-800 pb-3">10. Data Retention Protocols</h2>
            <p className="mb-4">
              HyperRouter retains personal data only for as long as necessary to fulfill the purposes outlined in this Policy. Typical retention periods are as follows:
            </p>
            <ul className="list-disc pl-6 space-y-3 text-slate-400 mb-6">
              <li><strong>Active Accounts:</strong> Retained for the lifetime of the active API subscription.</li>
              <li><strong>Telemetry & Logs:</strong> Application and network logs are rotated and purged after 90 days unless preserved for active security incident investigations.</li>
              <li><strong>Financial Records:</strong> Invoices and billing metadata are retained for 7 years to comply with South Korean NTS (National Tax Service) and international tax obligations.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-100 mt-12 mb-6 tracking-wide border-b border-slate-800 pb-3">11. Security and Cryptographic Measures</h2>
            <p className="mb-4">
              HyperRouter implements defense-in-depth security paradigms. Access to backend production databases requires hardware security keys (FIDO2/WebAuthn), zero-trust network access tunnels, and is governed by strict Role-Based Access Control (RBAC). All data at rest is encrypted using AES-256-GCM. We maintain continuous SOC 2 Type II compliance auditing.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-100 mt-12 mb-6 tracking-wide border-b border-slate-800 pb-3">12. Automated Decision Making and Profiling</h2>
            <p className="mb-4">
              HyperRouter utilizes automated algorithmic screening to detect fraudulent registrations, circumvention of EAR/OFAC sanctions, and botnet behavior. If an automated decision results in the termination or suspension of your account, you have the right to contest the decision and request a manual review by our compliance team.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-100 mt-12 mb-6 tracking-wide border-b border-slate-800 pb-3">13. Children's Privacy (COPPA)</h2>
            <p className="mb-4">
              Our infrastructure routing services are strictly designed for enterprise, B2B, and adult professional use. We do not knowingly collect personal data from individuals under the age of eighteen (18). If we become aware that a minor has provided us with personal data, we will immediately purge such data from our systems.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-100 mt-12 mb-6 tracking-wide border-b border-slate-800 pb-3">14. Material Changes to this Policy</h2>
            <p className="mb-4">
              HyperRouter reserves the right to amend this Policy at our discretion. Material changes affecting data processing rights will be communicated via mandatory dashboard notifications and email alerts to designated administrative contacts at least 30 days prior to enforcement.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-100 mt-12 mb-6 tracking-wide border-b border-slate-800 pb-3">15. Contact the Data Protection Officer (DPO)</h2>
            <p className="mb-4">
              For any inquiries regarding this Privacy Policy, subject access requests (DSAR), or compliance matters, please contact our global Data Protection Officer:
            </p>
            <ul className="list-none space-y-2 text-slate-400">
              <li><strong>Email:</strong> privacy@hyperrouter.com</li>
              <li><strong>Address:</strong> HyperRouter Legal Dept., Incheon, Republic of Korea</li>
            </ul>
          </section>
        </article>
      </main>
      <Footer />
    </div>
  );
}

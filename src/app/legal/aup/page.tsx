import React from 'react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

export default function AUPPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e0e0e0] font-sans flex flex-col">
      <Navbar />
      <main className="flex-1 w-full max-w-5xl mx-auto px-6 py-20">
        <article className="max-w-none text-slate-300 leading-relaxed space-y-8">
          <header className="mb-16">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">Acceptable Use Policy (AUP)</h1>
            <p className="text-sm font-medium text-slate-500 uppercase tracking-widest">Effective Date: September 1, 2026</p>
            <p className="text-sm font-medium text-slate-500 uppercase tracking-widest mt-1">Version: 2.5.0-Compliance</p>
          </header>

          <section>
            <h2 className="text-2xl font-semibold text-slate-100 mt-12 mb-6 tracking-wide border-b border-slate-800 pb-3">1. Purpose and Applicability</h2>
            <p className="mb-4">
              This Acceptable Use Policy ("AUP") defines the permissible and strictly prohibited uses of the HyperRouter GPU aggregation network, API endpoints, and any routed third-party infrastructure. This policy applies uniformly to all users, corporate entities, researchers, and automated systems interfacing with HyperRouter.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-100 mt-12 mb-6 tracking-wide border-b border-slate-800 pb-3">2. Prohibition of Harmful AI Workloads and Deepfakes</h2>
            <p className="mb-4">
              HyperRouter strictly forbids utilizing our routed GPU compute for the generation, training, fine-tuning, or dissemination of malicious Artificial Intelligence models. This includes, but is not limited to:
            </p>
            <ul className="list-disc pl-6 space-y-3 text-slate-400 mb-6">
              <li><strong>Non-Consensual Synthetic Media:</strong> Creating deepfake pornography or any synthetic media depicting individuals without explicit, documented consent.</li>
              <li><strong>Social Engineering & Disinformation:</strong> Training LLMs specifically optimized for spear-phishing, mass disinformation campaigns, or election manipulation.</li>
              <li><strong>Autonomous Cyber Weapons:</strong> Developing AI agents designed to autonomously exploit zero-day vulnerabilities or bypass authentication mechanisms.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-100 mt-12 mb-6 tracking-wide border-b border-slate-800 pb-3">3. Strict Ban on Illicit Cryptomining</h2>
            <p className="mb-4">
              The use of HyperRouter to aggregate compute for cryptocurrency mining (Proof-of-Work protocols) is inherently forbidden unless explicit, written authorization has been granted by both HyperRouter and the specific upstream cloud provider. Covert mining scripts, unapproved mining containers, or hijacking spot instances to mine altcoins will result in instant API key revocation and forfeiture of all prepaid balances.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-100 mt-12 mb-6 tracking-wide border-b border-slate-800 pb-3">4. Network Abuse, DDoS, and Botnets</h2>
            <p className="mb-4">
              You shall not leverage the high-bandwidth backbone of upstream GPU clusters to execute network attacks. Prohibited network abuse includes:
            </p>
            <ul className="list-disc pl-6 space-y-3 text-slate-400 mb-6">
              <li>Initiating Distributed Denial of Service (DDoS), SYN floods, or UDP amplification attacks.</li>
              <li>Operating Command and Control (C2) servers for botnets.</li>
              <li>Port scanning, packet sniffing, or any non-consensual telemetry gathering against external networks.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-100 mt-12 mb-6 tracking-wide border-b border-slate-800 pb-3">5. System and Hypervisor Abuse</h2>
            <p className="mb-4">
              HyperRouter facilitates bare-metal and virtualized cluster access. You are expressly prohibited from:
            </p>
            <ul className="list-disc pl-6 space-y-3 text-slate-400 mb-6">
              <li>Attempting hypervisor breakouts or virtual machine escape exploits (VM Escape).</li>
              <li>Engaging in memory scraping or side-channel attacks against adjacent multi-tenant instances (e.g., Rowhammer, Spectre variations).</li>
              <li>Intentionally exhausting disk I/O, network bandwidth, or CPU cycles to degrade the overall performance of the host node ("noisy neighbor" attacks).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-100 mt-12 mb-6 tracking-wide border-b border-slate-800 pb-3">6. Unauthorized Vulnerability Scanning</h2>
            <p className="mb-4">
              Running automated penetration testing suites (e.g., Nessus, Metasploit, Nmap) against HyperRouter's own infrastructure, or utilizing routed infrastructure to scan external targets without a documented Bug Bounty mandate or explicit written consent from the target, is a severe violation of this AUP.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-100 mt-12 mb-6 tracking-wide border-b border-slate-800 pb-3">7. SPAM and Mass Communication</h2>
            <p className="mb-4">
              Routed compute clusters may not be used to transmit bulk, unsolicited commercial emails (SPAM) or SMS messages. You must comply strictly with the CAN-SPAM Act of 2003 and equivalent global anti-spam legislation. SMTP ports may be aggressively throttled or blocked entirely by upstream providers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-100 mt-12 mb-6 tracking-wide border-b border-slate-800 pb-3">8. Intellectual Property and Copyright Infringement</h2>
            <p className="mb-4">
              You must not use our infrastructure to host, process, distribute, or link to pirated software, unauthorized copyrighted media, or counterfeit goods. HyperRouter strictly complies with the Digital Millennium Copyright Act (DMCA). Upon receipt of a valid DMCA takedown notice, we will immediately route the request to the upstream terminal provider and suspend the offending routing token.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-100 mt-12 mb-6 tracking-wide border-b border-slate-800 pb-3">9. Handling of Highly Regulated Data</h2>
            <p className="mb-4">
              Unless a formal Business Associate Agreement (BAA) is executed directly between you and the upstream cloud provider, you may not route or process highly regulated data, including:
            </p>
            <ul className="list-disc pl-6 space-y-3 text-slate-400 mb-6">
              <li>Protected Health Information (PHI) subject to HIPAA regulations.</li>
              <li>Primary Cardholder Data subject to PCI-DSS compliance.</li>
              <li>Classified military data or strictly controlled government telemetry.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-100 mt-12 mb-6 tracking-wide border-b border-slate-800 pb-3">10. Bio-Weapon and Nuclear Proliferation Data</h2>
            <p className="mb-4">
              Under no circumstances may the aggregation platform be utilized for running simulations, folding algorithms, or AI models related to the design, development, or dissemination of biological weapons, chemical weapons, or nuclear armaments.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-100 mt-12 mb-6 tracking-wide border-b border-slate-800 pb-3">11. Monitoring and Auditing</h2>
            <p className="mb-4">
              While HyperRouter does not arbitrarily inspect the encrypted payloads deployed to upstream Vendors, we actively monitor API routing telemetry, metadata patterns, and network flow heuristics to detect AUP violations. We reserve the right to deploy automated anomaly detection agents.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-100 mt-12 mb-6 tracking-wide border-b border-slate-800 pb-3">12. Enforcement Actions</h2>
            <p className="mb-4">
              Violation of this AUP grants HyperRouter the unilateral right to immediately take enforcement action, which may include:
            </p>
            <ul className="list-disc pl-6 space-y-3 text-slate-400 mb-6">
              <li>Instant suspension or permanent termination of your API account.</li>
              <li>Confiscation of prepaid balances or routing credits.</li>
              <li>Sharing your telemetry and registration data with upstream Vendors and global law enforcement agencies (e.g., FBI, Europol).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-100 mt-12 mb-6 tracking-wide border-b border-slate-800 pb-3">13. Appeals Process</h2>
            <p className="mb-4">
              If you believe your account was suspended due to a false positive in our algorithmic AUP enforcement systems, you may submit a formal appeal within 7 days of the suspension notice to compliance@hyperrouter.com. The decision of the HyperRouter Legal and Compliance team following an appeal review is final.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-100 mt-12 mb-6 tracking-wide border-b border-slate-800 pb-3">14. Upstream Provider AUP Inheritance</h2>
            <p className="mb-4">
              Because HyperRouter routes workloads to varied infrastructure providers, you are inherently bound by the Acceptable Use Policies of the terminal host (e.g., AWS AUP, CoreWeave Terms of Use). A violation of an upstream Vendor's AUP is automatically deemed a violation of the HyperRouter AUP.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-100 mt-12 mb-6 tracking-wide border-b border-slate-800 pb-3">15. Reporting Violations</h2>
            <p className="mb-4">
              HyperRouter encourages the community and security researchers to report suspected AUP violations. Reports regarding abuse originating from infrastructure routed through our platform should be directed to abuse@hyperrouter.com. We maintain a zero-tolerance policy and will investigate all legitimate claims promptly.
            </p>
          </section>
        </article>
      </main>
      <Footer />
    </div>
  );
}

import React from 'react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

export default function EARPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e0e0e0] font-sans flex flex-col">
      <Navbar />
      <main className="flex-1 w-full max-w-5xl mx-auto px-6 py-20">
        <article className="max-w-none text-slate-300 leading-relaxed space-y-8">
          <header className="mb-16">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">Export Control & Compliance (EAR / OFAC)</h1>
            <p className="text-sm font-medium text-slate-500 uppercase tracking-widest">Effective Date: September 1, 2026</p>
            <p className="text-sm font-medium text-slate-500 uppercase tracking-widest mt-1">Version: 1.8.0-GlobalTrade</p>
          </header>

          <section>
            <h2 className="text-2xl font-semibold text-slate-100 mt-12 mb-6 tracking-wide border-b border-slate-800 pb-3">1. Introduction to Export Controls</h2>
            <p className="mb-4">
              HyperRouter Inc. provides programmatic routing to highly advanced computing infrastructure. Due to the strategic national security implications of Artificial Intelligence (AI) and high-density computing, access to specific hardware architectures routed through our platform is strictly regulated by the United States Government and international treaties.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-100 mt-12 mb-6 tracking-wide border-b border-slate-800 pb-3">2. Regulatory Jurisdiction</h2>
            <p className="mb-4">
              All services provided by HyperRouter are subject to the Export Administration Regulations (EAR) administered by the U.S. Department of Commerce’s Bureau of Industry and Security (BIS), as well as economic sanctions and embargoes managed by the Office of Foreign Assets Control (OFAC) of the U.S. Department of the Treasury.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-100 mt-12 mb-6 tracking-wide border-b border-slate-800 pb-3">3. Prohibited Destinations (Embargoed Nations)</h2>
            <p className="mb-4">
              You explicitly warrant that you are not located in, residing in, operating under the control of, or a national/resident of any country or territory subject to comprehensive U.S. embargoes. As of this policy’s effective date, these territories include, but are not limited to:
            </p>
            <ul className="list-disc pl-6 space-y-3 text-slate-400 mb-6">
              <li>Cuba</li>
              <li>Iran</li>
              <li>North Korea (Democratic People's Republic of Korea)</li>
              <li>Syria</li>
              <li>The comprehensively sanctioned regions of Ukraine (including Crimea, Donetsk, and Luhansk).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-100 mt-12 mb-6 tracking-wide border-b border-slate-800 pb-3">4. Prohibited Entities (SDN and Entity Lists)</h2>
            <p className="mb-4">
              HyperRouter strictly forbids access to our APIs and routing dashboard by individuals or entities identified on restricted party lists. You warrant that you are not:
            </p>
            <ul className="list-disc pl-6 space-y-3 text-slate-400 mb-6">
              <li>Identified on the U.S. Treasury Department’s list of Specially Designated Nationals (SDN) and Blocked Persons.</li>
              <li>Identified on the U.S. Department of Commerce’s Denied Persons List, Entity List, or Unverified List.</li>
              <li>Owned 50% or more, directly or indirectly, by one or more individuals or entities on the SDN list.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-100 mt-12 mb-6 tracking-wide border-b border-slate-800 pb-3">5. Restricted Hardware Thresholds (H100, B200, Next-Gen)</h2>
            <p className="mb-4">
              Certain accelerators aggregate via HyperRouter (including NVIDIA H100, H200, B200, AMD MI300X, and Google TPU v5e/v6) exceed the computational performance thresholds defined under ECCN 3A090 and 4A090. The routing of workloads to these specific tensor-core architectures is subject to localized end-user screening. HyperRouter will programmatically block routing requests originating from D:1, D:4, and D:5 country groups to these specific hardware tiers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-100 mt-12 mb-6 tracking-wide border-b border-slate-800 pb-3">6. End-Use Prohibitions (Military and Nuclear)</h2>
            <p className="mb-4">
              Compute aggregated via HyperRouter may not be utilized, directly or indirectly, for prohibited end-uses, including:
            </p>
            <ul className="list-disc pl-6 space-y-3 text-slate-400 mb-6">
              <li>The design, development, or production of nuclear, chemical, or biological weapons.</li>
              <li>Missile technology, space launch vehicles, or unmanned aerial vehicle (UAV) systems intended for military deployment.</li>
              <li>"Military End-Use" or "Military End-User" applications in countries subject to EAR Part 744.21.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-100 mt-12 mb-6 tracking-wide border-b border-slate-800 pb-3">7. Algorithmic Geofencing and Reputation Screening</h2>
            <p className="mb-4">
              HyperRouter employs automated IP intelligence, BGP routing analysis, and algorithmic geofencing to prevent unauthorized access. If your telemetry indicates an origin within a sanctioned territory, your API requests will return an HTTP 451 (Unavailable For Legal Reasons) error, and your routing token will be suspended.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-100 mt-12 mb-6 tracking-wide border-b border-slate-800 pb-3">8. Prohibition of VPN and Proxy Circumvention</h2>
            <p className="mb-4">
              The use of Virtual Private Networks (VPNs), proxy chains, Tor exit nodes, or any cryptographic obfuscation techniques to mask your physical geographic location to bypass EAR/OFAC screening is a severe material breach of this agreement. HyperRouter actively blocks known anonymizer IP blocks.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-100 mt-12 mb-6 tracking-wide border-b border-slate-800 pb-3">9. Ongoing User Warranties and Certifications</h2>
            <p className="mb-4">
              By initiating a routing request, you continuously certify that your organization maintains an internal export compliance program, and that the specific workload being routed does not violate U.S. or international export controls.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-100 mt-12 mb-6 tracking-wide border-b border-slate-800 pb-3">10. Indemnification for Export Violations</h2>
            <p className="mb-4">
              You agree to fully indemnify and hold HyperRouter Inc. and its upstream vendors harmless from any fines, penalties, legal fees, or reputational damage incurred as a direct or indirect result of your violation of EAR, OFAC, or other applicable export control laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-100 mt-12 mb-6 tracking-wide border-b border-slate-800 pb-3">11. Mandatory Reporting</h2>
            <p className="mb-4">
              If you become aware that your organization has been added to an SDN or Entity List while utilizing our platform, or if you discover that a workload was inadvertently routed on behalf of a sanctioned third party, you are legally obligated to report this incident to compliance@hyperrouter.com within 24 hours.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-100 mt-12 mb-6 tracking-wide border-b border-slate-800 pb-3">12. Compliance Audits</h2>
            <p className="mb-4">
              HyperRouter reserves the right to conduct compliance audits on enterprise accounts. Failure to provide requested organizational registration data or ultimate beneficial owner (UBO) documentation may result in immediate suspension of routing capabilities.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-100 mt-12 mb-6 tracking-wide border-b border-slate-800 pb-3">13. Immediate Suspension</h2>
            <p className="mb-4">
              We maintain a zero-tolerance policy. Any verifiable attempt to violate this EAR/OFAC policy will result in instant, unappealable termination of service, and we will proactively forward your routing logs to the Bureau of Industry and Security (BIS) Office of Export Enforcement.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-100 mt-12 mb-6 tracking-wide border-b border-slate-800 pb-3">14. Changes to Sanctions Regimes</h2>
            <p className="mb-4">
              International sanctions are highly dynamic. HyperRouter automatically updates its geofencing algorithms to comply with new directives issued by the U.S. Treasury or Commerce Departments. We hold no liability if your ongoing workload is abruptly terminated due to a sudden shift in geopolitical sanctions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-100 mt-12 mb-6 tracking-wide border-b border-slate-800 pb-3">15. Contact the Trade Compliance Officer</h2>
            <p className="mb-4">
              For questions regarding hardware classifications (ECCNs), export licensing requirements, or organizational compliance, please contact our Trade Compliance Officer:
            </p>
            <ul className="list-none space-y-2 text-slate-400">
              <li><strong>Email:</strong> compliance@hyperrouter.com</li>
              <li><strong>Address:</strong> HyperRouter Legal Dept., Incheon, Republic of Korea</li>
            </ul>
          </section>
        </article>
      </main>
      <Footer />
    </div>
  );
}

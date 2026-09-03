import React from 'react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

export default function EARPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e0e0e0] font-sans flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto px-6 py-16 text-gray-300 leading-relaxed w-full">
        <h1 className="text-3xl font-bold text-white mb-2">Export Control & Compliance (EAR / OFAC)</h1>
        <p className="text-sm text-gray-500 mb-8">Last Updated: September 2026</p>

        <section className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-white mb-2">1. US Export Regulations Notice</h2>
            <p>
              High-performance compute clusters and cutting-edge accelerators (including NVIDIA H100, H200, B200, and equivalent high-bandwidth hardware) are subject to stringent export restrictions governed by the United States Department of Commerce, Bureau of Industry and Security (BIS), pursuant to the Export Administration Regulations (EAR, 15 C.F.R. Parts 730–774).
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-2">2. Geographic & Entity Prohibitions</h2>
            <p className="mb-2">Users must warrant that they are not:</p>
            <ul className="list-disc pl-5 space-y-2 text-gray-400">
              <li>Located in, operating under the control of, or an entity of comprehensive embargoed nations (including Iran, North Korea, Syria, Cuba, and sanctioned regions of Ukraine).</li>
              <li>Identified on the US Treasury Department's Specially Designated Nationals (SDN) list or the BIS Entity List / Unverified List.</li>
              <li>Procuring high-density compute power for military end-use or weapon system simulations that violate unilateral or multilateral export controls.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-2">3. Geofencing & Access Denial</h2>
            <p>
              HyperRouter implements algorithmic geofencing, IP reputation screening, and routing restrictions. Any routing request suspected of circumvention via proxy chains or anomalous telemetry will be automatically rejected.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

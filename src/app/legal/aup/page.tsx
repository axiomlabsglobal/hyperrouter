import React from 'react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

export default function AUPPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e0e0e0] font-sans flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto px-6 py-16 text-gray-300 leading-relaxed w-full">
        <h1 className="text-3xl font-bold text-white mb-2">Acceptable Use Policy (AUP)</h1>
        <p className="text-sm text-gray-500 mb-8">Last Updated: September 2026</p>

        <section className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-white mb-2">1. Principle & Purpose</h2>
            <p>
              HyperRouter provides a decentralized aggregation and routing interface for high-performance computing (HPC) and GPU infrastructure. Users accessing infrastructure routed via HyperRouter agree to utilize computational resources strictly in accordance with ethical standards and applicable global regulations.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-2">2. Strictly Prohibited Activities</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-400">
              <li><strong className="text-gray-200">Malicious Exploits & Cyberattacks:</strong> Deploying denial-of-service (DDoS) engines, botnets, automated vulnerability scanning, brute-force exploits, or ransomware deployment.</li>
              <li><strong className="text-gray-200">Illicit Cryptomining:</strong> Unauthorized cryptocurrency mining, Proof-of-Work processing without provider consent, or mining operations that violate upstream cloud terms.</li>
              <li><strong className="text-gray-200">Harmful AI Workloads:</strong> Generating, training, or distributing non-consensual deepfakes, automated social engineering exploits, autonomous cyber weapons, or materials promoting severe harm and illicit trafficking.</li>
              <li><strong className="text-gray-200">Infrastructure Abuse:</strong> Attempting hypervisor breakouts, virtual machine escape attacks, memory scraping, or unauthorized sniffing of adjacent multi-tenant instances.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-2">3. Enforcement & Termination</h2>
            <p>
              HyperRouter and upstream infrastructure providers reserve the right to immediately sever API access, terminate active routing tokens, and report verifiable violations to law enforcement agencies and international regulatory bodies without prior notice.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

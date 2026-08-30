import React from 'react';
import { Navbar } from '@/components/navbar';

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e0e0e0] font-sans">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-20">
        <h1 className="text-3xl font-bold text-white mb-4 tracking-tight">Documentation</h1>
        <p className="text-[#888] mb-12">Learn how to leverage HyperRouter to optimize your AI infrastructure costs.</p>
        
        <div className="grid md:grid-cols-2 gap-6">
          <a href="#" className="p-6 border border-[#222] bg-[#111] hover:bg-[#161616] rounded-xl transition-colors group">
            <h2 className="text-lg font-semibold text-white mb-2 group-hover:text-green-400 transition-colors">Getting Started</h2>
            <p className="text-sm text-[#888]">Basic concepts and how to find the right GPU for your workload.</p>
          </a>
          <a href="#" className="p-6 border border-[#222] bg-[#111] hover:bg-[#161616] rounded-xl transition-colors group">
            <h2 className="text-lg font-semibold text-white mb-2 group-hover:text-green-400 transition-colors">Provider Integrations</h2>
            <p className="text-sm text-[#888]">Detailed information on how we route to AWS, GCP, Lambda, and more.</p>
          </a>
          <a href="#" className="p-6 border border-[#222] bg-[#111] hover:bg-[#161616] rounded-xl transition-colors group">
            <h2 className="text-lg font-semibold text-white mb-2 group-hover:text-green-400 transition-colors">Compliance Guide</h2>
            <p className="text-sm text-[#888]">Understanding SOC 2, HIPAA, and infrastructure tier filters.</p>
          </a>
        </div>
      </main>
    </div>
  );
}

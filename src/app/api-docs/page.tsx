import React from 'react';
import { Navbar } from '@/components/navbar';

export default function ApiDocsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e0e0e0] font-sans">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-20">
        <h1 className="text-3xl font-bold text-white mb-4 tracking-tight">HyperRouter API Reference</h1>
        <p className="text-[#888] mb-8">Programmatically access global GPU availability and pricing data across 19+ providers.</p>
        
        <div className="bg-[#111] border border-[#222] rounded-xl overflow-hidden">
          <div className="bg-[#161616] px-4 py-3 border-b border-[#222] flex items-center gap-3">
            <span className="text-xs font-bold text-green-500 bg-green-500/10 px-2 py-1 rounded">GET</span>
            <code className="text-sm text-white font-data">/api/v1/gpus/search</code>
          </div>
          <div className="p-4">
            <pre className="text-xs text-[#888] font-data overflow-x-auto">
{`curl -X GET "https://api.hyperrouter.com/v1/gpus/search?model=H100&max_price=3.00" \\
  -H "Authorization: Bearer YOUR_API_KEY"`}
            </pre>
          </div>
        </div>
      </main>
    </div>
  );
}

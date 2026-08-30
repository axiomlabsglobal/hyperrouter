"use client";

import React from 'react';
import Link from 'next/link';
import { Logo } from './logo';

const FOOTER_COLS = [
  {
    title: "Product",
    links: [
      { href: "/", label: "GPU Meta-Search" },
      { href: "/pricing", label: "Pricing" },
      { href: "/api-docs", label: "API Docs" },
      { href: "/docs", label: "Documentation" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "/docs", label: "Getting Started" },
      { href: "/api-docs", label: "API Reference" },
      { href: "https://status.hyperrouter.com", label: "Status", ext: true },
      { href: "mailto:sales@hyperrouter.com", label: "Contact Sales", ext: true },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/docs", label: "About" },
      { href: "/docs", label: "Blog" },
      { href: "/docs", label: "Careers" },
      { href: "https://github.com/hyperrouter", label: "GitHub", ext: true },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Service" },
      { href: "/compliance", label: "Export Compliance" },
      { href: "/privacy", label: "Cookie Settings" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-[#1a1a1a] bg-[#080808] mt-auto">
      <div className="max-w-[1600px] mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-block mb-3">
              <Logo size={20} />
            </Link>
            <p className="text-[11px] text-[#444] leading-relaxed mb-4">
              Global GPU compute metasearch.<br />Compare. Deploy. Save.
            </p>
            {/* Status Indicator */}
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
              <span className="text-[9px] text-[#444] font-data">All systems normal</span>
            </div>
          </div>

          {/* 4 Link Columns */}
          {FOOTER_COLS.map(col => (
            <div key={col.title}>
              <h4 className="text-[11px] font-semibold text-[#666] uppercase tracking-wider mb-3">{col.title}</h4>
              <ul className="flex flex-col gap-2">
                {col.links.map(link => (
                  <li key={link.label}>
                    {'ext' in link ? (
                      <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-[12px] text-[#555] hover:text-white transition-colors">
                        {link.label}
                      </a>
                    ) : (
                      <Link href={link.href} className="text-[12px] text-[#555] hover:text-white transition-colors">
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Legal Bar */}
        <div className="mt-8 pt-5 border-t border-[#141414] flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-[10px] text-[#333] font-data">
            © {new Date().getFullYear()} HyperRouter, Inc. All rights reserved.
          </p>
        </div>
        <div className="mt-4 space-y-2 text-xs text-gray-500 leading-relaxed">
          <p>
            All provider names, logos, and brands (e.g., AWS, GCP, Azure, RunPod) are property of their respective owners. HyperRouter is an independent GPU computing aggregation SaaS platform and is not affiliated with, endorsed by, or sponsored by any cloud provider.
          </p>
          <p>
            Prices and availability are estimates provided for informational purposes only. HyperRouter does not provision compute resources and is not responsible for final billing, data loss, or service interruptions.
          </p>
        </div>
      </div>
    </footer>
  );
}

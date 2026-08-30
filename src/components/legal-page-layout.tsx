import type { ReactNode } from 'react';
import Link from 'next/link';
import { ArrowUpRight, FileText, Scale, ShieldCheck } from 'lucide-react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

type LegalPageKind = 'privacy' | 'terms' | 'compliance';

interface LegalPageLayoutProps {
  kind: LegalPageKind;
  eyebrow: string;
  title: string;
  summary: string;
  updatedAt: string;
  children: ReactNode;
}

const LEGAL_LINKS: Array<{
  href: string;
  label: string;
  description: string;
  icon: typeof FileText;
  kind: LegalPageKind;
}> = [
  {
    href: '/terms',
    label: 'Terms of Service',
    description: 'Service role, external providers, and permitted use.',
    icon: Scale,
    kind: 'terms',
  },
  {
    href: '/privacy',
    label: 'Privacy Notice',
    description: 'How platform data is handled and your choices.',
    icon: ShieldCheck,
    kind: 'privacy',
  },
  {
    href: '/compliance',
    label: 'Trade Compliance',
    description: 'Sanctions, export controls, and reporting.',
    icon: FileText,
    kind: 'compliance',
  },
];

export function LegalPageLayout({ kind, eyebrow, title, summary, updatedAt, children }: LegalPageLayoutProps) {
  return (
    <div className="min-h-screen bg-[#090a0b] text-[#e7e9eb] font-sans flex flex-col">
      <Navbar />

      <main className="flex-1 border-b border-white/[0.06]">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8 py-12 sm:py-16">
          <div className="max-w-3xl pb-10 sm:pb-14 border-b border-white/[0.08]">
            <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-emerald-400 mb-4">{eyebrow}</p>
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-[-0.035em] text-white">{title}</h1>
            <p className="mt-5 max-w-2xl text-base sm:text-lg leading-8 text-[#a5adb5]">{summary}</p>
            <div className="mt-6 flex items-center gap-3 text-xs text-[#6f7780] font-data">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Last revised {updatedAt}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_280px] gap-10 lg:gap-16 mt-10 sm:mt-14">
            <article className="legal-copy max-w-3xl">{children}</article>

            <aside className="lg:sticky lg:top-20 h-fit border border-white/[0.08] rounded-xl bg-white/[0.025] p-4">
              <p className="px-2 pb-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#77808a]">Legal Centre</p>
              <nav className="space-y-1" aria-label="Legal documents">
                {LEGAL_LINKS.map((link) => {
                  const Icon = link.icon;
                  const isActive = link.kind === kind;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      aria-current={isActive ? 'page' : undefined}
                      className={`group block rounded-lg p-3 transition-colors ${
                        isActive ? 'bg-white/[0.08]' : 'hover:bg-white/[0.05]'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2 text-sm font-medium text-white">
                          <Icon size={15} className={isActive ? 'text-emerald-400' : 'text-[#7f8993]'} />
                          {link.label}
                        </div>
                        {!isActive && <ArrowUpRight size={13} className="text-[#59616a] group-hover:text-white transition-colors" />}
                      </div>
                      <p className="mt-1.5 pl-[23px] text-[11px] leading-4 text-[#7d8791]">{link.description}</p>
                    </Link>
                  );
                })}
              </nav>

              <div className="mt-4 pt-4 border-t border-white/[0.08] px-2">
                <p className="text-[11px] leading-5 text-[#7d8791]">
                  Policy or legal question? Contact{' '}
                  <a href="mailto:legal@hyperrouter.com" className="text-emerald-400 hover:text-emerald-300">legal@hyperrouter.com</a>.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

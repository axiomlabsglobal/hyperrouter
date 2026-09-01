"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from './logo';
import { AuthModal } from './auth-modal';
import { LanguageSwitcher } from './language-switcher';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useI18n } from '@/i18n/context';

export function Navbar() {
  const [authOpen, setAuthOpen] = useState(false);
  const pathname = usePathname();
  const { t } = useI18n();
  const { data: session } = useSession();

  const navLinks = [
    { href: '/', label: t('nav.instances') },
    { href: '/pricing', label: t('nav.pricing') },
    { href: '/api-docs', label: t('nav.api') },
    { href: '/docs', label: t('nav.docs') },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-[#1a1a1a] bg-[#0a0a0a]/95 backdrop-blur-sm">
        <div className="max-w-[1600px] mx-auto px-4 h-11 flex items-center justify-between">
          <Link href="/" className="group">
            <Logo size={22} className="group-hover:opacity-90 transition-opacity" />
          </Link>
          
          <nav className="hidden md:flex items-center gap-6 text-xs font-medium">
            {navLinks.map(link => {
              const isActive = pathname === link.href;
              return (
                <Link 
                  key={link.href} 
                  href={link.href}
                  className={`transition-colors ${isActive ? 'text-white' : 'text-[#666] hover:text-white'}`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
          
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <div className="w-px h-4 bg-[#222] mx-1"></div>
            {session ? (
              <>
                <Link href="/dashboard" className="text-xs font-medium text-white hover:text-green-400 transition-colors">
                  Dashboard
                </Link>
                <button 
                  onClick={() => signOut()}
                  className="text-xs font-medium bg-[#1a1a1a] hover:bg-[#222] text-white px-3 py-1.5 rounded border border-[#2a2a2a] transition-all"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <div className="flex flex-col items-end">
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
                    className="text-xs font-medium text-[#888] hover:text-white transition-colors"
                  >
                    {t('nav.login')}
                  </button>
                  <button 
                    onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
                    className="text-xs font-medium bg-[#1a1a1a] hover:bg-[#222] text-white px-3 py-1.5 rounded border border-[#2a2a2a] transition-all"
                  >
                    {t('nav.signup')}
                  </button>
                </div>
                <span className="text-[9px] text-[#555] mt-1 hidden sm:block">
                  {t('auth.signupDisclaimer')}
                </span>
              </div>
            )}
          </div>
        </div>
      </header>

      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
}

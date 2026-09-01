"use client";

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { useI18n } from '@/i18n/context';
import type { Locale } from '@/i18n/translations';

const LANGUAGES: { code: Locale; label: string; flag: string }[] = [
  { code: 'en', label: 'English (US)', flag: '🇺🇸' },
  { code: 'ko', label: '한국어', flag: '🇰🇷' },
  { code: 'ja', label: '日本語', flag: '🇯🇵' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
];

export function LanguageSwitcher() {
  const { locale, setLocale } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selected = LANGUAGES.find(l => l.code === locale) || LANGUAGES[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2 py-1.5 rounded bg-transparent hover:bg-[#1a1a1a] transition-colors border border-transparent hover:border-[#2a2a2a]"
      >
        <span className="text-sm" aria-hidden="true">{selected.flag}</span>
        <span className="text-xs font-semibold text-[#888]">{selected.code.toUpperCase()}</span>
        <ChevronDown size={12} className="text-[#555]" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1 w-40 bg-[#161616] border border-[#2a2a2a] rounded-lg shadow-xl overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-100">
          <div className="flex flex-col py-1">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => { setLocale(lang.code); setIsOpen(false); }}
                className={`flex items-center gap-2.5 px-3 py-2 text-xs font-medium transition-colors w-full text-left ${locale === lang.code ? 'bg-[#222] text-white' : 'text-[#888] hover:bg-[#1f1f1f] hover:text-white'}`}
              >
                <span className="text-sm leading-none">{lang.flag}</span>
                <span>{lang.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

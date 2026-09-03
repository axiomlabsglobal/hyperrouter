"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useRouter } from 'next/navigation';
import { type Locale, type TranslationDict, translations } from "./translations";

interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: keyof TranslationDict) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("hyperrouter_lang") as Locale | null;
    if (stored && translations[stored]) {
      setLocaleState(stored);
    }
  }, []);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    localStorage.setItem("hyperrouter_lang", l);
    router.refresh(); // Crucial: Re-render Server Components
  }, [router]);

  const t = useCallback(
    (key: keyof TranslationDict): string => {
      return translations[locale]?.[key] ?? translations.en[key] ?? key;
    },
    [locale]
  );

  return (
    <I18nContext value={{ locale, setLocale, t }}>
      {children}
    </I18nContext>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}

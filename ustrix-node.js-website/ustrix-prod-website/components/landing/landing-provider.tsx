'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { translations, type LanguageCode } from './i18n';
import type { CurrencyCode } from './pricing';

export type CountryCode = 'CA' | 'US' | 'GB' | 'AU';
export type CookiePreference = 'all' | 'managed' | 'rejected' | null;

type LandingContextValue = {
  country: CountryCode;
  setCountry: (c: CountryCode) => void;
  language: LanguageCode;
  setLanguage: (l: LanguageCode) => void;
  currency: CurrencyCode;
  setCurrency: (c: CurrencyCode) => void;
  t: (typeof translations)['EN'];
  cookiePreference: CookiePreference;
  setCookiePreference: (p: Exclude<CookiePreference, null>) => void;
  cookiePanelOpen: boolean;
  openCookiePanel: () => void;
  closeCookiePanel: () => void;
  mounted: boolean;
};

const STORAGE = {
  country: 'ustrix_landing_country',
  language: 'ustrix_landing_language',
  currency: 'ustrix_landing_currency',
  cookies: 'ustrix_landing_cookies',
} as const;

const LandingContext = createContext<LandingContextValue | null>(null);

export function useLanding() {
  const ctx = useContext(LandingContext);
  if (!ctx) {
    throw new Error('useLanding must be used within LandingProvider');
  }
  return ctx;
}

function readStorage<T extends string>(
  key: string,
  fallback: T,
  valid: readonly T[]
): T {
  if (typeof window === 'undefined') {
    return fallback;
  }
  try {
    const raw = localStorage.getItem(key);
    if (raw && (valid as readonly string[]).includes(raw)) {
      return raw as T;
    }
  } catch {
    /* ignore */
  }
  return fallback;
}

export function LandingProvider({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [country, setCountryState] = useState<CountryCode>('CA');
  const [language, setLanguageState] = useState<LanguageCode>('EN');
  const [currency, setCurrencyState] = useState<CurrencyCode>('CAD');
  const [cookiePreference, setCookiePreferenceState] =
    useState<CookiePreference>(null);
  const [cookiePanelOpen, setCookiePanelOpen] = useState(false);

  useEffect(() => {
    setCountryState(
      readStorage(STORAGE.country, 'CA', ['CA', 'US', 'GB', 'AU'] as const)
    );
    setLanguageState(readStorage(STORAGE.language, 'EN', ['EN', 'FR'] as const));
    setCurrencyState(
      readStorage(STORAGE.currency, 'CAD', ['CAD', 'USD', 'GBP', 'AUD'] as const)
    );
    const storedCookies = localStorage.getItem(STORAGE.cookies);
    if (
      storedCookies === 'all' ||
      storedCookies === 'managed' ||
      storedCookies === 'rejected'
    ) {
      setCookiePreferenceState(storedCookies);
    }
    setMounted(true);
  }, []);

  const setCountry = useCallback((c: CountryCode) => {
    setCountryState(c);
    try {
      localStorage.setItem(STORAGE.country, c);
    } catch {
      /* ignore */
    }
  }, []);

  const setLanguage = useCallback((l: LanguageCode) => {
    setLanguageState(l);
    try {
      localStorage.setItem(STORAGE.language, l);
    } catch {
      /* ignore */
    }
  }, []);

  const setCurrency = useCallback((c: CurrencyCode) => {
    setCurrencyState(c);
    try {
      localStorage.setItem(STORAGE.currency, c);
    } catch {
      /* ignore */
    }
  }, []);

  const setCookiePreference = useCallback(
    (p: Exclude<CookiePreference, null>) => {
      setCookiePreferenceState(p);
      setCookiePanelOpen(false);
      try {
        localStorage.setItem(STORAGE.cookies, p);
      } catch {
        /* ignore */
      }
    },
    []
  );

  const openCookiePanel = useCallback(() => setCookiePanelOpen(true), []);
  const closeCookiePanel = useCallback(() => setCookiePanelOpen(false), []);

  const t = useMemo(() => translations[language], [language]);

  const value = useMemo(
    () => ({
      country,
      setCountry,
      language,
      setLanguage,
      currency,
      setCurrency,
      t,
      cookiePreference,
      setCookiePreference,
      cookiePanelOpen,
      openCookiePanel,
      closeCookiePanel,
      mounted,
    }),
    [
      country,
      setCountry,
      language,
      setLanguage,
      currency,
      setCurrency,
      t,
      cookiePreference,
      setCookiePreference,
      cookiePanelOpen,
      openCookiePanel,
      closeCookiePanel,
      mounted,
    ]
  );

  return (
    <LandingContext.Provider value={value}>{children}</LandingContext.Provider>
  );
}

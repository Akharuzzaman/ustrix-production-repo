'use client';

import { useLanding } from './landing-provider';
import styles from './landing.module.css';

const COUNTRIES = [
  { code: 'CA' as const, label: '🇨🇦 Canada' },
  { code: 'US' as const, label: '🇺🇸 United States' },
  { code: 'GB' as const, label: '🇬🇧 United Kingdom' },
  { code: 'AU' as const, label: '🇦🇺 Australia' },
];

const COUNTRY_FLAGS: Record<string, string> = {
  CA: '🇨🇦',
  US: '🇺🇸',
  GB: '🇬🇧',
  AU: '🇦🇺',
};

export default function UtilityBar() {
  const {
    country,
    setCountry,
    language,
    setLanguage,
    currency,
    setCurrency,
    t,
    openCookiePanel,
    mounted,
  } = useLanding();

  if (!mounted) {
    return (
      <div className={styles.utilityBar} aria-hidden="true">
        <div className={styles.utilityInner} />
      </div>
    );
  }

  return (
    <div className={styles.utilityBar}>
      <div className={styles.utilityInner}>
        <div className={`${styles.utilityRight} ${styles.utilityDesktop}`}>
          <button
            type="button"
            className={styles.utilityBtn}
            onClick={openCookiePanel}
          >
            {t.cookies}
          </button>
          <span className={styles.utilityDivider}>|</span>
          <label>
            <span className="sr-only">{t.country}</span>
            <select
              className={styles.utilitySelect}
              value={country}
              onChange={(e) => setCountry(e.target.value as typeof country)}
              aria-label={t.country}
            >
              {COUNTRIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.label}
                </option>
              ))}
            </select>
          </label>
          <span className={styles.utilityDivider}>|</span>
          <label>
            <span className="sr-only">{t.language}</span>
            <select
              className={styles.utilitySelect}
              value={language}
              onChange={(e) => setLanguage(e.target.value as typeof language)}
              aria-label={t.language}
            >
              <option value="EN">EN — English</option>
              <option value="FR">FR — Français</option>
            </select>
          </label>
          <span className={styles.utilityDivider}>|</span>
          <label>
            <span className="sr-only">{t.currency}</span>
            <select
              className={styles.utilitySelect}
              value={currency}
              onChange={(e) => setCurrency(e.target.value as typeof currency)}
              aria-label={t.currency}
            >
              <option value="CAD">CAD</option>
              <option value="USD">USD</option>
              <option value="GBP">GBP</option>
              <option value="AUD">AUD</option>
            </select>
          </label>
        </div>

        <div className={styles.utilityCompact}>
          <button
            type="button"
            className={styles.utilityBtn}
            onClick={openCookiePanel}
          >
            {t.cookies}
          </button>
          <span className={styles.utilityDivider}>|</span>
          <span>
            {COUNTRY_FLAGS[country]} {country}
          </span>
          <span className={styles.utilityDivider}>|</span>
          <select
            className={styles.utilitySelect}
            value={language}
            onChange={(e) => setLanguage(e.target.value as typeof language)}
            aria-label={t.language}
          >
            <option value="EN">EN</option>
            <option value="FR">FR</option>
          </select>
          <span className={styles.utilityDivider}>|</span>
          <select
            className={styles.utilitySelect}
            value={currency}
            onChange={(e) => setCurrency(e.target.value as typeof currency)}
            aria-label={t.currency}
          >
            <option value="CAD">CAD</option>
            <option value="USD">USD</option>
            <option value="GBP">GBP</option>
            <option value="AUD">AUD</option>
          </select>
        </div>
      </div>
    </div>
  );
}

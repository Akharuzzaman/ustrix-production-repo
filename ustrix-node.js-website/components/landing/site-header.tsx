'use client';

import Link from 'next/link';
import { useState } from 'react';
import UstrixLogo from '@/components/brand/ustrix-logo';
import { useLanding } from './landing-provider';
import styles from './landing.module.css';

const NAV_ITEMS = [
  { href: '#platform-capabilities', key: 'navPlatform' as const },
  { href: '#ecosystem', key: 'navMarketplace' as const },
  { href: '#areas-of-service', key: 'navSolutions' as const },
  { href: '#how-it-works', key: 'navHowItWorks' as const },
  { href: '#subscription-plans', key: 'navPricePlan' as const },
  { href: '#live-job-board', key: 'navJobBoard' as const },
  { href: '#contact', key: 'navSupport' as const },
];

export default function SiteHeader() {
  const { t } = useLanding();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <Link href="/" className={styles.logoLink} aria-label="USTRIX home">
          <UstrixLogo width={140} priority />
        </Link>

        <nav className={styles.navDesktop} aria-label="Main navigation">
          {NAV_ITEMS.map((item) => (
            <a key={item.key} href={item.href} className={styles.navLink}>
              {t[item.key]}
            </a>
          ))}
        </nav>

        <div className={styles.headerActions}>
          <Link href="/tenant-status" className={styles.btnGhost}>
            {t.signIn}
          </Link>
          <Link href="/register" className={styles.btnPrimary}>
            {t.getStarted}
          </Link>
        </div>

        <button
          type="button"
          className={styles.menuBtn}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
            {menuOpen ? (
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M4 7h16M4 12h16M4 17h16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </div>

      <nav
        className={menuOpen ? styles.mobileNavOpen : styles.mobileNav}
        aria-label="Mobile navigation"
      >
        {NAV_ITEMS.map((item) => (
          <a
            key={item.key}
            href={item.href}
            className={styles.mobileNavLink}
            onClick={() => setMenuOpen(false)}
          >
            {t[item.key]}
          </a>
        ))}
        <div className={styles.mobileNavActions}>
          <Link
            href="/tenant-status"
            className={`${styles.btnSecondary} ${styles.btnFullMobile}`}
            onClick={() => setMenuOpen(false)}
          >
            {t.signIn}
          </Link>
          <Link
            href="/register"
            className={`${styles.btnPrimary} ${styles.btnFullMobile}`}
            onClick={() => setMenuOpen(false)}
          >
            {t.getStarted}
          </Link>
        </div>
      </nav>
    </header>
  );
}

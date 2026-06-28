'use client';

import { useLanding } from './landing-provider';
import styles from './landing.module.css';

export default function CookieBanner() {
  const {
    cookiePreference,
    setCookiePreference,
    cookiePanelOpen,
    closeCookiePanel,
    mounted,
    t,
  } = useLanding();

  if (!mounted) {
    return null;
  }

  const visible = cookiePanelOpen || cookiePreference === null;

  if (!visible) {
    return null;
  }

  return (
    <div
      className={styles.cookieBanner}
      role="dialog"
      aria-label="Cookie preferences"
    >
      <div className={styles.cookieInner}>
        <p className={styles.cookieText}>{t.cookieMessage}</p>
        <div className={styles.cookieActions}>
          <button
            type="button"
            className={styles.btnPrimary}
            onClick={() => setCookiePreference('all')}
          >
            {t.cookieAcceptAll}
          </button>
          <button
            type="button"
            className={styles.btnSecondary}
            onClick={() => setCookiePreference('managed')}
          >
            {t.cookieManage}
          </button>
          <button
            type="button"
            className={styles.btnSecondary}
            onClick={() => setCookiePreference('rejected')}
          >
            {t.cookieReject}
          </button>
          {cookiePanelOpen && cookiePreference !== null && (
            <button
              type="button"
              className={styles.btnGhost}
              onClick={closeCookiePanel}
            >
              Close
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

import styles from './landing.module.css';

export default function EnterpriseHeroVisual() {
  return (
    <div className={styles.heroVisual} aria-hidden="true">
      <div className={styles.heroVisualGrid}>
        <div className={styles.heroMonitor}>
          <div className={styles.heroMonitorBar}>
            <span />
            <span />
            <span />
          </div>
          <div className={styles.heroMonitorBody}>
            <svg viewBox="0 0 120 90" className={styles.heroPanelSvg} fill="none">
              <rect x="4" y="8" width="112" height="6" rx="2" fill="#d71920" opacity="0.9" />
              <rect x="8" y="58" width="14" height="24" rx="2" fill="#d71920" />
              <rect x="28" y="48" width="14" height="34" rx="2" fill="#ef4444" />
              <rect x="48" y="40" width="14" height="42" rx="2" fill="#d71920" />
              <rect x="68" y="52" width="14" height="30" rx="2" fill="#b5121b" />
              <rect x="88" y="44" width="14" height="38" rx="2" fill="#d71920" />
              <line x1="4" y1="82" x2="116" y2="82" stroke="#4b5563" strokeWidth="1" />
            </svg>
          </div>
        </div>
        <div className={styles.heroMonitor}>
          <div className={styles.heroMonitorBar}>
            <span />
            <span />
            <span />
          </div>
          <div className={styles.heroMonitorBody}>
            <svg viewBox="0 0 120 90" className={styles.heroPanelSvg} fill="none">
              <rect x="8" y="12" width="104" height="18" rx="4" fill="#1f2937" stroke="#374151" strokeWidth="1" />
              <circle cx="18" cy="21" r="4" fill="#d71920" />
              <rect x="28" y="18" width="50" height="6" rx="2" fill="#6b7280" />
              <rect x="8" y="38" width="104" height="18" rx="4" fill="#1f2937" stroke="#374151" strokeWidth="1" />
              <circle cx="18" cy="47" r="4" fill="#d71920" />
              <rect x="28" y="44" width="40" height="6" rx="2" fill="#6b7280" />
              <rect x="8" y="64" width="104" height="18" rx="4" fill="#1f2937" stroke="#374151" strokeWidth="1" />
              <circle cx="18" cy="73" r="4" fill="#22c55e" />
              <rect x="28" y="70" width="55" height="6" rx="2" fill="#9ca3af" />
            </svg>
          </div>
        </div>
        <div className={styles.heroMonitor}>
          <div className={styles.heroMonitorBar}>
            <span />
            <span />
            <span />
          </div>
          <div className={styles.heroMonitorBody}>
            <svg viewBox="0 0 120 90" className={styles.heroPanelSvg} fill="none">
              <circle cx="60" cy="45" r="10" fill="#d71920" stroke="#fca5a5" strokeWidth="1.5" />
              <circle cx="24" cy="22" r="6" fill="#374151" stroke="#6b7280" strokeWidth="1.5" />
              <circle cx="96" cy="22" r="6" fill="#374151" stroke="#6b7280" strokeWidth="1.5" />
              <circle cx="24" cy="68" r="6" fill="#374151" stroke="#6b7280" strokeWidth="1.5" />
              <circle cx="96" cy="68" r="6" fill="#374151" stroke="#6b7280" strokeWidth="1.5" />
              <line x1="60" y1="45" x2="24" y2="22" stroke="#d71920" strokeWidth="1.5" strokeDasharray="4 3" />
              <line x1="60" y1="45" x2="96" y2="22" stroke="#6b7280" strokeWidth="1.5" strokeDasharray="4 3" />
              <line x1="60" y1="45" x2="24" y2="68" stroke="#6b7280" strokeWidth="1.5" strokeDasharray="4 3" />
              <line x1="60" y1="45" x2="96" y2="68" stroke="#6b7280" strokeWidth="1.5" strokeDasharray="4 3" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

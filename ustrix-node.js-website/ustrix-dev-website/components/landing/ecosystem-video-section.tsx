'use client';

import { useLanding } from './landing-provider';
import UstrixEcosystemAnimation from './ustrix-ecosystem-animation';
import styles from './ecosystem-video-section.module.css';

export default function EcosystemVideoSection() {
  const { t } = useLanding();

  return (
    <section
      id="ecosystem-video"
      className={styles.section}
      aria-labelledby="ecosystem-video-title"
    >
      <div className={styles.inner}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>{t.ecosystemVideoEyebrow}</p>
          <h2 id="ecosystem-video-title" className={styles.title}>
            {t.ecosystemVideoTitle}
          </h2>
          <p className={styles.subtitle}>{t.ecosystemVideoSubtitle}</p>
        </header>

        <div className={styles.playerFrame}>
          <span className={styles.frameAccent} aria-hidden="true" />
          <span className={styles.frameShine} aria-hidden="true" />
          <UstrixEcosystemAnimation ariaLabel={t.ecosystemVideoAria} />
        </div>

        <p className={styles.captionNote}>{t.ecosystemVideoCaptionNote}</p>
      </div>
    </section>
  );
}

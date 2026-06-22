'use client';

import AudiencePanelArt from './audience-panel-art';
import { useLanding } from './landing-provider';
import styles from './landing.module.css';

const CARDS = [
  {
    titleKey: 'audienceContractor' as const,
    textKey: 'audienceContractorText' as const,
    art: 'contractor' as const,
  },
  {
    titleKey: 'audienceCustomer' as const,
    textKey: 'audienceCustomerText' as const,
    art: 'customer' as const,
  },
  {
    titleKey: 'audienceAgent' as const,
    textKey: 'audienceAgentText' as const,
    art: 'agent' as const,
  },
] as const;

export default function EnterpriseAudienceCards() {
  const { t } = useLanding();

  return (
    <section
      className={styles.resultsSection}
      aria-labelledby="results-title"
    >
      <div className={styles.container}>
        <h2 id="results-title" className={styles.resultsTitle}>
          {t.resultsTitle}
        </h2>
        <div className={styles.sectionAccentRule} aria-hidden="true" />
        <p className={styles.resultsLead}>{t.resultsLead}</p>
        <ul className={styles.audienceGrid}>
          {CARDS.map((card) => (
            <li key={card.titleKey} className={styles.audienceCard}>
              <div className={styles.audienceImage}>
                <AudiencePanelArt variant={card.art} />
              </div>
              <h3 className={styles.audienceCardTitle}>{t[card.titleKey]}</h3>
              <p className={styles.audienceCardText}>{t[card.textKey]}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

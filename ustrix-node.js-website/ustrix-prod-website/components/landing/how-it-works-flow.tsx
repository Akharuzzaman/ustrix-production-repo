'use client';

import Image from 'next/image';
import { HOW_IT_WORKS } from './data';
import { useLanding } from './landing-provider';
import styles from './landing.module.css';

function ArrowRight() {
  return (
    <div className={styles.flowArrowH} aria-hidden="true">
      <span className={styles.flowArrowLine} />
      <span className={styles.flowArrowHead} />
    </div>
  );
}

function ArrowDown() {
  return (
    <div className={styles.flowArrowV} aria-hidden="true">
      <span className={styles.flowArrowLineV} />
      <span className={styles.flowArrowHeadV} />
    </div>
  );
}

function StepCard({ step }: { step: (typeof HOW_IT_WORKS)[number] }) {
  return (
    <div className={styles.flowCrystalCard}>
      <div className={styles.flowStepIcon} aria-hidden="true">
        <Image
          src="/icon.svg"
          alt=""
          width={28}
          height={28}
          className={styles.flowStepIconImage}
        />
      </div>
      <span className={styles.flowNum}>{step.step}</span>
      <h3 className={styles.flowTitle}>{step.title}</h3>
      <p className={styles.flowText}>{step.text}</p>
    </div>
  );
}

export default function HowItWorksFlow() {
  const { t } = useLanding();

  return (
    <section
      id="how-it-works"
      className={styles.sectionAlt}
      aria-labelledby="how-title"
    >
      <div className={styles.container}>
        <h2 id="how-title" className={styles.sectionTitle}>
          {t.howItWorksTitle}
        </h2>
        <div className={styles.sectionAccentRule} aria-hidden="true" />
        <p className={styles.sectionLead}>{t.howItWorksLead}</p>

        <div className={styles.flowDesktop}>
          {HOW_IT_WORKS.map((step, i) => (
            <div key={step.step} className={styles.flowStepWrap}>
              <StepCard step={step} />
              {i < HOW_IT_WORKS.length - 1 && <ArrowRight />}
            </div>
          ))}
        </div>

        <ol className={styles.flowMobile}>
          {HOW_IT_WORKS.map((step, i) => (
            <li key={step.step}>
              <StepCard step={step} />
              {i < HOW_IT_WORKS.length - 1 && <ArrowDown />}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

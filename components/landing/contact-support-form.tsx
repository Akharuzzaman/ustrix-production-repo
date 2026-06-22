'use client';

import { useState, type FormEvent } from 'react';
import { CrystalFrame } from './crystal-frame';
import { useLanding } from './landing-provider';
import LandingIcon from './landing-icons';
import styles from './landing.module.css';

const TOPICS = [
  'General Inquiry',
  'Subscription Support',
  'Buyer Support',
  'Seller Support',
  'Agent / Partner Inquiry',
  'Technical Support',
] as const;

export default function ContactSupportForm() {
  const { t } = useLanding();
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section
      id="contact"
      className={styles.section}
      aria-labelledby="contact-title"
    >
      <div className={styles.container}>
        <div className={styles.contactHeader}>
          <div className={styles.contactTitleRow}>
            <LandingIcon name="contact" size={26} />
            <h2 id="contact-title" className={styles.sectionTitle}>
              {t.contactTitle}
            </h2>
          </div>
          <div className={styles.sectionAccentRule} aria-hidden="true" />
          <p className={styles.sectionLead}>{t.contactLead}</p>
        </div>

        <CrystalFrame as="div" className={styles.contactCrystal}>
          {submitted ? (
            <div className={styles.contactSuccess} role="status">
              {t.contactSuccess}
            </div>
          ) : (
            <form className={styles.contactForm} onSubmit={handleSubmit} noValidate>
              <div className={styles.contactRow}>
                <label className={styles.contactField}>
                  <span className={styles.contactLabel}>{t.contactFullName}</span>
                  <input
                    type="text"
                    name="fullName"
                    required
                    autoComplete="name"
                    className={styles.contactInput}
                  />
                </label>
                <label className={styles.contactField}>
                  <span className={styles.contactLabel}>{t.contactEmail}</span>
                  <input
                    type="email"
                    name="email"
                    required
                    autoComplete="email"
                    className={styles.contactInput}
                  />
                </label>
              </div>
              <label className={styles.contactField}>
                <span className={styles.contactLabel}>{t.contactOrganization}</span>
                <input
                  type="text"
                  name="organization"
                  autoComplete="organization"
                  className={styles.contactInput}
                />
              </label>
              <label className={styles.contactField}>
                <span className={styles.contactLabel}>{t.contactTopic}</span>
                <select name="topic" required className={styles.contactInput}>
                  {TOPICS.map((topic) => (
                    <option key={topic} value={topic}>
                      {topic}
                    </option>
                  ))}
                </select>
              </label>
              <label className={styles.contactField}>
                <span className={styles.contactLabel}>{t.contactMessage}</span>
                <textarea
                  name="message"
                  required
                  rows={5}
                  className={styles.contactTextarea}
                />
              </label>
              <button type="submit" className={styles.btnPrimary}>
                {t.contactSubmit}
              </button>
            </form>
          )}
        </CrystalFrame>
      </div>
    </section>
  );
}

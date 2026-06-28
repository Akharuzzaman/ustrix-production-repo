'use client';

import Link from 'next/link';
import UstrixLogo from '@/components/brand/ustrix-logo';
import { useLanding } from './landing-provider';
import styles from './ecosystem.module.css';

const WORKFLOW_PILLS = [
  { label: 'Orders', accent: false, className: styles.pillOrders },
  { label: 'Quotes', accent: false, className: styles.pillQuotes },
  { label: 'Payments', accent: true, className: styles.pillPayments },
  { label: 'Subscriptions', accent: true, className: styles.pillSubscriptions },
  { label: 'Settlement', accent: false, className: styles.pillSettlement },
  { label: 'Dashboard', accent: false, className: styles.pillDashboard },
] as const;

function EntityCard({
  title,
  description,
  className,
  href,
}: {
  title: string;
  description: string;
  className: string;
  href?: string;
}) {
  const inner = (
    <>
      <div className={styles.nodeDot} aria-hidden="true" />
      <h3 className={styles.nodeTitle}>{title}</h3>
      <p className={styles.nodeText}>{description}</p>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={`${styles.node} ${className} ${styles.nodeLink}`}>
        {inner}
      </Link>
    );
  }

  return (
    <article className={`${styles.node} ${className}`}>{inner}</article>
  );
}

function DesktopConnectors() {
  return (
    <svg
      className={styles.connectorSvg}
      viewBox="0 0 1000 520"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      <defs>
        <marker
          id="eco-arrow-gray"
          markerWidth="8"
          markerHeight="8"
          refX="6"
          refY="4"
          orient="auto"
        >
          <path d="M0,0 L8,4 L0,8 Z" fill="#d1d5db" />
        </marker>
        <marker
          id="eco-arrow-red"
          markerWidth="8"
          markerHeight="8"
          refX="6"
          refY="4"
          orient="auto"
        >
          <path d="M0,0 L8,4 L0,8 Z" fill="#d71920" />
        </marker>
      </defs>

      <path
        className={styles.lineBase}
        d="M 195 235 L 395 235"
        markerEnd="url(#eco-arrow-gray)"
      />
      <path
        className={`${styles.lineLaser} ${styles.lineLaserDelay1}`}
        d="M 195 235 L 395 235"
        markerEnd="url(#eco-arrow-red)"
      />

      <path
        className={styles.lineBase}
        d="M 805 235 L 605 235"
        markerEnd="url(#eco-arrow-gray)"
      />
      <path
        className={`${styles.lineLaser} ${styles.lineLaserDelay2}`}
        d="M 805 235 L 605 235"
        markerEnd="url(#eco-arrow-red)"
      />

      <path
        className={styles.lineBase}
        d="M 500 455 L 500 310"
        markerEnd="url(#eco-arrow-gray)"
      />
      <path
        className={styles.lineLaser}
        d="M 500 455 L 500 310"
        markerEnd="url(#eco-arrow-red)"
      />
    </svg>
  );
}

export default function UstrixEcosystem() {
  const { t } = useLanding();

  return (
    <section
      id="ecosystem"
      className={styles.section}
      aria-labelledby="ecosystem-title"
    >
      <div className={styles.inner}>
        <header className={styles.header}>
          <h2 id="ecosystem-title" className={styles.title}>
            {t.ecosystemTitle}
          </h2>
          <p className={styles.subtitle}>{t.ecosystemSubtitle}</p>
        </header>

        <div
          className={styles.diagram}
          role="img"
          aria-label="USTRIX ecosystem diagram showing Buyer, Seller, and Agents connected to USTRIX at the center"
        >
          <div className={styles.desktopDiagram}>
            <DesktopConnectors />

            <div className={styles.pills} aria-hidden="true">
              {WORKFLOW_PILLS.map((pill) => (
                <span
                  key={pill.label}
                  className={`${styles.pill} ${pill.className} ${
                    pill.accent ? styles.pillAccent : ''
                  }`}
                >
                  {pill.label}
                </span>
              ))}
            </div>

            <EntityCard
              title={t.ecosystemBuyer}
              description={t.ecosystemBuyerText}
              className={styles.nodeBuyer}
            />

            <div className={styles.crystal}>
              <div className={styles.crystalAccent} aria-hidden="true" />
              <div className={styles.crystalLogo}>
                <UstrixLogo width={150} />
              </div>
            </div>

            <EntityCard
              title={t.ecosystemSeller}
              description={t.ecosystemSellerText}
              className={styles.nodeSeller}
            />

            <EntityCard
              title={t.ecosystemAgents}
              description={t.ecosystemAgentsText}
              className={styles.nodeAgents}
              href="/register?role=agent"
            />
          </div>

          <div className={styles.mobileDiagram}>
            <article className={styles.mobileNode}>
              <div className={styles.nodeDot} aria-hidden="true" />
              <h3 className={styles.nodeTitle}>{t.ecosystemBuyer}</h3>
              <p className={styles.nodeText}>{t.ecosystemBuyerText}</p>
            </article>

            <div className={styles.mobileConnector} aria-hidden="true" />

            <div className={styles.mobileCrystal}>
              <div className={styles.mobileCrystalAccent} aria-hidden="true" />
              <UstrixLogo width={160} wrapperStyle={{ margin: '0 auto' }} />
            </div>

            <div className={styles.mobileConnector} aria-hidden="true" />

            <article className={styles.mobileNode}>
              <div className={styles.nodeDot} aria-hidden="true" />
              <h3 className={styles.nodeTitle}>{t.ecosystemSeller}</h3>
              <p className={styles.nodeText}>{t.ecosystemSellerText}</p>
            </article>

            <div className={styles.mobileConnector} aria-hidden="true" />

            <Link href="/register?role=agent" className={styles.mobileNode}>
              <div className={styles.nodeDot} aria-hidden="true" />
              <h3 className={styles.nodeTitle}>{t.ecosystemAgents}</h3>
              <p className={styles.nodeText}>{t.ecosystemAgentsText}</p>
            </Link>

            <div className={styles.mobilePills}>
              {WORKFLOW_PILLS.map((pill) => (
                <span
                  key={pill.label}
                  className={`${styles.mobilePill} ${
                    pill.accent ? styles.mobilePillAccent : ''
                  }`}
                >
                  {pill.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

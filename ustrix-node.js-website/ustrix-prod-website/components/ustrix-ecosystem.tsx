import UstrixLogo from '@/components/brand/ustrix-logo';
import styles from './ustrix-ecosystem.module.css';

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
}: {
  title: string;
  description: string;
  className: string;
}) {
  return (
    <article className={`${styles.node} ${className}`}>
      <div className={styles.nodeDot} aria-hidden="true" />
      <h3 className={styles.nodeTitle}>{title}</h3>
      <p className={styles.nodeText}>{description}</p>
    </article>
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
          id="arrow-gray"
          markerWidth="8"
          markerHeight="8"
          refX="6"
          refY="4"
          orient="auto"
        >
          <path d="M0,0 L8,4 L0,8 Z" fill="#d1d5db" />
        </marker>
        <marker
          id="arrow-red"
          markerWidth="8"
          markerHeight="8"
          refX="6"
          refY="4"
          orient="auto"
        >
          <path d="M0,0 L8,4 L0,8 Z" fill="#d71920" />
        </marker>
      </defs>

      {/* Buyer ↔ Center */}
      <path
        className={styles.lineBase}
        d="M 195 235 L 395 235"
        markerEnd="url(#arrow-gray)"
      />
      <path
        className={`${styles.lineLaser} ${styles.lineLaserDelay1}`}
        d="M 195 235 L 395 235"
        markerEnd="url(#arrow-red)"
      />
      <path
        className={styles.lineBase}
        d="M 395 235 L 195 235"
        markerEnd="url(#arrow-gray)"
        opacity="0.5"
      />

      {/* Seller ↔ Center */}
      <path
        className={styles.lineBase}
        d="M 805 235 L 605 235"
        markerEnd="url(#arrow-gray)"
      />
      <path
        className={`${styles.lineLaser} ${styles.lineLaserDelay2}`}
        d="M 805 235 L 605 235"
        markerEnd="url(#arrow-red)"
      />

      {/* Agents ↔ Center */}
      <path
        className={styles.lineBase}
        d="M 500 455 L 500 310"
        markerEnd="url(#arrow-gray)"
      />
      <path
        className={styles.lineLaser}
        d="M 500 455 L 500 310"
        markerEnd="url(#arrow-red)"
      />
      <path
        className={styles.lineBase}
        d="M 500 310 L 500 455"
        markerEnd="url(#arrow-gray)"
        opacity="0.5"
      />
    </svg>
  );
}

export default function UstrixEcosystem() {
  return (
    <section
      id="ecosystem"
      className={styles.section}
      aria-labelledby="ecosystem-title"
    >
      <div className={styles.inner}>
        <header className={styles.header}>
          <h2 id="ecosystem-title" className={styles.title}>
            The USTRIX Connected Ecosystem
          </h2>
          <p className={styles.subtitle}>
            A secure digital marketplace where buyers, sellers, and approved
            agents interact through structured workflows, payment settlement, and
            operational visibility.
          </p>
        </header>

        <div
          className={styles.diagram}
          role="img"
          aria-label="USTRIX ecosystem diagram showing Buyer, Seller, and Agents connected to USTRIX at the center"
        >
          {/* Desktop layout */}
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
              title="Buyer"
              description="Requests goods, services, quotations, and fulfillment tracking."
              className={styles.nodeBuyer}
            />

            <div className={styles.crystal}>
              <div className={styles.crystalAccent} aria-hidden="true" />
              <div className={styles.crystalLogo}>
                <UstrixLogo width={150} />
              </div>
            </div>

            <EntityCard
              title="Seller"
              description="Offers goods, services, contractor work, and order execution."
              className={styles.nodeSeller}
            />

            <EntityCard
              title="Agents"
              description="Confidential partner channel supporting qualified lead flow and ecosystem growth."
              className={styles.nodeAgents}
            />
          </div>

          {/* Mobile layout */}
          <div className={styles.mobileDiagram}>
            <article className={styles.mobileNode}>
              <div className={styles.nodeDot} aria-hidden="true" />
              <h3 className={styles.nodeTitle}>Buyer</h3>
              <p className={styles.nodeText}>
                Requests goods, services, quotations, and fulfillment tracking.
              </p>
            </article>

            <div className={styles.mobileConnector} aria-hidden="true" />

            <div className={styles.mobileCrystal}>
              <div className={styles.mobileCrystalAccent} aria-hidden="true" />
              <UstrixLogo width={160} wrapperStyle={{ margin: '0 auto' }} />
            </div>

            <div className={styles.mobileConnector} aria-hidden="true" />

            <article className={styles.mobileNode}>
              <div className={styles.nodeDot} aria-hidden="true" />
              <h3 className={styles.nodeTitle}>Seller</h3>
              <p className={styles.nodeText}>
                Offers goods, services, contractor work, and order execution.
              </p>
            </article>

            <div className={styles.mobileConnector} aria-hidden="true" />

            <article className={styles.mobileNode}>
              <div className={styles.nodeDot} aria-hidden="true" />
              <h3 className={styles.nodeTitle}>Agents</h3>
              <p className={styles.nodeText}>
                Confidential partner channel supporting qualified lead flow and
                ecosystem growth.
              </p>
            </article>

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

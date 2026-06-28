'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import EcosystemPresentation from './ecosystem-presentation';
import { useLanding } from './landing-provider';
import styles from './business-ecosystem-section.module.css';

const BUYER_ITEMS = [
  'Homeowner',
  'Individual',
  'Corporation',
  'NGO',
  'Government',
  'Any Buyer',
];

const SELLER_ITEMS = [
  'Contractor',
  'Professionals',
  'Corporation',
  'Supplier',
  'Individuals',
  'Others',
];

/** Alternating: Buyer→Platform→Seller→Platform→Buyer… */
const WORKFLOW_CYCLE = [
  { step: 1, label: 'RFP', side: 'buyer' as const, dir: 'toCore' as const },
  { step: 2, label: 'Goods & Services', side: 'seller' as const, dir: 'fromCore' as const },
  { step: 3, label: 'Quotation', side: 'seller' as const, dir: 'toCore' as const },
  { step: 4, label: 'Purchase Order', side: 'buyer' as const, dir: 'fromCore' as const },
  { step: 5, label: 'Invoice (Advance)', side: 'buyer' as const, dir: 'toCore' as const },
  { step: 6, label: 'Delivery', side: 'seller' as const, dir: 'fromCore' as const },
  { step: 7, label: 'Invoice', side: 'seller' as const, dir: 'toCore' as const },
  { step: 8, label: 'Payment', side: 'buyer' as const, dir: 'fromCore' as const },
  { step: 9, label: 'RFP Complete', side: 'buyer' as const, dir: 'toCore' as const },
];

const BUYER_WORKFLOW = WORKFLOW_CYCLE.filter((s) => s.side === 'buyer');
const SELLER_WORKFLOW = WORKFLOW_CYCLE.filter((s) => s.side === 'seller');

const AGENT_LABEL = 'Agent';
const TAX_AUTHORITY_LABEL = 'Tax Authority / CRA';

const MOBILE_FLOW = [
  {
    kind: 'network' as const,
    title: AGENT_LABEL,
    accent: 'agent' as const,
    items: [] as string[],
  },
  {
    kind: 'network' as const,
    title: 'Buyer Network',
    accent: 'buyer' as const,
    items: BUYER_ITEMS,
  },
  ...WORKFLOW_CYCLE.map((s) => ({
    kind: 'flow' as const,
    title: s.label,
    accent: s.side,
    step: s.step,
    items: [] as string[],
  })),
  {
    kind: 'core' as const,
    title: 'USTRIX Platform Core',
    accent: 'platform' as const,
    items: [] as string[],
  },
  {
    kind: 'network' as const,
    title: 'Seller Network',
    accent: 'seller' as const,
    items: SELLER_ITEMS,
  },
  {
    kind: 'network' as const,
    title: TAX_AUTHORITY_LABEL,
    accent: 'agent' as const,
    items: [] as string[],
  },
  {
    kind: 'flow' as const,
    title: 'Settlement Engine / Internal Controls',
    accent: 'platform' as const,
    items: [] as string[],
  },
];

const LEGEND = [
  { label: 'Buyer', color: '#2563EB' },
  { label: 'Seller', color: '#16A34A' },
  { label: 'Agent', color: '#F59E0B' },
  { label: 'Tax Authority / CRA', color: '#D97706' },
  { label: 'Platform', color: '#E11D2E' },
];

const LOOP_RADIUS = 460;
const LOOP_CENTER = 500;
const LOOP_CIRCUMFERENCE_PATH = `M ${LOOP_CENTER} ${LOOP_CENTER - LOOP_RADIUS} A ${LOOP_RADIUS} ${LOOP_RADIUS} 0 1 1 ${LOOP_CENTER} ${LOOP_CENTER + LOOP_RADIUS} A ${LOOP_RADIUS} ${LOOP_RADIUS} 0 1 1 ${LOOP_CENTER} ${LOOP_CENTER - LOOP_RADIUS}`;
const SUBSCRIPTION_ORBIT_COUNT = 4;
const SUBSCRIPTION_ORBIT_DURATION_S = 21;
const WORKFLOW_STEP_COUNT = 9;
const WORKFLOW_HIGHLIGHT_MS = 2200;

function useWorkflowSequence() {
  const [activeStep, setActiveStep] = useState(1);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setActiveStep((current) => (current >= WORKFLOW_STEP_COUNT ? 1 : current + 1));
    }, WORKFLOW_HIGHLIGHT_MS);

    return () => window.clearInterval(timer);
  }, [reducedMotion]);

  return activeStep;
}

function MixedBeamGradient({
  id,
  mode,
}: {
  id: string;
  mode: 'horizontal' | 'vertical' | 'loop';
}) {
  if (mode === 'horizontal') {
    return (
      <linearGradient id={id} gradientUnits="userSpaceOnUse" x1="0" y1="14" x2="120" y2="14">
        <stop offset="0%" stopColor="#2563EB" />
        <stop offset="42%" stopColor="#93C5FD" />
        <stop offset="50%" stopColor="#FFFFFF" />
        <stop offset="58%" stopColor="#86EFAC" />
        <stop offset="100%" stopColor="#16A34A" />
      </linearGradient>
    );
  }

  if (mode === 'vertical') {
    return (
      <linearGradient id={id} gradientUnits="userSpaceOnUse" x1="14" y1="0" x2="14" y2="100">
        <stop offset="0%" stopColor="#2563EB" />
        <stop offset="42%" stopColor="#E2E8F0" />
        <stop offset="50%" stopColor="#FFFFFF" />
        <stop offset="58%" stopColor="#BBF7D0" />
        <stop offset="100%" stopColor="#16A34A" />
      </linearGradient>
    );
  }

  return (
    <linearGradient id={id} gradientUnits="userSpaceOnUse" x1="80" y1="500" x2="920" y2="500">
      <stop offset="0%" stopColor="#2563EB" />
      <stop offset="25%" stopColor="#93C5FD" />
      <stop offset="50%" stopColor="#FFFFFF" />
      <stop offset="75%" stopColor="#86EFAC" />
      <stop offset="100%" stopColor="#16A34A" />
    </linearGradient>
  );
}

function BeamGlowFilter({ id }: { id: string }) {
  return (
    <filter id={id} x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  );
}

function LoopSvg() {
  const labelRefs = useRef<(SVGTextPathElement | null)[]>([]);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      return undefined;
    }

    const durationMs = SUBSCRIPTION_ORBIT_DURATION_S * 1000;
    const startedAt = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const shift = (((now - startedAt) % durationMs) / durationMs) * 100;

      labelRefs.current.forEach((label, index) => {
        if (!label) {
          return;
        }

        const baseOffset = index * (100 / SUBSCRIPTION_ORBIT_COUNT);
        const startOffset = (baseOffset + shift) % 100;
        label.setAttribute('startOffset', `${startOffset}%`);
      });

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reducedMotion]);

  return (
    <svg
      className={styles.loopSvg}
      viewBox="0 0 1000 1000"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      <defs>
        <MixedBeamGradient id="loop-beam-gradient" mode="loop" />
        <BeamGlowFilter id="loop-beam-glow" />
        <path id="eco-loop-circumference" d={LOOP_CIRCUMFERENCE_PATH} fill="none" />
      </defs>
      <circle
        className={styles.loopTrack}
        cx={LOOP_CENTER}
        cy={LOOP_CENTER}
        r={LOOP_RADIUS}
      />
      <circle
        className={`${styles.lineLaser} ${styles.lineLaserLoop}`}
        cx={LOOP_CENTER}
        cy={LOOP_CENTER}
        r={LOOP_RADIUS}
        stroke="url(#loop-beam-gradient)"
        filter="url(#loop-beam-glow)"
      />
      {Array.from({ length: SUBSCRIPTION_ORBIT_COUNT }, (_, index) => {
        const baseOffset = index * (100 / SUBSCRIPTION_ORBIT_COUNT);

        return (
          <text key={index} className={styles.loopOrbitText} aria-hidden="true">
            <textPath
              ref={(node) => {
                labelRefs.current[index] = node;
              }}
              href="#eco-loop-circumference"
              startOffset={`${baseOffset}%`}
              className={styles.loopOrbitLabel}
            >
              Subscription
            </textPath>
          </text>
        );
      })}
    </svg>
  );
}

function workflowPath(side: 'buyer' | 'seller', dir: 'toCore' | 'fromCore') {
  if (side === 'buyer') {
    return dir === 'toCore' ? 'M 6 14 L 114 14' : 'M 114 14 L 6 14';
  }
  return dir === 'fromCore' ? 'M 6 14 L 114 14' : 'M 114 14 L 6 14';
}

function LaserBeam({
  path,
  gradientId,
  gradientMode,
  animationDelay,
  size,
  className,
  isActive = false,
}: {
  path: string;
  gradientId: string;
  gradientMode: 'horizontal' | 'vertical';
  animationDelay?: number;
  size: 'short' | 'long';
  className?: string;
  isActive?: boolean;
}) {
  const glowId = `${gradientId}-glow`;
  const laserSizeClass = size === 'short' ? styles.lineLaserShort : styles.lineLaserLong;

  return (
    <svg
      className={className}
      viewBox={gradientMode === 'horizontal' ? '0 0 120 28' : '0 0 28 100'}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <MixedBeamGradient id={gradientId} mode={gradientMode} />
        <BeamGlowFilter id={glowId} />
      </defs>
      <path className={`${styles.lineTrack} ${isActive ? styles.lineTrackActive : ''}`} d={path} />
      <path
        className={`${styles.lineLaser} ${laserSizeClass} ${isActive ? styles.lineLaserActive : styles.lineLaserIdle}`}
        d={path}
        stroke={`url(#${gradientId})`}
        filter={`url(#${glowId})`}
        style={animationDelay !== undefined ? { animationDelay: `${animationDelay}s` } : undefined}
      />
    </svg>
  );
}

function FlowLane({
  step,
  label,
  side,
  dir,
  isActive,
}: {
  step: number;
  label: string;
  side: 'buyer' | 'seller';
  dir: 'toCore' | 'fromCore';
  isActive: boolean;
}) {
  const accentClass = side === 'buyer' ? styles.laneBuyer : styles.laneSeller;
  const path = workflowPath(side, dir);
  const animationDelay = (step - 1) * 0.55;

  return (
    <div
      className={`${styles.flowLane} ${accentClass} ${isActive ? styles.flowLaneActive : styles.flowLaneIdle}`}
    >
      <span className={`${styles.flowBadge} ${isActive ? styles.flowBadgeActive : ''}`}>
        <span className={styles.stepIndex}>{step}</span>
        {label}
      </span>
      <LaserBeam
        className={styles.laneSvg}
        path={path}
        gradientId={`beam-step-${step}`}
        gradientMode="horizontal"
        animationDelay={animationDelay}
        size="short"
        isActive={isActive}
      />
    </div>
  );
}

function AgentFlow({
  label,
  direction,
}: {
  label: string;
  direction: 'down' | 'up';
}) {
  const path = direction === 'down' ? 'M 14 6 L 14 94' : 'M 14 94 L 14 6';
  const gradientId = direction === 'down' ? 'beam-agent-down' : 'beam-agent-up';

  return (
    <div className={`${styles.agentFlow} ${styles.agentFlowStretch}`}>
      {direction === 'up' && (
        <span className={`${styles.flowBadge} ${styles.flowBadgeAgent}`}>{label}</span>
      )}
      <LaserBeam
        className={styles.agentLaneSvg}
        path={path}
        gradientId={gradientId}
        gradientMode="vertical"
        animationDelay={direction === 'down' ? 0.3 : 4.2}
        size="long"
      />
      {direction === 'down' && (
        <span className={`${styles.flowBadge} ${styles.flowBadgeAgent}`}>{label}</span>
      )}
    </div>
  );
}

function PlatformCore() {
  return (
    <div className={styles.coreWrap}>
      <span className={styles.coreSocketTop} aria-hidden="true" />
      <div className={styles.core}>
        <div className={styles.coreAccent} aria-hidden="true" />
        <div className={styles.coreShine} aria-hidden="true" />
        <div className={styles.coreInner}>
          <Image
            src="/icon.png"
            alt=""
            width={56}
            height={56}
            className={styles.coreIcon}
          />
          <p className={styles.coreLabel}>USTRIX Platform Core</p>
        </div>
      </div>
      <span className={styles.coreSocketBottom} aria-hidden="true" />
    </div>
  );
}

function NetworkPanel({
  title,
  items,
  accent,
  href,
}: {
  title: string;
  items: string[];
  accent: 'buyer' | 'seller' | 'agent';
  href?: string;
}) {
  const accentClass =
    accent === 'buyer'
      ? styles.panelBuyer
      : accent === 'seller'
        ? styles.panelSeller
        : styles.panelAgent;

  const inner = (
    <>
      <h3 className={styles.panelTitle}>{title}</h3>
      {items.length > 0 && (
        <ul className={styles.panelList}>
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={`${styles.panel} ${accentClass}`}>
        {inner}
      </Link>
    );
  }

  return <article className={`${styles.panel} ${accentClass}`}>{inner}</article>;
}

export default function BusinessEcosystemSection() {
  const { t } = useLanding();
  const activeWorkflowStep = useWorkflowSequence();
  const [presentationOpen, setPresentationOpen] = useState(false);

  return (
    <section
      id="ecosystem"
      className={styles.section}
      aria-labelledby="business-ecosystem-title"
    >
      <div className={styles.inner}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>USTRIX Business Ecosystem</p>
          <h2 id="business-ecosystem-title" className={styles.title}>
            {t.ecosystemTitle}
          </h2>
          <p className={styles.subtitle}>{t.ecosystemSubtitle}</p>
        </header>

        <div className={styles.ctaRow}>
          <button
            type="button"
            className={styles.btnPresentation}
            onClick={() => setPresentationOpen(true)}
          >
            {t.ecosystemPresentationLaunch}
          </button>
          <Link href="/register" className={styles.btnPrimary}>
            Start Registration
          </Link>
          <Link href="/register?role=agent" className={styles.btnGhost}>
            Agent Enrollment
          </Link>
        </div>

        <div className={styles.diagramFrame}>
          <span className={styles.diagramFrameAccent} aria-hidden="true" />
          <span className={styles.diagramFrameShine} aria-hidden="true" />
          <div
            className={styles.desktopMap}
            role="img"
            aria-label="USTRIX business ecosystem diagram with buyer network, seller network, agent channel, tax authority compliance, and platform core"
          >
            <LoopSvg />

            <div className={styles.gridAgentTop}>
              <NetworkPanel
                title={AGENT_LABEL}
                items={[]}
                accent="agent"
                href="/register?role=agent"
              />
              <AgentFlow label="Compliance Review" direction="down" />
            </div>

            <div className={styles.gridBuyer}>
              <NetworkPanel title="Buyer Network" items={BUYER_ITEMS} accent="buyer" />
            </div>

            <div className={styles.gridBuyerFlow}>
              {BUYER_WORKFLOW.map((item) => (
                <FlowLane
                  key={item.step}
                  step={item.step}
                  label={item.label}
                  side="buyer"
                  dir={item.dir}
                  isActive={activeWorkflowStep === item.step}
                />
              ))}
            </div>

            <div className={styles.gridCore}>
              <PlatformCore />
            </div>

            <div className={styles.gridSellerFlow}>
              {SELLER_WORKFLOW.map((item) => (
                <FlowLane
                  key={item.step}
                  step={item.step}
                  label={item.label}
                  side="seller"
                  dir={item.dir}
                  isActive={activeWorkflowStep === item.step}
                />
              ))}
            </div>

            <div className={styles.gridSeller}>
              <NetworkPanel title="Seller Network" items={SELLER_ITEMS} accent="seller" />
            </div>

            <div className={styles.gridAgentBottom}>
              <AgentFlow label="Verified Records" direction="up" />
              <NetworkPanel
                title={TAX_AUTHORITY_LABEL}
                items={[]}
                accent="agent"
              />
            </div>
          </div>
          <div className={styles.mobileFlow}>
            {MOBILE_FLOW.map((item, index) => (
              <div key={`${item.title}-${index}`}>
                {index > 0 && <div className={styles.mobileConnector} aria-hidden="true" />}
                {item.kind === 'core' ? (
                  <div className={styles.mobileCore}>
                    <div className={styles.coreAccent} aria-hidden="true" />
                    <div className={styles.coreShine} aria-hidden="true" />
                    <div className={styles.coreInner}>
                      <Image
                        src="/icon.png"
                        alt=""
                        width={56}
                        height={56}
                        className={styles.coreIcon}
                      />
                      <p className={styles.mobileCoreLabel}>{item.title}</p>
                    </div>
                  </div>
                ) : (
                  <div
                    className={`${styles.mobileCard} ${
                      item.accent === 'buyer'
                        ? styles.mobileBuyer
                        : item.accent === 'seller'
                          ? styles.mobileSeller
                          : item.accent === 'agent'
                            ? styles.mobileAgent
                            : styles.mobilePlatform
                    } ${item.kind === 'flow' ? styles.mobileFlowStep : ''} ${
                      'step' in item && item.step === activeWorkflowStep
                        ? styles.mobileWorkflowActive
                        : ''
                    }`}
                  >
                    {'step' in item && item.step !== undefined && (
                      <span className={styles.mobileStep}>{item.step}</span>
                    )}
                    <p className={styles.mobileCardTitle}>{item.title}</p>
                    {item.items.length > 0 && (
                      <ul className={styles.mobileList}>
                        {item.items.map((entry) => (
                          <li key={entry}>{entry}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
          <p className={styles.workflowCaption}>
            Numbered laser flow: Buyer → Platform → Seller → Platform, completing the RFP cycle
            through USTRIX Platform Core.
          </p>
        </div>

        <div className={styles.legend} aria-hidden="true">
          {LEGEND.map((item) => (
            <span key={item.label} className={styles.legendItem}>
              <span className={styles.legendDot} style={{ background: item.color }} />
              {item.label}
            </span>
          ))}
        </div>
      </div>

      <EcosystemPresentation
        open={presentationOpen}
        onClose={() => setPresentationOpen(false)}
      />
    </section>
  );
}

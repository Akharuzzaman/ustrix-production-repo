'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import styles from './ecosystem-video-section.module.css';

const WORKFLOW_STEPS = [
  'RFP',
  'Goods & Services',
  'Quotation',
  'Purchase Order',
  'Invoice (Advance)',
  'Delivery',
  'Invoice',
  'Payment',
  'RFP Complete',
];

const SCENES = [
  {
    id: 'intro',
    durationMs: 5000,
    focus: 'all',
    caption:
      'Welcome to the USTRIX Business Ecosystem — a connected marketplace where buyers, sellers, agents, and compliance pathways operate through one secure platform core.',
  },
  {
    id: 'buyer',
    durationMs: 4500,
    focus: 'buyer',
    caption:
      'The Buyer Network brings homeowners, individuals, corporations, NGOs, and government organizations into structured digital procurement.',
  },
  {
    id: 'seller',
    durationMs: 4500,
    focus: 'seller',
    caption:
      'The Seller Network empowers contractors, professionals, suppliers, and service providers to deliver goods, services, and order execution.',
  },
  {
    id: 'agent',
    durationMs: 4500,
    focus: 'agent',
    caption:
      'The Agent channel provides guided onboarding and confidential partner pathways across the marketplace.',
  },
  {
    id: 'tax',
    durationMs: 4500,
    focus: 'tax',
    caption:
      'Tax Authority / CRA compliance review and verified records support trusted settlement and internal controls.',
  },
  {
    id: 'core',
    durationMs: 5000,
    focus: 'core',
    caption:
      'At the center, the USTRIX Platform Core orchestrates quotes, orders, subscriptions, settlement, and operational controls.',
  },
  {
    id: 'workflow',
    durationMs: 12000,
    focus: 'workflow',
    caption:
      'A nine-step procurement loop connects buyer, platform, and seller from RFP through payment and cycle completion.',
  },
  {
    id: 'subscription',
    durationMs: 5000,
    focus: 'subscription',
    caption:
      'Subscription plans orbit the ecosystem continuously, keeping buyers, sellers, and partners connected to platform services.',
  },
  {
    id: 'outro',
    durationMs: 5000,
    focus: 'outro',
    caption:
      'Connect. Transact. Grow. Register on USTRIX, choose your subscription, and manage procurement from one secure dashboard.',
  },
] as const;

const TOTAL_DURATION_MS = SCENES.reduce((sum, scene) => sum + scene.durationMs, 0);
const LOOP_PATH =
  'M 400 88 A 292 292 0 1 1 400 672 A 292 292 0 1 1 400 88';

type SceneFocus = (typeof SCENES)[number]['focus'];

function isActive(focus: SceneFocus, role: SceneFocus | 'workflow') {
  if (focus === 'all' || focus === 'outro') {
    return true;
  }
  if (focus === 'workflow') {
    return role === 'workflow' || role === 'buyer' || role === 'seller' || role === 'core';
  }
  return focus === role;
}

function AnimationStage({
  focus,
  workflowStep,
  orbitShift,
}: {
  focus: SceneFocus;
  workflowStep: number;
  orbitShift: number;
}) {
  const labelRefs = useRef<(SVGTextPathElement | null)[]>([]);

  useEffect(() => {
    labelRefs.current.forEach((label, index) => {
      if (!label) {
        return;
      }
      const baseOffset = index * 25;
      label.setAttribute('startOffset', `${(baseOffset + orbitShift) % 100}%`);
    });
  }, [orbitShift]);

  const nodeClass = (role: SceneFocus | 'buyer' | 'seller' | 'core' | 'workflow') =>
    isActive(focus, role) ? styles.nodeActive : styles.nodeDim;

  return (
    <svg
      className={styles.animationSvg}
      viewBox="0 0 800 760"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="eco-anim-beam" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#2563EB" />
          <stop offset="50%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#16A34A" />
        </linearGradient>
        <radialGradient id="eco-anim-core-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#E11D2E" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#E11D2E" stopOpacity="0" />
        </radialGradient>
        <path id="eco-anim-orbit" d={LOOP_PATH} fill="none" />
      </defs>

      <rect width="800" height="760" fill="#030712" />
      <rect width="800" height="760" fill="url(#eco-anim-core-glow)" opacity="0.35" />

      <circle
        className={`${styles.orbitRing} ${focus === 'subscription' ? styles.orbitRingActive : ''}`}
        cx="400"
        cy="380"
        r="292"
      />
      <circle
        className={`${styles.orbitLaser} ${focus === 'subscription' ? styles.orbitLaserActive : ''}`}
        cx="400"
        cy="380"
        r="292"
        stroke="url(#eco-anim-beam)"
      />
      {Array.from({ length: 4 }, (_, index) => (
        <text key={index} className={styles.orbitLabel}>
          <textPath
            ref={(node) => {
              labelRefs.current[index] = node;
            }}
            href="#eco-anim-orbit"
            startOffset={`${index * 25}%`}
          >
            SUBSCRIPTION
          </textPath>
        </text>
      ))}

      <line
        className={`${styles.beam} ${isActive(focus, 'buyer') ? styles.beamActive : ''}`}
        x1="220"
        y1="380"
        x2="330"
        y2="380"
        stroke="#2563EB"
      />
      <line
        className={`${styles.beam} ${isActive(focus, 'seller') ? styles.beamActive : ''}`}
        x1="580"
        y1="380"
        x2="470"
        y2="380"
        stroke="#16A34A"
      />
      <line
        className={`${styles.beam} ${isActive(focus, 'agent') ? styles.beamActive : ''}`}
        x1="400"
        y1="150"
        x2="400"
        y2="270"
        stroke="#F59E0B"
      />
      <line
        className={`${styles.beam} ${isActive(focus, 'tax') ? styles.beamActive : ''}`}
        x1="400"
        y1="610"
        x2="400"
        y2="490"
        stroke="#D97706"
      />

      <g className={nodeClass('buyer')}>
        <rect className={styles.nodeBuyer} x="88" y="340" width="132" height="88" rx="14" />
        <text x="154" y="378" textAnchor="middle" className={styles.nodeTitleBuyer}>
          Buyer
        </text>
        <text x="154" y="400" textAnchor="middle" className={styles.nodeSub}>
          Network
        </text>
      </g>

      <g className={nodeClass('seller')}>
        <rect className={styles.nodeSeller} x="580" y="340" width="132" height="88" rx="14" />
        <text x="646" y="378" textAnchor="middle" className={styles.nodeTitleSeller}>
          Seller
        </text>
        <text x="646" y="400" textAnchor="middle" className={styles.nodeSub}>
          Network
        </text>
      </g>

      <g className={nodeClass('agent')}>
        <rect className={styles.nodeAgent} x="334" y="72" width="132" height="72" rx="14" />
        <text x="400" y="116" textAnchor="middle" className={styles.nodeTitleAgent}>
          Agent
        </text>
      </g>

      <g className={nodeClass('tax')}>
        <rect className={styles.nodeTax} x="296" y="624" width="208" height="72" rx="14" />
        <text x="400" y="668" textAnchor="middle" className={styles.nodeTitleTax}>
          Tax Authority / CRA
        </text>
      </g>

      <g className={nodeClass('core')}>
        <circle cx="400" cy="380" r="104" fill="#E11D2E" opacity="0.14" className={styles.corePulse} />
        <rect className={styles.nodeCore} x="318" y="298" width="164" height="164" rx="22" />
        <foreignObject x="362" y="318" width="76" height="76">
          <div className={styles.coreLogoWrap}>
            <Image src="/icon.svg" alt="" width={52} height={52} className={styles.coreLogo} />
          </div>
        </foreignObject>
        <text x="400" y="408" textAnchor="middle" className={styles.coreBrand}>
          USTRIX
        </text>
        <text x="400" y="430" textAnchor="middle" className={styles.nodeSub}>
          Platform Core
        </text>
      </g>

      {focus === 'workflow' && (
        <g className={styles.workflowBadge}>
          <rect x="285" y="248" width="230" height="72" rx="16" />
          <text x="318" y="292" className={styles.workflowStepNum}>
            {workflowStep}
          </text>
          <text x="400" y="292" textAnchor="middle" className={styles.workflowStepLabel}>
            {WORKFLOW_STEPS[workflowStep - 1]}
          </text>
        </g>
      )}

      {focus === 'outro' && (
        <text x="400" y="300" textAnchor="middle" className={styles.outroTitle}>
          Connect. Transact. Grow.
        </text>
      )}
    </svg>
  );
}

export default function UstrixEcosystemAnimation({ ariaLabel }: { ariaLabel: string }) {
  const [sceneIndex, setSceneIndex] = useState(0);
  const [elapsedInScene, setElapsedInScene] = useState(0);
  const [orbitShift, setOrbitShift] = useState(0);
  const [workflowStep, setWorkflowStep] = useState(1);
  const [reducedMotion, setReducedMotion] = useState(false);

  const scene = SCENES[sceneIndex] ?? SCENES[0];

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (!reducedMotion) {
      return undefined;
    }

    const interval = window.setInterval(() => {
      setElapsedInScene((current) => current + 250);
    }, 250);

    return () => window.clearInterval(interval);
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion) {
      return undefined;
    }

    let frame = 0;
    let lastTick = performance.now();

    const tick = (now: number) => {
      const delta = now - lastTick;
      lastTick = now;
      setElapsedInScene((current) => current + delta);
      setOrbitShift((current) => (current + delta / 210) % 100);
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reducedMotion]);

  useEffect(() => {
    if (elapsedInScene < scene.durationMs) {
      return undefined;
    }

    setSceneIndex((current) => (current + 1) % SCENES.length);
    setElapsedInScene(0);
    return undefined;
  }, [elapsedInScene, scene.durationMs]);

  useEffect(() => {
    if (scene.id !== 'workflow') {
      setWorkflowStep(1);
      return undefined;
    }

    const stepIndex = Math.min(
      WORKFLOW_STEPS.length - 1,
      Math.floor((elapsedInScene / scene.durationMs) * WORKFLOW_STEPS.length),
    );
    setWorkflowStep(stepIndex + 1);
    return undefined;
  }, [elapsedInScene, scene.durationMs, scene.id]);

  const elapsedBefore = SCENES.slice(0, sceneIndex).reduce((sum, s) => sum + s.durationMs, 0);
  const globalProgress = (elapsedBefore + elapsedInScene) / TOTAL_DURATION_MS;

  return (
    <div
      className={styles.animationStage}
      role="img"
      aria-label={ariaLabel}
      aria-live="polite"
    >
      <div className={styles.animationParticles} aria-hidden="true" />
      <AnimationStage
        focus={scene.focus}
        workflowStep={workflowStep}
        orbitShift={orbitShift}
      />
      <div className={styles.animationCaption} key={scene.id}>
        <p className={styles.animationCaptionText}>{scene.caption}</p>
      </div>
      <div className={styles.animationProgress} aria-hidden="true">
        <div className={styles.animationProgressFill} style={{ width: `${globalProgress * 100}%` }} />
      </div>
    </div>
  );
}

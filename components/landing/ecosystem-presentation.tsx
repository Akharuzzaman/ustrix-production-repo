'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { createPresentationAudio } from './ecosystem-presentation-audio';
import { useLanding } from './landing-provider';
import styles from './ecosystem-presentation.module.css';

const WORKFLOW_STEPS = [
  { step: 1, label: 'RFP', side: 'buyer' as const },
  { step: 2, label: 'Goods & Services', side: 'seller' as const },
  { step: 3, label: 'Quotation', side: 'seller' as const },
  { step: 4, label: 'Purchase Order', side: 'buyer' as const },
  { step: 5, label: 'Invoice (Advance)', side: 'buyer' as const },
  { step: 6, label: 'Delivery', side: 'seller' as const },
  { step: 7, label: 'Invoice', side: 'seller' as const },
  { step: 8, label: 'Payment', side: 'buyer' as const },
  { step: 9, label: 'RFP Complete', side: 'buyer' as const },
];

const LOOP_PATH =
  'M 400 80 A 320 320 0 1 1 400 720 A 320 320 0 1 1 400 80';
const WORKFLOW_STEP_MS = 2200;

type SceneKind =
  | 'intro'
  | 'buyer'
  | 'seller'
  | 'agents'
  | 'core'
  | 'workflow'
  | 'subscription'
  | 'outro';

type Scene = {
  kind: SceneKind;
  durationMs: number;
  eyebrow: string;
  title: string;
  body: string;
};

type EcosystemPresentationProps = {
  open: boolean;
  onClose: () => void;
};

function useReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  return reducedMotion;
}

function ParticleCanvas({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!active) {
      return undefined;
    }

    const canvas = canvasRef.current;
    if (!canvas) {
      return undefined;
    }

    const context = canvas.getContext('2d');
    if (!context) {
      return undefined;
    }

    let frame = 0;
    const particles = Array.from({ length: 72 }, () => ({
      x: Math.random(),
      y: Math.random(),
      size: Math.random() * 1.8 + 0.4,
      speed: Math.random() * 0.00035 + 0.00012,
      hue: Math.random() > 0.5 ? 0 : Math.random() > 0.5 ? 210 : 145,
    }));

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      context.clearRect(0, 0, width, height);

      particles.forEach((particle) => {
        particle.y -= particle.speed;
        if (particle.y < -0.05) {
          particle.y = 1.05;
          particle.x = Math.random();
        }

        const x = particle.x * width;
        const y = particle.y * height;
        context.beginPath();
        context.fillStyle = `hsla(${particle.hue}, 85%, 68%, 0.55)`;
        context.arc(x, y, particle.size, 0, Math.PI * 2);
        context.fill();
      });

      frame = requestAnimationFrame(draw);
    };

    frame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
    };
  }, [active]);

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />;
}

function PresentationHub({
  activeKind,
  workflowStep,
  orbitShift,
}: {
  activeKind: SceneKind;
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
      const startOffset = (baseOffset + orbitShift) % 100;
      label.setAttribute('startOffset', `${startOffset}%`);
    });
  }, [orbitShift]);

  const focusBuyer =
    activeKind === 'buyer' ||
    (activeKind === 'workflow' &&
      WORKFLOW_STEPS[workflowStep - 1]?.side === 'buyer');
  const focusSeller =
    activeKind === 'seller' ||
    (activeKind === 'workflow' &&
      WORKFLOW_STEPS[workflowStep - 1]?.side === 'seller');
  const focusAgents = activeKind === 'agents';
  const focusCore =
    activeKind === 'core' || activeKind === 'intro' || activeKind === 'outro';
  const focusLoop = activeKind === 'subscription';

  const nodeClass = (focused: boolean) =>
    `${styles.nodeGroup} ${focused ? styles.nodeActive : styles.nodeDim}`;

  return (
    <svg
      className={styles.hubSvg}
      viewBox="0 0 800 800"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="presentation-loop-beam" x1="80" y1="400" x2="720" y2="400">
          <stop offset="0%" stopColor="#2563EB" />
          <stop offset="25%" stopColor="#93C5FD" />
          <stop offset="50%" stopColor="#FFFFFF" />
          <stop offset="75%" stopColor="#86EFAC" />
          <stop offset="100%" stopColor="#16A34A" />
        </linearGradient>
        <radialGradient id="presentation-core-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#e11d2e" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#e11d2e" stopOpacity="0" />
        </radialGradient>
        <path id="presentation-loop-path" d={LOOP_PATH} fill="none" />
      </defs>

      <circle
        className={`${styles.loopTrack} ${focusLoop ? styles.nodeActive : styles.nodeDim}`}
        cx="400"
        cy="400"
        r="320"
      />
      <circle
        className={`${styles.loopLaser} ${focusLoop ? '' : styles.nodeDim}`}
        cx="400"
        cy="400"
        r="320"
        stroke="url(#presentation-loop-beam)"
      />
      {Array.from({ length: 4 }, (_, index) => (
        <text key={index} className={styles.orbitText} opacity={focusLoop ? 1 : 0.25}>
          <textPath
            ref={(node) => {
              labelRefs.current[index] = node;
            }}
            href="#presentation-loop-path"
            startOffset={`${index * 25}%`}
          >
            Subscription
          </textPath>
        </text>
      ))}

      <line
        className={`${styles.beam} ${focusBuyer ? styles.beamActive : ''}`}
        x1="170"
        y1="400"
        x2="310"
        y2="400"
        stroke="#2563EB"
      />
      <line
        className={`${styles.beam} ${focusSeller ? styles.beamActive : ''}`}
        x1="630"
        y1="400"
        x2="490"
        y2="400"
        stroke="#16A34A"
      />
      <line
        className={`${styles.beam} ${focusAgents ? styles.beamActive : ''}`}
        x1="400"
        y1="170"
        x2="400"
        y2="310"
        stroke="#F59E0B"
      />
      <line
        className={`${styles.beam} ${focusAgents ? styles.beamActive : ''}`}
        x1="400"
        y1="630"
        x2="400"
        y2="490"
        stroke="#F59E0B"
      />

      <g className={nodeClass(focusBuyer)}>
        <rect className={`${styles.nodeCard} ${styles.nodeBuyer}`} x="44" y="352" width="126" height="96" rx="14" />
        <text x="107" y="392" textAnchor="middle" fill="#93C5FD" fontSize="13" fontWeight="700">
          Buyer
        </text>
        <text x="107" y="414" textAnchor="middle" fill="#CBD5E1" fontSize="10">
          Network
        </text>
      </g>

      <g className={nodeClass(focusSeller)}>
        <rect className={`${styles.nodeCard} ${styles.nodeSeller}`} x="630" y="352" width="126" height="96" rx="14" />
        <text x="693" y="392" textAnchor="middle" fill="#86EFAC" fontSize="13" fontWeight="700">
          Seller
        </text>
        <text x="693" y="414" textAnchor="middle" fill="#CBD5E1" fontSize="10">
          Network
        </text>
      </g>

      <g className={nodeClass(focusAgents)}>
        <rect className={`${styles.nodeCard} ${styles.nodeAgent}`} x="337" y="44" width="126" height="84" rx="14" />
        <text x="400" y="82" textAnchor="middle" fill="#FCD34D" fontSize="12" fontWeight="700">
          Agent Channel
        </text>
        <rect className={`${styles.nodeCard} ${styles.nodeAgent}`} x="337" y="672" width="126" height="84" rx="14" />
        <text x="400" y="710" textAnchor="middle" fill="#FCD34D" fontSize="12" fontWeight="700">
          Agent Channel
        </text>
      </g>

      <circle
        className={`${styles.nodeGlow} ${focusCore ? styles.nodeGlowActive : ''}`}
        cx="400"
        cy="400"
        r="118"
        fill="url(#presentation-core-glow)"
      />
      <g className={nodeClass(focusCore)}>
        <rect className={`${styles.nodeCard} ${styles.nodeCore}`} x="312" y="312" width="176" height="176" rx="22" />
        <text x="400" y="392" textAnchor="middle" fill="#FECACA" fontSize="14" fontWeight="800">
          USTRIX
        </text>
        <text x="400" y="414" textAnchor="middle" fill="#F8FAFC" fontSize="11" fontWeight="600">
          Platform Core
        </text>
      </g>
    </svg>
  );
}

export default function EcosystemPresentation({ open, onClose }: EcosystemPresentationProps) {
  const { t } = useLanding();
  const reducedMotion = useReducedMotion();
  const audioRef = useRef(createPresentationAudio());
  const orbitRef = useRef(0);
  const previousSceneRef = useRef(-1);
  const previousWorkflowRef = useRef(0);

  const [mounted, setMounted] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [soundOn, setSoundOn] = useState(false);
  const [sceneIndex, setSceneIndex] = useState(0);
  const [sceneElapsed, setSceneElapsed] = useState(0);
  const [orbitShift, setOrbitShift] = useState(0);
  const [workflowStep, setWorkflowStep] = useState(1);

  const scenes = useMemo<Scene[]>(
    () => [
      {
        kind: 'intro',
        durationMs: 3800,
        eyebrow: t.ecosystemPresentationEyebrow,
        title: t.ecosystemTitle,
        body: t.ecosystemSubtitle,
      },
      {
        kind: 'buyer',
        durationMs: 3600,
        eyebrow: t.ecosystemBuyer,
        title: t.ecosystemPresentationBuyerTitle,
        body: t.ecosystemBuyerText,
      },
      {
        kind: 'seller',
        durationMs: 3600,
        eyebrow: t.ecosystemSeller,
        title: t.ecosystemPresentationSellerTitle,
        body: t.ecosystemSellerText,
      },
      {
        kind: 'agents',
        durationMs: 3600,
        eyebrow: t.ecosystemAgents,
        title: t.ecosystemPresentationAgentsTitle,
        body: t.ecosystemAgentsText,
      },
      {
        kind: 'core',
        durationMs: 3800,
        eyebrow: t.ecosystemPresentationCoreEyebrow,
        title: t.ecosystemPresentationCoreTitle,
        body: t.ecosystemPresentationCoreBody,
      },
      {
        kind: 'workflow',
        durationMs: WORKFLOW_STEPS.length * WORKFLOW_STEP_MS,
        eyebrow: t.ecosystemPresentationWorkflowEyebrow,
        title: t.ecosystemPresentationWorkflowTitle,
        body: t.ecosystemPresentationWorkflowBody,
      },
      {
        kind: 'subscription',
        durationMs: 5200,
        eyebrow: t.ecosystemPresentationSubscriptionEyebrow,
        title: t.ecosystemPresentationSubscriptionTitle,
        body: t.ecosystemPresentationSubscriptionBody,
      },
      {
        kind: 'outro',
        durationMs: 5200,
        eyebrow: t.ecosystemPresentationOutroEyebrow,
        title: t.ecosystemPresentationOutroTitle,
        body: t.ecosystemPresentationOutroBody,
      },
    ],
    [t],
  );

  const totalDurationMs = useMemo(
    () => scenes.reduce((sum, scene) => sum + scene.durationMs, 0),
    [scenes],
  );

  const elapsedBeforeScene = useMemo(() => {
    let elapsed = 0;
    for (let index = 0; index < sceneIndex; index += 1) {
      elapsed += scenes[index]?.durationMs ?? 0;
    }
    return elapsed;
  }, [sceneIndex, scenes]);

  const activeScene = scenes[sceneIndex] ?? scenes[0];
  const sceneProgress =
    activeScene.durationMs > 0
      ? Math.min(sceneElapsed / activeScene.durationMs, 1)
      : 0;
  const globalProgress =
    totalDurationMs > 0
      ? Math.min((elapsedBeforeScene + sceneElapsed) / totalDurationMs, 1)
      : 0;

  const closePresentation = useCallback(() => {
    audioRef.current.disable();
    setPlaying(false);
    setSceneIndex(0);
    setSceneElapsed(0);
    setWorkflowStep(1);
    onClose();
  }, [onClose]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    audioRef.current = createPresentationAudio();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    setSceneIndex(0);
    setSceneElapsed(0);
    setWorkflowStep(1);
    setPlaying(true);
    previousSceneRef.current = -1;
    previousWorkflowRef.current = 0;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closePresentation();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
      audioRef.current.dispose();
    };
  }, [closePresentation, open]);

  useEffect(() => {
    if (!open) {
      return;
    }

    if (soundOn) {
      audioRef.current.enable();
    } else {
      audioRef.current.disable();
    }
  }, [open, soundOn]);

  useEffect(() => {
    if (!open || !playing) {
      return undefined;
    }

    if (reducedMotion) {
      const timer = window.setInterval(() => {
        setSceneElapsed((current) => current + 250);
        orbitRef.current = (orbitRef.current + 250 / 210) % 100;
        setOrbitShift(orbitRef.current);
      }, 250);
      return () => window.clearInterval(timer);
    }

    let frame = 0;
    let lastTick = performance.now();

    const tick = (now: number) => {
      const delta = now - lastTick;
      lastTick = now;
      setSceneElapsed((current) => current + delta);
      orbitRef.current = (orbitRef.current + delta / 210) % 100;
      setOrbitShift(orbitRef.current);
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [open, playing, reducedMotion]);

  useEffect(() => {
    if (!open || !playing) {
      return undefined;
    }

    const scene = scenes[sceneIndex];
    if (!scene) {
      return undefined;
    }

    if (sceneElapsed < scene.durationMs) {
      return undefined;
    }

    if (sceneIndex >= scenes.length - 1) {
      setSceneIndex(0);
      setSceneElapsed(0);
      setWorkflowStep(1);
      return undefined;
    }

    setSceneIndex((current) => current + 1);
    setSceneElapsed(0);
    return undefined;
  }, [open, playing, sceneElapsed, sceneIndex, scenes]);

  useEffect(() => {
    if (!open) {
      return;
    }

    if (previousSceneRef.current !== sceneIndex) {
      if (soundOn && previousSceneRef.current >= 0) {
        audioRef.current.playSceneTransition();
      }
      previousSceneRef.current = sceneIndex;
      previousWorkflowRef.current = 0;
    }

    if (activeScene.kind !== 'workflow') {
      return;
    }

    const stepIndex = Math.min(
      WORKFLOW_STEPS.length - 1,
      Math.floor(sceneElapsed / WORKFLOW_STEP_MS),
    );
    const nextStep = WORKFLOW_STEPS[stepIndex]?.step ?? 1;

    if (nextStep !== workflowStep) {
      setWorkflowStep(nextStep);
    }

    if (soundOn && nextStep !== previousWorkflowRef.current) {
      audioRef.current.playWorkflowTick();
      previousWorkflowRef.current = nextStep;
    }
  }, [
    activeScene.kind,
    open,
    sceneElapsed,
    sceneIndex,
    soundOn,
    workflowStep,
  ]);

  const toggleSound = () => {
    setSoundOn((current) => {
      const next = !current;
      if (next) {
        audioRef.current.enable();
        audioRef.current.playSceneTransition();
      } else {
        audioRef.current.disable();
      }
      return next;
    });
  };

  if (!open || !mounted) {
    return null;
  }

  const workflowLabel =
    WORKFLOW_STEPS.find((step) => step.step === workflowStep)?.label ?? '';

  return createPortal(
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-labelledby="ecosystem-presentation-title"
    >
      <ParticleCanvas active={!reducedMotion && playing} />

      <div className={styles.topBar}>
        <div className={styles.brandMark}>
          <Image src="/icon.svg" alt="" width={28} height={28} />
          USTRIX Presentation
        </div>
        <div className={styles.controls}>
          <button
            type="button"
            className={`${styles.controlBtn} ${soundOn ? styles.controlBtnActive : ''}`}
            onClick={toggleSound}
          >
            {soundOn ? t.ecosystemPresentationSoundOff : t.ecosystemPresentationSoundOn}
          </button>
          <button
            type="button"
            className={styles.controlBtn}
            onClick={() => setPlaying((current) => !current)}
          >
            {playing ? t.ecosystemPresentationPause : t.ecosystemPresentationPlay}
          </button>
          <button type="button" className={styles.controlBtn} onClick={closePresentation}>
            {t.ecosystemPresentationClose}
          </button>
        </div>
      </div>

      <div className={styles.stage}>
        <div className={styles.stageInner}>
          <PresentationHub
            activeKind={activeScene.kind}
            workflowStep={workflowStep}
            orbitShift={orbitShift}
          />

          {activeScene.kind === 'workflow' && (
            <div className={styles.workflowSpotlight} key={workflowStep}>
              <span className={styles.workflowStep}>{workflowStep}</span>
              <p className={styles.workflowLabel}>{workflowLabel}</p>
            </div>
          )}
        </div>
      </div>

      <div className={styles.caption} key={`${sceneIndex}-${activeScene.kind}`}>
        <p className={styles.captionEyebrow}>{activeScene.eyebrow}</p>
        <h2 id="ecosystem-presentation-title" className={styles.captionTitle}>
          {activeScene.title}
        </h2>
        <p className={styles.captionBody}>{activeScene.body}</p>

        {activeScene.kind === 'outro' && (
          <div className={styles.outroActions}>
            <Link href="/register" className={`${styles.outroBtn} ${styles.outroBtnPrimary}`}>
              {t.getStarted}
            </Link>
            <Link
              href="/agent-register"
              className={`${styles.outroBtn} ${styles.outroBtnGhost}`}
            >
              {t.ecosystemPresentationAgentCta}
            </Link>
          </div>
        )}
      </div>

      <div className={styles.footer}>
        <div className={styles.progressTrack} aria-hidden="true">
          <div
            className={styles.progressFill}
            style={{ width: `${globalProgress * 100}%` }}
          />
        </div>
        <div className={styles.sceneMeta}>
          <span>
            {t.ecosystemPresentationScene} {sceneIndex + 1}/{scenes.length}
          </span>
          <span>{Math.round(sceneProgress * 100)}%</span>
        </div>
      </div>
    </div>,
    document.body,
  );
}

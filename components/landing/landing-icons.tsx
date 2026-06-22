import type { ReactNode } from 'react';
import styles from './landing.module.css';

export type LandingIconName =
  | 'marketplace'
  | 'secure'
  | 'workflow'
  | 'network'
  | 'buyers'
  | 'sellers'
  | 'individuals'
  | 'corporation'
  | 'professional'
  | 'agents'
  | 'pathway'
  | 'subscription'
  | 'account'
  | 'payment'
  | 'dashboard'
  | 'operations'
  | 'contact'
  | 'service'
  | 'capability'
  | 'quote'
  | 'order'
  | 'analytics';

type LandingIconProps = {
  name: LandingIconName;
  size?: number;
  className?: string;
};

function Svg({ children, size }: { children: ReactNode; size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      {children}
    </svg>
  );
}

const ICONS: Record<LandingIconName, (size: number) => ReactNode> = {
  marketplace: (size) => (
    <Svg size={size}>
      <path d="M4 9h16v11H4V9z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M4 13h16M9 9V6.5A3 3 0 0115 6.5V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M9 17h.01M15 17h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </Svg>
  ),
  secure: (size) => (
    <Svg size={size}>
      <path d="M12 3l7.5 3.8V11c0 4.7-3.2 8.2-7.5 9-4.3-.8-7.5-4.3-7.5-9V6.8L12 3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  ),
  workflow: (size) => (
    <Svg size={size}>
      <rect x="3" y="4" width="7" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <rect x="14" y="4" width="7" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <rect x="8.5" y="14" width="7" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6.5 10v1.5h4.5V14M17.5 10v1.5H13V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </Svg>
  ),
  network: (size) => (
    <Svg size={size}>
      <circle cx="12" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="5" cy="19" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="19" cy="19" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 7.5v4M9.5 15.5L7 17M14.5 15.5L17 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </Svg>
  ),
  buyers: (size) => (
    <Svg size={size}>
      <path d="M4 7h16l-1.5 12H5.5L4 7z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M9 7V5a3 3 0 016 0v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M9 11h6M9 15h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </Svg>
  ),
  sellers: (size) => (
    <Svg size={size}>
      <path d="M3 10h18v9H3v-9z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M7 10V6.5A5 5 0 0117 6.5V10" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 13v3M10.5 14.5h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </Svg>
  ),
  individuals: (size) => (
    <Svg size={size}>
      <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5 20c1.5-4 4-6 7-6s5.5 2 7 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </Svg>
  ),
  corporation: (size) => (
    <Svg size={size}>
      <rect x="4" y="5" width="16" height="15" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 5V3h8v2M8 11h2M14 11h2M8 15h2M14 15h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </Svg>
  ),
  professional: (size) => (
    <Svg size={size}>
      <path d="M4 19h16M6 19V9l6-4 6 4v10" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <rect x="10" y="13" width="4" height="6" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9 9h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </Svg>
  ),
  agents: (size) => (
    <Svg size={size}>
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="4" r="1.5" fill="currentColor" />
      <circle cx="20" cy="12" r="1.5" fill="currentColor" />
      <circle cx="12" cy="20" r="1.5" fill="currentColor" />
      <circle cx="4" cy="12" r="1.5" fill="currentColor" />
      <path d="M12 7v2M17 12h-2M12 17v-2M7 12h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </Svg>
  ),
  pathway: (size) => (
    <Svg size={size}>
      <path d="M4 6h6v6H4V6zM14 6h6v6h-6V6zM9 18h6v-2H9v2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M10 12v3h4v-3M7 9h0M17 9h0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </Svg>
  ),
  subscription: (size) => (
    <Svg size={size}>
      <rect x="4" y="5" width="16" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M4 9h16M8 13h2M8 16h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="17" cy="14.5" r="1.5" fill="currentColor" />
    </Svg>
  ),
  account: (size) => (
    <Svg size={size}>
      <rect x="5" y="3" width="14" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8.5 16c.8-1.8 2-2.5 3.5-2.5s2.7.7 3.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </Svg>
  ),
  payment: (size) => (
    <Svg size={size}>
      <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 10h18M7 15h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M15 14.5h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </Svg>
  ),
  dashboard: (size) => (
    <Svg size={size}>
      <rect x="3" y="4" width="8" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <rect x="13" y="4" width="8" height="4" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <rect x="13" y="10" width="8" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <rect x="3" y="13" width="8" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
    </Svg>
  ),
  operations: (size) => (
    <Svg size={size}>
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 8v4l3 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 4l1 2M16 4l-1 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </Svg>
  ),
  contact: (size) => (
    <Svg size={size}>
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 7l9 6 9-6" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </Svg>
  ),
  service: (size) => (
    <Svg size={size}>
      <path d="M12 3l2.5 5 5.5.8-4 3.9.9 5.5-5-2.6-5 2.6.9-5.5-4-3.9 5.5-.8L12 3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </Svg>
  ),
  capability: (size) => (
    <Svg size={size}>
      <path d="M12 2v4M12 18v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
    </Svg>
  ),
  quote: (size) => (
    <Svg size={size}>
      <path d="M6 4h12v16H6V4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M9 8h6M9 12h6M9 16h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </Svg>
  ),
  order: (size) => (
    <Svg size={size}>
      <path d="M7 4h10l2 4v12H5V8l2-4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M9 12h6M9 16h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </Svg>
  ),
  analytics: (size) => (
    <Svg size={size}>
      <path d="M4 19V5M20 19H4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8 15v-4M12 15V9M16 15v-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </Svg>
  ),
};

export default function LandingIcon({
  name,
  size = 22,
  className,
}: LandingIconProps) {
  return (
    <span className={`${styles.iconBadge} ${className ?? ''}`}>
      {ICONS[name](size)}
    </span>
  );
}

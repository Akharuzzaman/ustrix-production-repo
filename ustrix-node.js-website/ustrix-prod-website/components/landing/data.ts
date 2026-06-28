export const TRUST_ITEMS = [
  {
    title: 'Centralized Marketplace',
    description:
      'One digital hub connecting buyers, sellers, and approved partners.',
    icon: 'marketplace',
  },
  {
    title: 'Secure & Transparent',
    description:
      'Structured workflows, audit visibility, and protected operations.',
    icon: 'secure',
  },
  {
    title: 'Efficient Workflows',
    description:
      'Quotes, orders, milestones, and subscriptions in one flow.',
    icon: 'workflow',
  },
  {
    title: 'Trusted Network',
    description:
      'Enterprise-grade onboarding for organizations and professionals.',
    icon: 'network',
  },
] as const;

export const USER_TYPES = [
  {
    title: 'Buyers',
    description: 'Procure goods and services with structured quotation flows.',
    href: '/register',
    icon: 'buyers' as const,
  },
  {
    title: 'Sellers',
    description: 'Offer services, fulfill orders, and manage execution.',
    href: '/register',
    icon: 'sellers' as const,
  },
  {
    title: 'Individuals',
    description: 'Personal procurement and service ordering on one platform.',
    href: '/register',
    icon: 'individuals' as const,
  },
  {
    title: 'Corporations & Organizations',
    description: 'Multi-user tenant operations with centralized control.',
    href: '/register',
    icon: 'corporation' as const,
  },
  {
    title: 'Professionals & Contractors',
    description: 'Deliver specialized services through digital workflows.',
    href: '/register',
    icon: 'professional' as const,
  },
  {
    title: 'Agents & Brokers',
    description: 'Confidential partner channel for qualified lead flow.',
    href: '/register?role=agent',
    icon: 'agents' as const,
  },
] as const;

export const SERVICE_AREAS = [
  'Residential Home Renovations',
  'Commercial Building Services',
  'Condominium Services',
  'Electrical Goods & Services',
  'HVAC Goods & Services',
  'Plumbing Goods & Services',
  'Cleaning & Maintenance',
  'General Goods Procurement',
  'Service Ordering',
] as const;

export const CAPABILITIES = [
  'Sourcing Suppliers',
  'Requesting Services',
  'Managing Orders',
  'Tracking Fulfillment',
  'Comparing Quotes',
  'Subscription Management',
  'Payment Processing',
  'Analytics & Reporting',
] as const;

export const HOW_IT_WORKS = [
  {
    step: 1,
    title: 'Select Pathway',
    text: 'Choose buyer, seller, or partner onboarding path.',
    icon: 'pathway' as const,
  },
  {
    step: 2,
    title: 'Choose Subscription',
    text: 'Select a plan aligned with your operational scale.',
    icon: 'subscription' as const,
  },
  {
    step: 3,
    title: 'Create Account',
    text: 'Register your organization and admin profile.',
    icon: 'account' as const,
  },
  {
    step: 4,
    title: 'Complete Payment',
    text: 'Secure checkout for paid plans through Stripe.',
    icon: 'payment' as const,
  },
  {
    step: 5,
    title: 'Access Dashboard',
    text: 'Access your secure operational dashboard.',
    icon: 'dashboard' as const,
  },
  {
    step: 6,
    title: 'Manage Operations',
    text: 'Run procurement, orders, and settlement daily.',
    icon: 'operations' as const,
  },
] as const;

export type JobRow = {
  id: string;
  province: string;
  city: string;
  postal: string;
  description: string;
  posted: string;
  closing: string;
  status: 'New' | 'In Progress' | 'Completed';
  category: string;
};

export const JOB_ROWS: JobRow[] = [
  {
    id: '1',
    province: 'Ontario',
    city: 'Toronto',
    postal: 'M5V',
    description: 'Commercial HVAC inspection and preventive maintenance',
    posted: '2026-06-21',
    closing: '2026-06-28',
    status: 'New',
    category: 'HVAC',
  },
  {
    id: '2',
    province: 'Ontario',
    city: 'Mississauga',
    postal: 'L5B',
    description: 'Multi-unit building cleaning and maintenance service',
    posted: '2026-06-20',
    closing: '2026-06-27',
    status: 'In Progress',
    category: 'Cleaning',
  },
  {
    id: '3',
    province: 'Alberta',
    city: 'Calgary',
    postal: 'T2P',
    description: 'Electrical panel inspection and repair quotation',
    posted: '2026-06-18',
    closing: '2026-06-25',
    status: 'New',
    category: 'Electrical',
  },
  {
    id: '4',
    province: 'British Columbia',
    city: 'Vancouver',
    postal: 'V6B',
    description:
      'Property renovation scope review and contractor quotation',
    posted: '2026-06-15',
    closing: '2026-06-22',
    status: 'Completed',
    category: 'Renovation',
  },
  {
    id: '5',
    province: 'Ontario',
    city: 'Brampton',
    postal: 'L6Y',
    description: 'Residential plumbing repair and quote request',
    posted: '2026-06-22',
    closing: '2026-06-29',
    status: 'New',
    category: 'Plumbing',
  },
  {
    id: '6',
    province: 'Manitoba',
    city: 'Winnipeg',
    postal: 'R3C',
    description: 'Commercial cleaning service requirement',
    posted: '2026-06-22',
    closing: '2026-06-30',
    status: 'New',
    category: 'Cleaning',
  },
  {
    id: '7',
    province: 'Quebec',
    city: 'Montreal',
    postal: 'H3B',
    description: 'Building maintenance and service-order request',
    posted: '2026-06-21',
    closing: '2026-06-27',
    status: 'In Progress',
    category: 'Maintenance',
  },
  {
    id: '8',
    province: 'Nova Scotia',
    city: 'Halifax',
    postal: 'B3J',
    description: 'HVAC service provider quotation request',
    posted: '2026-06-20',
    closing: '2026-06-26',
    status: 'New',
    category: 'HVAC',
  },
];

export const DASHBOARD_METRICS = [
  { label: 'Users', value: '1,248' },
  { label: 'Active Jobs', value: '86' },
  { label: 'Service Orders', value: '312' },
  { label: 'Subscriptions', value: '94' },
  { label: 'Revenue', value: 'C$428K' },
] as const;

export const TESTIMONIALS = [
  {
    quote:
      'USTRIX gave our procurement team a single place to manage quotes, orders, and vendor communication.',
    name: 'Sarah Chen',
    role: 'Operations Director, Mapleline Services',
  },
  {
    quote:
      'As a contractor, structured order milestones and payment visibility reduced disputes significantly.',
    name: 'David Okonkwo',
    role: 'Principal, Okonkwo Electrical Ltd.',
  },
  {
    quote:
      'Subscription and dashboard access made it straightforward to onboard our regional offices.',
    name: 'Elena Vasquez',
    role: 'VP Procurement, Northfield Group',
  },
] as const;

export const SUBSCRIPTION_ROLE_FEATURES = [
  'Monthly platform access',
  'Profile and dashboard access',
  'Verified onboarding',
  'Role-based marketplace features',
] as const;

export const SUBSCRIPTION_ROLES = [
  {
    id: 'buyer' as const,
    title: 'Buyer',
    href: '/register?role=buyer',
    cta: 'Start as Buyer',
    accent: 'buyer' as const,
  },
  {
    id: 'seller' as const,
    title: 'Seller',
    href: '/register?role=seller',
    cta: 'Start as Seller',
    accent: 'seller' as const,
  },
  {
    id: 'agent' as const,
    title: 'Agent',
    href: '/register?role=agent',
    cta: 'Start as Agent',
    accent: 'agent' as const,
  },
] as const;

export const SOCIAL_LINKS = [
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/ustrix/',
    iconSrc: '/icons/social/linkedin.png',
  },
  {
    id: 'facebook',
    label: 'Facebook',
    href: 'https://www.facebook.com/ustrix',
    iconSrc: '/icons/social/facebook.png',
  },
  {
    id: 'x',
    label: 'X (Twitter)',
    href: 'https://x.com/ustrix',
    iconSrc: '/icons/social/x.png',
  },
  {
    id: 'youtube',
    label: 'YouTube',
    href: 'https://www.youtube.com/@ustrix',
    iconSrc: '/icons/social/youtube.png',
  },
] as const;

export const PLANS = [
  {
    code: 'FREE' as const,
    name: 'Free',
    features: ['Limited marketplace access', 'Basic dashboard', 'Community support'],
    cta: 'Start Free',
    query: 'FREE',
    recommended: false,
  },
  {
    code: 'STARTER' as const,
    name: 'Starter',
    features: [
      'Core procurement workflows',
      'Order tracking',
      'Email support',
    ],
    cta: 'Choose Starter',
    query: 'STARTER',
    recommended: true,
  },
  {
    code: 'PROFESSIONAL' as const,
    name: 'Professional',
    features: [
      'Advanced workflows',
      'Quote comparison',
      'Priority support',
    ],
    cta: 'Choose Professional',
    query: 'PROFESSIONAL',
    recommended: false,
  },
  {
    code: 'ENTERPRISE' as const,
    name: 'Enterprise',
    features: [
      'Multi-branch operations',
      'Settlement visibility',
      'Dedicated onboarding',
    ],
    cta: 'Choose Enterprise',
    query: 'ENTERPRISE',
    recommended: false,
  },
];

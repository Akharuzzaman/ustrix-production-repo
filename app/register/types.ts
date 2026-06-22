import type { RegisterTenantResponse } from '@/lib/ustrix-api';

export type PlanCode = 'FREE' | 'STARTER' | 'PROFESSIONAL' | 'ENTERPRISE';

export type SubscriptionPlan = {
  planCode: PlanCode;
  name: string;
  priceLabel: string;
  description: string;
  recommended?: boolean;
  paid?: boolean;
};

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    planCode: 'FREE',
    name: 'Free',
    priceLabel: 'CAD 0 / month',
    description: 'Limited access to get started.',
  },
  {
    planCode: 'STARTER',
    name: 'Starter',
    priceLabel: 'CAD 290 / month',
    description: 'For small teams starting with USTRIX.',
    recommended: true,
    paid: true,
  },
  {
    planCode: 'PROFESSIONAL',
    name: 'Professional',
    priceLabel: 'CAD 790 / month',
    description: 'For growing procurement and service teams.',
    paid: true,
  },
  {
    planCode: 'ENTERPRISE',
    name: 'Enterprise',
    priceLabel: 'CAD 1990 / month',
    description: 'For larger organizations and multi-branch operations.',
    paid: true,
  },
];

export const VALID_PLAN_CODES: PlanCode[] = [
  'FREE',
  'STARTER',
  'PROFESSIONAL',
  'ENTERPRISE',
];

export type RegistrationData = RegisterTenantResponse;

export function isPaidPlan(planCode: PlanCode): boolean {
  return planCode !== 'FREE';
}

export function getPlanByCode(planCode: PlanCode): SubscriptionPlan {
  const plan = SUBSCRIPTION_PLANS.find((item) => item.planCode === planCode);
  if (!plan) {
    throw new Error(`Unknown plan code: ${planCode}`);
  }
  return plan;
}

export function getPlanAmountCad(planCode: PlanCode): number {
  switch (planCode) {
    case 'FREE':
      return 0;
    case 'STARTER':
      return 290;
    case 'PROFESSIONAL':
      return 790;
    case 'ENTERPRISE':
      return 1990;
  }
}

export type RegistrationFlowState =
  | 'idle'
  | 'creatingAccount'
  | 'accountCreated'
  | 'paymentRequired'
  | 'redirectingToStripe'
  | 'redirecting'
  | 'error';

export function getOnboardingLoadingLabel(planCode: PlanCode): string {
  return isPaidPlan(planCode)
    ? 'Preparing subscription and dashboard access…'
    : 'Preparing dashboard access…';
}

export const ADMIN_EMAIL_HELPER =
  'Use your business email if you are registering an organization. Additional users can be added later from the dashboard.';

export const PAYMENT_NOTE =
  'Paid plans require secure card payment through Stripe before dashboard access.';

export const STRIPE_CHECKOUT_NOTE =
  'You will be redirected to Stripe’s secure checkout to complete credit/debit card payment.';

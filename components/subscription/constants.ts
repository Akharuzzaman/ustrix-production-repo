import type { OwnerTypeOption, SubscriptionRoleOption } from './types';

export const SUBSCRIPTION_FLOW_STEPS = [
  'Subscribe as',
  'Specify',
  'Plan',
  'Checkout',
] as const;

export const SUBSCRIPTION_SPECIFY_HEADING = 'Please Specify';
export const SUBSCRIPTION_SPECIFY_HELPER = '';

export const SUBSCRIPTION_FOR_HEADING = SUBSCRIPTION_SPECIFY_HEADING;
export const SUBSCRIPTION_FOR_HELPER = SUBSCRIPTION_SPECIFY_HELPER;

export const SUBSCRIBE_AS_HEADING = 'Subscribe as';
export const SUBSCRIBE_AS_HELPER = '';

export const CHOOSE_PLAN_HEADING = 'Choose Plan';
export const CHOOSE_PLAN_HELPER = '';

export const SUBSCRIPTION_TYPE_LABEL = 'Subscription Type';
export const SUBSCRIPTION_PLAN_LABEL = 'Subscription Plan';

export const OWNER_TYPE_OPTIONS: OwnerTypeOption[] = [
  {
    value: 'individual',
    title: 'Individual',
    description: 'Single user',
    accentColor: '#2563EB',
  },
  {
    value: 'organization',
    title: 'Business / Organization / Institute',
    description: 'Multiple users',
    accentColor: '#16A34A',
  },
];

export const SUBSCRIPTION_ROLE_OPTIONS: SubscriptionRoleOption[] = [
  {
    value: 'buyer',
    title: 'Buyer',
    description: '',
    accentColor: '#2563EB',
    href: '/register?role=buyer',
  },
  {
    value: 'seller',
    title: 'Seller',
    description: '',
    accentColor: '#16A34A',
    href: '/register?role=seller',
  },
  {
    value: 'agent',
    title: 'Agent',
    description: '',
    accentColor: '#F59E0B',
    href: '/register?role=agent',
  },
];

export const OWNER_TYPE_REQUIRED_MESSAGE = 'Specify Individual or Business / Organization / Institute.';
export const ROLE_REQUIRED_MESSAGE = 'Select Buyer, Seller, or Agent.';

export function getOwnerTypeLabel(
  ownerType: 'individual' | 'organization' | null | undefined
): string {
  if (ownerType === 'individual') {
    return 'Individual';
  }
  if (ownerType === 'organization') {
    return 'Business / Organization / Institute';
  }
  return '—';
}

export function getSubscriptionTypeLabel(
  role: 'buyer' | 'seller' | 'agent' | null | undefined
): string {
  if (role === 'buyer') {
    return 'Buyer';
  }
  if (role === 'seller') {
    return 'Seller';
  }
  if (role === 'agent') {
    return 'Agent';
  }
  return '—';
}

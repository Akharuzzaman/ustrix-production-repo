import type { PlanCode } from '@/app/register/types';
import type { OwnerType, SubscriptionRole } from './types';

export function buildRegisterHref(input: {
  role: SubscriptionRole;
  ownerType?: OwnerType | null;
  plan?: PlanCode | string | null;
}): string {
  const base = '/register';
  const params = new URLSearchParams();
  params.set('role', input.role);

  if (input.ownerType) {
    params.set('ownerType', input.ownerType);
  }

  if (input.plan) {
    params.set('plan', input.plan);
  }

  const query = params.toString();
  return query ? `${base}?${query}` : base;
}

export function parseSubscriptionSearchParams(
  params: URLSearchParams
): {
  role: SubscriptionRole | null;
  ownerType: OwnerType | null;
  plan: PlanCode | null;
} {
  const roleParam = params.get('role');
  const ownerParam = params.get('ownerType');
  const planParam = params.get('plan');

  const role =
    roleParam === 'buyer' || roleParam === 'seller' || roleParam === 'agent'
      ? roleParam
      : null;

  const ownerType =
    ownerParam === 'individual' || ownerParam === 'organization'
      ? ownerParam
      : null;

  const plan =
    planParam === 'FREE' ||
    planParam === 'STARTER' ||
    planParam === 'PROFESSIONAL' ||
    planParam === 'ENTERPRISE'
      ? planParam
      : null;

  return { role, ownerType, plan };
}

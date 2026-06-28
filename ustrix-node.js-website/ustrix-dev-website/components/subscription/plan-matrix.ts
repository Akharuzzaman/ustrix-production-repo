import type { PlanCode } from '@/app/register/types';
import type { OwnerType } from './types';

export const INDIVIDUAL_PLAN_CODES: PlanCode[] = ['FREE', 'STARTER', 'PROFESSIONAL'];

export const ORGANIZATION_PLAN_CODES: PlanCode[] = [
  'FREE',
  'STARTER',
  'PROFESSIONAL',
  'ENTERPRISE',
];

export function getPlanCodesForOwnerType(
  ownerType: OwnerType | null | undefined
): PlanCode[] {
  if (ownerType === 'individual') {
    return INDIVIDUAL_PLAN_CODES;
  }
  if (ownerType === 'organization') {
    return ORGANIZATION_PLAN_CODES;
  }
  return [];
}

export function isPlanAvailableForOwnerType(
  ownerType: OwnerType | null | undefined,
  planCode: PlanCode
): boolean {
  return getPlanCodesForOwnerType(ownerType).includes(planCode);
}

export function resolvePlanForOwnerType(
  ownerType: OwnerType | null | undefined,
  planCode: PlanCode
): PlanCode {
  const allowed = getPlanCodesForOwnerType(ownerType);
  if (allowed.length === 0) {
    return planCode;
  }
  if (allowed.includes(planCode)) {
    return planCode;
  }
  return allowed.includes('STARTER') ? 'STARTER' : allowed[0];
}

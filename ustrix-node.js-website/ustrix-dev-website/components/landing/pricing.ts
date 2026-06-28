export type CurrencyCode = 'CAD' | 'USD' | 'GBP' | 'AUD';
export type PlanCode = 'FREE' | 'STARTER' | 'PROFESSIONAL' | 'ENTERPRISE';
export type BillingCycle = 'monthly' | 'yearly';

export const CURRENCY_SYMBOLS: Record<CurrencyCode, string> = {
  CAD: 'C$',
  USD: 'US$',
  GBP: '£',
  AUD: 'A$',
};

export const PLAN_PRICES: Record<
  CurrencyCode,
  Record<PlanCode, { monthly: number; yearly: number }>
> = {
  CAD: {
    FREE: { monthly: 0, yearly: 0 },
    STARTER: { monthly: 290, yearly: 2900 },
    PROFESSIONAL: { monthly: 790, yearly: 7900 },
    ENTERPRISE: { monthly: 1990, yearly: 19900 },
  },
  USD: {
    FREE: { monthly: 0, yearly: 0 },
    STARTER: { monthly: 215, yearly: 2150 },
    PROFESSIONAL: { monthly: 585, yearly: 5850 },
    ENTERPRISE: { monthly: 1475, yearly: 14750 },
  },
  GBP: {
    FREE: { monthly: 0, yearly: 0 },
    STARTER: { monthly: 170, yearly: 1700 },
    PROFESSIONAL: { monthly: 465, yearly: 4650 },
    ENTERPRISE: { monthly: 1170, yearly: 11700 },
  },
  AUD: {
    FREE: { monthly: 0, yearly: 0 },
    STARTER: { monthly: 325, yearly: 3250 },
    PROFESSIONAL: { monthly: 885, yearly: 8850 },
    ENTERPRISE: { monthly: 2230, yearly: 22300 },
  },
};

export function formatPlanPrice(
  currency: CurrencyCode,
  amount: number,
  cycle: BillingCycle
): string {
  const symbol = CURRENCY_SYMBOLS[currency];
  const formatted = amount.toLocaleString('en-CA');
  const suffix = cycle === 'monthly' ? '/ month' : '/ year';
  return `${symbol}${formatted} ${suffix}`;
}

'use server';

import {
  createSsoToken,
  createStripeCheckoutSession,
  upgradeSubscription,
  verifyStripeCheckoutSession,
  UstrixApiError,
} from '@/lib/ustrix-api';
import { VALID_PLAN_CODES, type PlanCode } from '@/app/register/types';

export type PaymentSuccessFormState =
  | { status: 'idle' }
  | { status: 'error'; message: string }
  | { status: 'success'; nextUrl: string };

export async function completePaidRegistrationAction(
  _prevState: PaymentSuccessFormState,
  formData: FormData
): Promise<PaymentSuccessFormState> {
  const sessionId = String(formData.get('sessionId') ?? '').trim();

  if (!sessionId) {
    return { status: 'error', message: 'Missing Stripe checkout session.' };
  }

  try {
    const verification = await verifyStripeCheckoutSession({ sessionId });

    if (!verification.paid) {
      return {
        status: 'error',
        message: 'Payment has not been completed.',
      };
    }

    const planCode = verification.planCode as PlanCode;

    if (!VALID_PLAN_CODES.includes(planCode) || planCode === 'FREE') {
      return {
        status: 'error',
        message: 'Invalid subscription plan from payment session.',
      };
    }

    const upgradePayload: Parameters<typeof upgradeSubscription>[0] = {
      tenantCode: verification.tenantCode,
      planCode,
      billingCycle: 'MONTHLY',
    };

    if (verification.stripeCustomerId && verification.stripeSubscriptionId) {
      upgradePayload.paymentProvider = 'STRIPE';
      upgradePayload.providerCustomerId = verification.stripeCustomerId;
      upgradePayload.providerSubscriptionId = verification.stripeSubscriptionId;
    }

    await upgradeSubscription(upgradePayload);

    const sso = await createSsoToken({
      tenantCode: verification.tenantCode,
      email: verification.email,
    });

    return { status: 'success', nextUrl: sso.nextUrl };
  } catch (error) {
    const message =
      error instanceof UstrixApiError
        ? error.message
        : 'Unable to complete paid registration. Please try again.';

    return { status: 'error', message };
  }
}

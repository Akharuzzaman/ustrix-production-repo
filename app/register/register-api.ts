import {
  createSsoToken,
  createStripeCheckoutSession,
  registerTenant,
  type RegisterTenantPayload,
  type RegisterTenantResponse,
  UstrixApiError,
} from '@/lib/ustrix-api';
import { isValidEmailFormat } from '@/lib/email-validation';
import { VALID_PLAN_CODES, type PlanCode } from './types';
import { PASSWORD_REGEX } from './validation';

export type RegisterFormState =
  | { status: 'idle' }
  | { status: 'error'; message: string }
  | { status: 'success'; data: RegisterTenantResponse };

export type OnboardingFormState =
  | { status: 'idle' }
  | { status: 'error'; message: string }
  | { status: 'success'; nextUrl: string };

export type CheckoutFormState =
  | { status: 'idle' }
  | { status: 'error'; message: string }
  | { status: 'success'; checkoutUrl: string };

export async function submitRegistration(
  formData: FormData
): Promise<RegisterFormState> {
  const payload: RegisterTenantPayload = {
    companyName: String(formData.get('companyName') ?? '').trim(),
    firstName: String(formData.get('firstName') ?? '').trim(),
    lastName: String(formData.get('lastName') ?? '').trim(),
    email: String(formData.get('email') ?? '').trim(),
    password: String(formData.get('password') ?? ''),
    countryCode: '001',
    regionCode: 'ON',
    currencyCode: 'CAD',
  };

  if (
    !payload.companyName ||
    !payload.firstName ||
    !payload.lastName ||
    !payload.email ||
    !payload.password
  ) {
    return {
      status: 'error',
      message:
        'Company name, admin name, email, and password are required.',
    };
  }

  if (!PASSWORD_REGEX.test(payload.password)) {
    return {
      status: 'error',
      message:
        'Password must be at least 8 characters and include uppercase, lowercase, number, and special character.',
    };
  }

  if (!isValidEmailFormat(payload.email)) {
    return { status: 'error', message: 'Enter a valid email address.' };
  }

  try {
    const data = await registerTenant(payload);
    return { status: 'success', data };
  } catch (error) {
    const message =
      error instanceof UstrixApiError
        ? error.message
        : 'Unable to reach the USTRIX API. Please try again.';

    return { status: 'error', message };
  }
}

export async function requestFreeDashboardAccess(input: {
  tenantCode: string;
  email: string;
}): Promise<OnboardingFormState> {
  const tenantCode = input.tenantCode.trim();
  const email = input.email.trim();

  if (!tenantCode || !email) {
    return {
      status: 'error',
      message: 'Tenant code and email are required.',
    };
  }

  try {
    const sso = await createSsoToken({ tenantCode, email });
    return { status: 'success', nextUrl: sso.nextUrl };
  } catch (error) {
    const message =
      error instanceof UstrixApiError
        ? error.message
        : 'Unable to access the USTRIX dashboard. Please try again.';

    return { status: 'error', message };
  }
}

export async function requestStripeCheckout(input: {
  tenantCode: string;
  tenantNumber: string;
  email: string;
  planCode: PlanCode;
}): Promise<CheckoutFormState> {
  const tenantCode = input.tenantCode.trim();
  const tenantNumber = input.tenantNumber.trim();
  const email = input.email.trim();
  const planCode = input.planCode;

  if (!tenantCode || !tenantNumber || !email || !planCode) {
    return {
      status: 'error',
      message: 'Tenant details and plan selection are required.',
    };
  }

  if (!VALID_PLAN_CODES.includes(planCode) || planCode === 'FREE') {
    return {
      status: 'error',
      message: 'Please select a valid paid subscription plan.',
    };
  }

  try {
    const session = await createStripeCheckoutSession({
      tenantCode,
      tenantNumber,
      email,
      planCode,
      billingCycle: 'MONTHLY',
    });

    return { status: 'success', checkoutUrl: session.checkoutUrl };
  } catch (error) {
    const message =
      error instanceof UstrixApiError
        ? error.message
        : 'Unable to start secure payment. Please try again.';

    return { status: 'error', message };
  }
}

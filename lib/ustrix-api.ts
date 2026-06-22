const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://192.168.57.22:3001';

export type RegisterTenantPayload = {
  companyName: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  countryCode: string;
  regionCode: string;
  currencyCode: string;
};

export type RegisterTenantResponse = {
  status: string;
  message: string;
  tenantNumber: string;
  tenant: {
    tenantId: number;
    tenantNumber: string;
    tenantCode: string;
    tenantName: string;
    countryCode: string;
    regionCode: string;
    currencyCode: string;
    statusCode: string;
    planCode: string;
  };
  adminUser: {
    userId: number;
    tenantId: number;
    tenantCode: string;
    email: string;
    fullName: string;
    roleCode: string;
    statusCode: string;
  };
};

export type UpgradeSubscriptionPayload = {
  tenantCode: string;
  planCode: string;
  billingCycle: 'MONTHLY';
  paymentProvider?: 'STRIPE';
  providerCustomerId?: string;
  providerSubscriptionId?: string;
};

export type UpgradeSubscriptionResponse = {
  status: string;
  message: string;
  tenant: {
    tenantId: number;
    tenantCode: string;
    tenantName: string;
    statusCode: string;
    planCode: string;
  };
  subscription: {
    subscriptionId: number;
    tenantId: number;
    tenantCode: string;
    userId: number;
    planCode: string;
    planName: string;
    billingCycle: string;
    amountCad: number;
    statusCode: string;
    autoRenew: number;
  };
};

export type CreateSsoTokenPayload = {
  tenantCode: string;
  email: string;
};

export type CreateSsoTokenResponse = {
  status: string;
  message: string;
  token: string;
  expiresInSeconds: number;
  user: {
    userId: number;
    tenantId: number;
    tenantCode: string;
    email: string;
    fullName: string;
    roleCode: string;
    statusCode: string;
  };
  nextUrl: string;
};

export type CreateStripeCheckoutSessionPayload = {
  tenantCode: string;
  tenantNumber: string;
  email: string;
  planCode: 'STARTER' | 'PROFESSIONAL' | 'ENTERPRISE';
  billingCycle: 'MONTHLY';
};

export type CreateStripeCheckoutSessionResponse = {
  status: string;
  checkoutUrl: string;
  sessionId: string;
};

export type VerifyStripeCheckoutSessionPayload = {
  sessionId: string;
};

export type VerifyStripeCheckoutSessionResponse = {
  status: string;
  paid: true;
  tenantCode: string;
  tenantNumber: string;
  email: string;
  planCode: string;
  billingCycle: string;
  stripeCustomerId: string | null;
  stripeSubscriptionId: string | null;
};

export type UstrixErrorResponse = {
  status: string;
  message: string;
};

export class UstrixApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UstrixApiError';
  }
}

async function request<TSuccess extends object>(
  path: string,
  options: RequestInit
): Promise<TSuccess> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    cache: 'no-store',
  });

  const data = (await response.json()) as TSuccess | UstrixErrorResponse;

  if (!response.ok || (data as UstrixErrorResponse).status !== 'OK') {
    const errorData = data as UstrixErrorResponse;

    const message =
      errorData.message && typeof errorData.message === 'string'
        ? errorData.message
        : 'Request failed. Please try again.';

    throw new UstrixApiError(message);
  }

  return data as TSuccess;
}

export async function registerTenant(
  payload: RegisterTenantPayload
): Promise<RegisterTenantResponse> {
  return request<RegisterTenantResponse>('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function upgradeSubscription(
  payload: UpgradeSubscriptionPayload
): Promise<UpgradeSubscriptionResponse> {
  return request<UpgradeSubscriptionResponse>('/api/subscriptions/upgrade', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function createSsoToken(
  payload: CreateSsoTokenPayload
): Promise<CreateSsoTokenResponse> {
  return request<CreateSsoTokenResponse>('/api/sso/token', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function createStripeCheckoutSession(
  payload: CreateStripeCheckoutSessionPayload
): Promise<CreateStripeCheckoutSessionResponse> {
  return request<CreateStripeCheckoutSessionResponse>(
    '/api/payments/stripe/create-checkout-session',
    {
      method: 'POST',
      body: JSON.stringify(payload),
    }
  );
}

export async function verifyStripeCheckoutSession(
  payload: VerifyStripeCheckoutSessionPayload
): Promise<VerifyStripeCheckoutSessionResponse> {
  return request<VerifyStripeCheckoutSessionResponse>(
    '/api/payments/stripe/verify-session',
    {
      method: 'POST',
      body: JSON.stringify(payload),
    }
  );
}

'use client';

import { useActionState, useEffect, useRef, useState } from 'react';
import type { RegisterTenantResponse } from '@/lib/ustrix-api';
import {
  createStripeCheckoutSessionAction,
  freeDashboardAccessAction,
  type CheckoutFormState,
  type OnboardingFormState,
} from './actions';
import {
  alertErrorStyle,
  alertInfoStyle,
  cardStyle,
  primaryButtonStyle,
  sectionHintStyle,
} from './styles';
import {
  getPlanAmountCad,
  getPlanByCode,
  STRIPE_CHECKOUT_NOTE,
  type PlanCode,
  type RegistrationFlowState,
} from './types';

const initialOnboardingState: OnboardingFormState = { status: 'idle' };
const initialCheckoutState: CheckoutFormState = { status: 'idle' };

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        gap: '16px',
        padding: '10px 0',
        borderBottom: '1px solid #f3f4f6',
      }}
    >
      <span style={{ fontSize: '13px', color: '#6b7280' }}>{label}</span>
      <span
        style={{
          fontSize: '14px',
          color: '#111827',
          fontWeight: 600,
          textAlign: 'right',
        }}
      >
        {value}
      </span>
    </div>
  );
}

export function FreeDashboardAccess({
  data,
}: {
  data: RegisterTenantResponse;
}) {
  const startedRef = useRef(false);
  const [onboardingState, onboardingAction, isPending] = useActionState(
    freeDashboardAccessAction,
    initialOnboardingState
  );

  useEffect(() => {
    if (startedRef.current) {
      return;
    }
    startedRef.current = true;

    const formData = new FormData();
    formData.set('tenantCode', data.tenant.tenantCode);
    formData.set('email', data.adminUser.email);
    onboardingAction(formData);
  }, [data, onboardingAction]);

  useEffect(() => {
    if (onboardingState.status === 'success') {
      window.location.href = onboardingState.nextUrl;
    }
  }, [onboardingState]);

  return (
    <section style={{ ...cardStyle, maxWidth: '560px', margin: '0 auto' }}>
      <p style={{ color: '#059669', fontWeight: 600, marginBottom: '8px' }}>
        Account created
      </p>
      <h2 style={{ margin: '0 0 16px 0', color: '#111827', fontSize: '24px' }}>
        Preparing dashboard access…
      </h2>

      <div
        style={{
          padding: '18px',
          background: '#ecfdf5',
          border: '1px solid #a7f3d0',
          borderRadius: '12px',
          marginBottom: '20px',
        }}
      >
        <p style={{ color: '#065f46', margin: '0 0 6px 0', fontSize: '13px' }}>
          Tenant Number
        </p>
        <p
          style={{
            margin: 0,
            fontSize: '20px',
            fontWeight: 700,
            color: '#047857',
            fontFamily: 'monospace',
          }}
        >
          {data.tenantNumber}
        </p>
      </div>

      {onboardingState.status === 'error' && (
        <div role="alert" style={alertErrorStyle}>
          {onboardingState.message}
        </div>
      )}

      {(isPending || onboardingState.status !== 'error') && (
        <div role="status" style={alertInfoStyle}>
          Preparing dashboard access…
        </div>
      )}
    </section>
  );
}

export function PaidPlanCheckout({
  data,
  planCode,
}: {
  data: RegisterTenantResponse;
  planCode: PlanCode;
}) {
  const [flowState, setFlowState] =
    useState<RegistrationFlowState>('paymentRequired');
  const [errorMessage, setErrorMessage] = useState('');
  const [checkoutState, checkoutAction, isPending] = useActionState(
    createStripeCheckoutSessionAction,
    initialCheckoutState
  );

  const plan = getPlanByCode(planCode);
  const amountDue = getPlanAmountCad(planCode);
  const isBusy = flowState === 'redirectingToStripe' || isPending;

  function handleContinueToPayment() {
    setErrorMessage('');
    setFlowState('redirectingToStripe');

    const formData = new FormData();
    formData.set('tenantCode', data.tenant.tenantCode);
    formData.set('tenantNumber', data.tenantNumber);
    formData.set('email', data.adminUser.email);
    formData.set('planCode', planCode);
    checkoutAction(formData);
  }

  useEffect(() => {
    if (checkoutState.status === 'success') {
      window.location.href = checkoutState.checkoutUrl;
    }

    if (checkoutState.status === 'error') {
      setFlowState('error');
      setErrorMessage(checkoutState.message);
    }
  }, [checkoutState]);

  return (
    <section style={{ ...cardStyle, maxWidth: '640px', margin: '0 auto' }}>
      <p style={{ color: '#059669', fontWeight: 600, marginBottom: '8px' }}>
        Account created
      </p>
      <h2 style={{ margin: '0 0 8px 0', color: '#111827', fontSize: '26px' }}>
        Secure payment
      </h2>
      <p style={{ ...sectionHintStyle, marginBottom: '20px' }}>
        {STRIPE_CHECKOUT_NOTE}
      </p>

      <div
        style={{
          padding: '18px',
          background: '#f9fafb',
          border: '1px solid #e5e7eb',
          borderRadius: '12px',
          marginBottom: '18px',
        }}
      >
        <SummaryRow label="Selected Plan" value={plan.name} />
        <SummaryRow label="Billing Cycle" value="Monthly" />
        <SummaryRow label="Amount Due" value={`CAD ${amountDue}`} />
        <SummaryRow label="Currency" value="CAD" />
        <SummaryRow label="Tenant Number" value={data.tenantNumber} />
        <SummaryRow label="Account Name" value={data.tenant.tenantName} />
        <SummaryRow label="Admin Email" value={data.adminUser.email} />
      </div>

      {flowState === 'error' && errorMessage && (
        <div role="alert" style={alertErrorStyle}>
          {errorMessage}
        </div>
      )}

      {isBusy && (
        <div role="status" style={{ ...alertInfoStyle, marginBottom: '20px' }}>
          Redirecting to Stripe secure checkout…
        </div>
      )}

      <button
        type="button"
        onClick={handleContinueToPayment}
        disabled={isBusy}
        style={primaryButtonStyle(isBusy)}
      >
        {isBusy ? 'Redirecting to secure payment…' : 'Continue to Secure Payment'}
      </button>
    </section>
  );
}

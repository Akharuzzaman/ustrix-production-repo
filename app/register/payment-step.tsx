'use client';

import { useEffect, useRef, useState } from 'react';
import type { RegisterTenantResponse } from '@/lib/ustrix-api';
import {
  requestFreeDashboardAccess,
  requestStripeCheckout,
} from './register-api';
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
  const [errorMessage, setErrorMessage] = useState('');
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    if (startedRef.current) {
      return;
    }
    startedRef.current = true;

    async function run() {
      const result = await requestFreeDashboardAccess({
        tenantCode: data.tenant.tenantCode,
        email: data.adminUser.email,
      });

      if (result.status === 'success') {
        window.location.href = result.nextUrl;
        return;
      }

      if (result.status === 'error') {
        setErrorMessage(result.message);
      }

      setIsPending(false);
    }

    void run();
  }, [data]);

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

      {errorMessage && (
        <div role="alert" style={alertErrorStyle}>
          {errorMessage}
        </div>
      )}

      {(isPending || !errorMessage) && (
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
  const [isPending, setIsPending] = useState(false);

  const plan = getPlanByCode(planCode);
  const amountDue = getPlanAmountCad(planCode);
  const isBusy = flowState === 'redirectingToStripe' || isPending;

  async function handleContinueToPayment() {
    setErrorMessage('');
    setFlowState('redirectingToStripe');
    setIsPending(true);

    const result = await requestStripeCheckout({
      tenantCode: data.tenant.tenantCode,
      tenantNumber: data.tenantNumber,
      email: data.adminUser.email,
      planCode,
    });

    setIsPending(false);

    if (result.status === 'success') {
      window.location.href = result.checkoutUrl;
      return;
    }

    if (result.status === 'error') {
      setFlowState('error');
      setErrorMessage(result.message);
    }
  }

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
        onClick={() => void handleContinueToPayment()}
        disabled={isBusy}
        style={primaryButtonStyle(isBusy)}
      >
        {isBusy ? 'Redirecting to secure payment…' : 'Continue to Secure Payment'}
      </button>
    </section>
  );
}

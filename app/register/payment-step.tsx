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
  compactHeadingStyle,
  primaryButtonStyle,
} from './styles';
import {
  getPlanAmountCad,
  type PlanCode,
  type RegistrationFlowState,
} from './types';
import SubscriptionCheckoutSummary from '@/components/subscription/subscription-checkout-summary';
import type { SubscriptionRole } from '@/components/subscription/types';

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        gap: '12px',
        padding: '6px 0',
        fontSize: '13px',
      }}
    >
      <span style={{ color: '#6b7280', fontWeight: 600 }}>{label}</span>
      <span style={{ color: '#111827', fontWeight: 700, textAlign: 'right' }}>{value}</span>
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
    <section style={{ ...cardStyle, maxWidth: '420px', margin: '0 auto' }}>
      <h2 style={compactHeadingStyle}>Opening dashboard…</h2>
      {errorMessage && (
        <div role="alert" style={alertErrorStyle}>
          {errorMessage}
        </div>
      )}
      {(isPending || !errorMessage) && (
        <div role="status" style={alertInfoStyle}>
          Please wait.
        </div>
      )}
    </section>
  );
}

export function PaidPlanCheckout({
  data,
  planCode,
  subscriptionRole = null,
}: {
  data: RegisterTenantResponse;
  planCode: PlanCode;
  subscriptionRole?: SubscriptionRole | null;
}) {
  const [flowState, setFlowState] =
    useState<RegistrationFlowState>('paymentRequired');
  const [errorMessage, setErrorMessage] = useState('');
  const [isPending, setIsPending] = useState(false);

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
    <section style={{ ...cardStyle, maxWidth: '420px', margin: '0 auto' }}>
      <h2 style={compactHeadingStyle}>Payment</h2>

      <SubscriptionCheckoutSummary subscriptionType={subscriptionRole} planCode={planCode} />

      <div style={{ marginBottom: '14px' }}>
        <SummaryRow label="Amount" value={`CAD ${amountDue}`} />
      </div>

      {flowState === 'error' && errorMessage && (
        <div role="alert" style={alertErrorStyle}>
          {errorMessage}
        </div>
      )}

      {isBusy && (
        <div role="status" style={{ ...alertInfoStyle, marginBottom: '12px' }}>
          Redirecting…
        </div>
      )}

      <button
        type="button"
        onClick={() => void handleContinueToPayment()}
        disabled={isBusy}
        style={primaryButtonStyle(isBusy)}
      >
        {isBusy ? 'Redirecting…' : 'Pay with Stripe'}
      </button>
    </section>
  );
}

'use client';

import { useEffect, useRef, useState } from 'react';
import UstrixLogo from '@/components/brand/ustrix-logo';
import {
  completePaidRegistration,
  type PaymentSuccessState,
} from '../payment-api';
import {
  alertErrorStyle,
  alertInfoStyle,
  cardStyle,
  pageStyle,
} from '@/app/register/styles';

const initialState: PaymentSuccessState = { status: 'idle' };

function readSessionIdFromUrl(): string {
  if (typeof window === 'undefined') {
    return '';
  }

  return new URLSearchParams(window.location.search).get('session_id')?.trim() ?? '';
}

export default function PaymentSuccessClient() {
  const startedRef = useRef(false);
  const [sessionId, setSessionId] = useState('');
  const [state, setState] = useState<PaymentSuccessState>(initialState);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    setSessionId(readSessionIdFromUrl());
  }, []);

  useEffect(() => {
    if (startedRef.current || !sessionId) {
      return;
    }

    startedRef.current = true;
    setIsPending(true);

    void completePaidRegistration(sessionId).then((result) => {
      setState(result);
      setIsPending(false);

      if (result.status === 'success') {
        window.location.href = result.nextUrl;
      }
    });
  }, [sessionId]);

  if (!sessionId) {
    return (
      <main style={pageStyle}>
        <section style={{ ...cardStyle, maxWidth: '560px', margin: '0 auto' }}>
          <h1 style={{ margin: '0 0 12px 0', color: '#111827', textAlign: 'center' }}>
            Payment session not found
          </h1>
          <p style={{ margin: 0, color: '#64748b', lineHeight: 1.6, textAlign: 'center' }}>
            No Stripe checkout session was provided. Return to registration to
            start again.
          </p>
        </section>
      </main>
    );
  }

  const loadingLabel = isPending
    ? state.status === 'idle'
      ? 'Verifying payment…'
      : 'Activating subscription…'
    : state.status === 'success'
      ? 'Preparing your dashboard…'
      : 'Verifying payment…';

  return (
    <main style={pageStyle}>
      <section style={{ ...cardStyle, maxWidth: '560px', margin: '0 auto' }}>
        <UstrixLogo wrapperStyle={{ marginBottom: '20px' }} />

        <h1
          style={{
            margin: '0 0 12px 0',
            fontSize: '26px',
            color: '#111827',
            textAlign: 'center',
          }}
        >
          Payment received
        </h1>

        {state.status === 'error' ? (
          <div role="alert" style={alertErrorStyle}>
            {state.message}
          </div>
        ) : (
          <div role="status" style={alertInfoStyle}>
            {loadingLabel}
          </div>
        )}

        {state.status === 'error' && (
          <p
            style={{
              margin: '16px 0 0 0',
              fontSize: '14px',
              color: '#64748b',
              lineHeight: 1.6,
              textAlign: 'center',
            }}
          >
            If payment was completed, contact support with your tenant details.
            Otherwise, return to registration to try again.
          </p>
        )}
      </section>
    </main>
  );
}

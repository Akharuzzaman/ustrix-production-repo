'use client';

import { useActionState, useEffect, useRef } from 'react';
import UstrixLogo from '@/components/brand/ustrix-logo';
import {
  completePaidRegistrationAction,
  type PaymentSuccessFormState,
} from '../actions';
import {
  alertErrorStyle,
  alertInfoStyle,
  cardStyle,
  pageStyle,
} from '@/app/register/styles';

const initialState: PaymentSuccessFormState = { status: 'idle' };

type PaymentSuccessClientProps = {
  sessionId: string;
};

export default function PaymentSuccessClient({
  sessionId,
}: PaymentSuccessClientProps) {
  const startedRef = useRef(false);
  const [state, formAction, isPending] = useActionState(
    completePaidRegistrationAction,
    initialState
  );

  useEffect(() => {
    if (startedRef.current || !sessionId) {
      return;
    }

    startedRef.current = true;

    const formData = new FormData();
    formData.set('sessionId', sessionId);
    formAction(formData);
  }, [sessionId, formAction]);

  useEffect(() => {
    if (state.status === 'success') {
      window.location.href = state.nextUrl;
    }
  }, [state]);

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

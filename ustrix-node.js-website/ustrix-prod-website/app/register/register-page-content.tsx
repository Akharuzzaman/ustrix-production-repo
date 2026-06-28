'use client';

import { useEffect, useState } from 'react';
import BrandHeader from './brand-header';
import PaymentCancelledNotice from './payment-cancelled-notice';
import RegisterForm from './register-form';
import { pageStyle } from './styles';

export default function RegisterPageContent() {
  const [paymentCancelled, setPaymentCancelled] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setPaymentCancelled(params.get('payment') === 'cancelled');
  }, []);

  return (
    <main style={pageStyle}>
      <div style={{ maxWidth: '960px', margin: '0 auto' }}>
        <BrandHeader />
        {paymentCancelled && <PaymentCancelledNotice />}
        <h1
          style={{
            margin: '0 0 16px 0',
            fontSize: 'clamp(22px, 3vw, 26px)',
            color: '#111827',
            fontWeight: 700,
            textAlign: 'center',
          }}
        >
          Subscription
        </h1>
        <RegisterForm />
      </div>
    </main>
  );
}

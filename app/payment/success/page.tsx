import type { Metadata } from 'next';
import PaymentSuccessClient from './payment-success-client';

export const metadata: Metadata = {
  title: 'Payment Success | USTRIX',
  description: 'Complete your USTRIX subscription after Stripe payment.',
};

type PaymentSuccessPageProps = {
  searchParams: Promise<{ session_id?: string }>;
};

export default async function PaymentSuccessPage({
  searchParams,
}: PaymentSuccessPageProps) {
  const params = await searchParams;
  const sessionId = params.session_id?.trim() ?? '';

  if (!sessionId) {
    return (
      <main
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 20px',
          fontFamily: 'Arial, Helvetica, sans-serif',
          background: '#f5f7fb',
        }}
      >
        <section
          style={{
            maxWidth: '560px',
            background: '#ffffff',
            border: '1px solid #e5e7eb',
            borderRadius: '18px',
            padding: '36px',
            textAlign: 'center',
          }}
        >
          <h1 style={{ margin: '0 0 12px 0', color: '#111827' }}>
            Payment session not found
          </h1>
          <p style={{ margin: 0, color: '#64748b', lineHeight: 1.6 }}>
            No Stripe checkout session was provided. Return to registration to
            start again.
          </p>
        </section>
      </main>
    );
  }

  return <PaymentSuccessClient sessionId={sessionId} />;
}

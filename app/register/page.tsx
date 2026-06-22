import type { Metadata } from 'next';
import BrandHeader from './brand-header';
import PaymentCancelledNotice from './payment-cancelled-notice';
import RegisterForm from './register-form';
import { pageStyle } from './styles';

export const metadata: Metadata = {
  title: 'Start Subscription | USTRIX',
  description:
    'Choose a USTRIX plan, create your admin account, and access your dashboard.',
};

type RegisterPageProps = {
  searchParams: Promise<{ payment?: string }>;
};

export default async function RegisterPage({ searchParams }: RegisterPageProps) {
  const params = await searchParams;
  const paymentCancelled = params.payment === 'cancelled';

  return (
    <main style={pageStyle}>
      <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
        <BrandHeader />
        {paymentCancelled && <PaymentCancelledNotice />}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <h1
            style={{
              margin: '0 0 10px 0',
              fontSize: 'clamp(26px, 4vw, 32px)',
              color: '#111827',
              fontWeight: 700,
            }}
          >
            Start your USTRIX subscription
          </h1>
          <p
            style={{
              margin: 0,
              fontSize: '16px',
              color: '#4b5563',
              lineHeight: 1.6,
              maxWidth: '640px',
              marginInline: 'auto',
            }}
          >
            Choose a plan, create your admin account, and continue to your
            secure USTRIX dashboard.
          </p>
        </div>
        <RegisterForm />
      </div>
    </main>
  );
}

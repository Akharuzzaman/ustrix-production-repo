import type { Metadata } from 'next';
import PaymentSuccessClient from './payment-success-client';

export const metadata: Metadata = {
  title: 'Payment Success | USTRIX',
  description: 'Complete your USTRIX subscription after Stripe payment.',
};

export default function PaymentSuccessPage() {
  return <PaymentSuccessClient />;
}

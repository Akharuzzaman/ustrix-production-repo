import type { Metadata } from 'next';
import RegisterPageContent from './register-page-content';

export const metadata: Metadata = {
  title: 'Start Subscription | USTRIX',
  description:
    'Choose a USTRIX plan, create your admin account, and access your dashboard.',
};

export default function RegisterPage() {
  return <RegisterPageContent />;
}

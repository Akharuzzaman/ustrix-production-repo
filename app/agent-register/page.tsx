import type { Metadata } from 'next';
import UstrixLogo from '@/components/brand/ustrix-logo';
import { pageStyle } from '@/app/register/styles';
import AgentRegisterForm from './agent-register-form';

export const metadata: Metadata = {
  title: 'Register as Agent | USTRIX',
  description:
    'Confidential agent onboarding for USTRIX procurement lead management.',
};

export default function AgentRegisterPage() {
  return (
    <main style={pageStyle}>
      <header
        style={{
          maxWidth: '820px',
          margin: '0 auto 32px auto',
          textAlign: 'center',
        }}
      >
        <UstrixLogo priority wrapperStyle={{ marginBottom: '16px' }} />
        <p
          style={{
            margin: '0 0 24px 0',
            fontSize: 'clamp(13px, 2.5vw, 14px)',
            color: '#4b5563',
            lineHeight: 1.6,
          }}
        >
          Procurement • Selling • Lead Generation • Payments
        </p>
        <h1
          style={{
            margin: '0 0 12px 0',
            fontSize: 'clamp(28px, 4vw, 36px)',
            lineHeight: 1.2,
            color: '#111827',
            fontWeight: 700,
          }}
        >
          Register as an Agent
        </h1>
        <p
          style={{
            margin: '0 0 16px 0',
            fontSize: '16px',
            lineHeight: 1.7,
            color: '#374151',
            maxWidth: '720px',
            marginInline: 'auto',
          }}
        >
          Submit and manage procurement leads while keeping your identity
          confidential from buyers and sellers.
        </p>
        <p
          style={{
            margin: 0,
            fontSize: '14px',
            lineHeight: 1.6,
            color: '#64748b',
            maxWidth: '720px',
            marginInline: 'auto',
          }}
        >
          Agent identity and commission details are visible only to USTRIX
          platform administration. They are not disclosed to buyers or sellers.
        </p>
      </header>

      <AgentRegisterForm />
    </main>
  );
}

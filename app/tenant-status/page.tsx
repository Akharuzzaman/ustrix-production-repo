import type { Metadata } from 'next';
import UstrixLogo from '@/components/brand/ustrix-logo';

type TenantResponse = {
  status: string;
  tenant: {
    tenantId: number;
    tenantCode: string;
    tenantName: string;
    statusCode: string;
    planCode: string;
  };
  adminUser: {
    userId: number;
    tenantId: number;
    tenantCode: string;
    email: string;
    fullName: string;
    roleCode: string;
    statusCode: string;
  };
  subscription: {
    subscriptionId: number;
    tenantId: number;
    tenantCode: string;
    userId: number;
    planCode: string;
    planName: string;
    billingCycle: string;
    amountCad: number;
    statusCode: string;
    autoRenew: number;
  };
};

async function getTenantData(): Promise<TenantResponse> {
  const response = await fetch(
    'http://192.168.57.22:3001/api/tenants/USTRIX-DEMO',
    { cache: 'no-store' }
  );

  if (!response.ok) {
    throw new Error('Failed to load tenant data from USTRIX API.');
  }

  return response.json();
}

export const metadata: Metadata = {
  title: 'Tenant Status',
  description: 'USTRIX tenant integration status.',
};

export default async function TenantStatusPage() {
  const data = await getTenantData();

  return (
    <main
      style={{
        padding: '48px 24px',
        fontFamily: 'Arial, sans-serif',
        background: '#f5f7fb',
        minHeight: '100vh',
      }}
    >
      <section
        style={{
          maxWidth: '960px',
          margin: '0 auto',
          background: '#ffffff',
          border: '1px solid #e5e7eb',
          borderRadius: '18px',
          padding: '36px',
          boxShadow: '0 12px 30px rgba(0,0,0,0.08)',
        }}
      >
        <div style={{ marginBottom: '24px' }}>
          <UstrixLogo width={200} wrapperStyle={{ marginBottom: '8px' }} />
          <p style={{ color: '#6b7280', margin: 0, fontSize: '14px' }}>
            Development Integration
          </p>
        </div>

        <h1 style={{ fontSize: '36px', margin: '0 0 12px 0', color: '#111827' }}>
          {data.tenant.tenantName}
        </h1>

        <p style={{ fontSize: '18px', color: '#374151', marginBottom: '32px' }}>
          Tenant Code: <strong>{data.tenant.tenantCode}</strong>
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
            gap: '16px',
            marginBottom: '32px',
          }}
        >
          <div
            style={{
              padding: '20px',
              background: '#f9fafb',
              borderRadius: '14px',
              border: '1px solid #e5e7eb',
            }}
          >
            <p style={{ color: '#6b7280', margin: '0 0 8px 0' }}>Tenant Status</p>
            <h2 style={{ margin: 0, color: '#111827' }}>{data.tenant.statusCode}</h2>
          </div>

          <div
            style={{
              padding: '20px',
              background: '#f9fafb',
              borderRadius: '14px',
              border: '1px solid #e5e7eb',
            }}
          >
            <p style={{ color: '#6b7280', margin: '0 0 8px 0' }}>Current Plan</p>
            <h2 style={{ margin: 0, color: '#111827' }}>{data.subscription.planName}</h2>
          </div>

          <div
            style={{
              padding: '20px',
              background: '#f9fafb',
              borderRadius: '14px',
              border: '1px solid #e5e7eb',
            }}
          >
            <p style={{ color: '#6b7280', margin: '0 0 8px 0' }}>Subscription</p>
            <h2 style={{ margin: 0, color: '#111827' }}>{data.subscription.statusCode}</h2>
          </div>
        </div>

        <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '24px' }}>
          <h3 style={{ marginTop: 0 }}>Tenant Admin</h3>
          <p>
            <strong>Name:</strong> {data.adminUser.fullName}
          </p>
          <p>
            <strong>Email:</strong> {data.adminUser.email}
          </p>
          <p>
            <strong>Role:</strong> {data.adminUser.roleCode}
          </p>
        </div>

        <div
          style={{
            borderTop: '1px solid #e5e7eb',
            paddingTop: '24px',
            marginTop: '24px',
          }}
        >
          <h3 style={{ marginTop: 0 }}>Connection Chain</h3>
          <p style={{ color: '#374151' }}>
            Browser → webvm Next.js → appvm Node.js API → dbvm Oracle DB → OK
          </p>
        </div>
      </section>
    </main>
  );
}

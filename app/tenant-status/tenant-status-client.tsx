'use client';

import { useEffect, useState } from 'react';
import UstrixLogo from '@/components/brand/ustrix-logo';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://192.168.57.22:3001';

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

export default function TenantStatusClient() {
  const [data, setData] = useState<TenantResponse | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/tenants/USTRIX-DEMO`
        );

        if (!response.ok) {
          throw new Error('Failed to load tenant data from USTRIX API.');
        }

        setData((await response.json()) as TenantResponse);
      } catch (loadError) {
        setError(
          loadError instanceof Error
            ? loadError.message
            : 'Failed to load tenant data from USTRIX API.'
        );
      }
    }

    void load();
  }, []);

  if (error) {
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
          }}
        >
          <p style={{ color: '#b5121b', margin: 0 }}>{error}</p>
        </section>
      </main>
    );
  }

  if (!data) {
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
          }}
        >
          <p style={{ color: '#6b7280', margin: 0 }}>Loading tenant status…</p>
        </section>
      </main>
    );
  }

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

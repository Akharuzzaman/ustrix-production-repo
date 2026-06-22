import type { Metadata } from 'next';
import TenantStatusClient from './tenant-status-client';

export const metadata: Metadata = {
  title: 'Tenant Status',
  description: 'USTRIX tenant integration status.',
};

export default function TenantStatusPage() {
  return <TenantStatusClient />;
}

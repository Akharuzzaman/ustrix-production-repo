import UstrixLogo from '@/components/brand/ustrix-logo';
import type { CSSProperties } from 'react';

const wrapStyle: CSSProperties = {
  textAlign: 'center',
  marginBottom: '28px',
};

export default function BrandHeader() {
  return (
    <header style={wrapStyle}>
      <UstrixLogo priority wrapperStyle={{ marginBottom: '12px' }} />
      <p
        style={{
          margin: 0,
          fontSize: '14px',
          color: '#4b5563',
          lineHeight: 1.5,
        }}
      >
        Procurement • Selling • Lead Generation • Payments
      </p>
    </header>
  );
}

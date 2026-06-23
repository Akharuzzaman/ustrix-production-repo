import UstrixLogo from '@/components/brand/ustrix-logo';
import type { CSSProperties } from 'react';

const wrapStyle: CSSProperties = {
  textAlign: 'center',
  marginBottom: '16px',
};

export default function BrandHeader() {
  return (
    <header style={wrapStyle}>
      <UstrixLogo priority wrapperStyle={{ marginBottom: '8px' }} />
    </header>
  );
}

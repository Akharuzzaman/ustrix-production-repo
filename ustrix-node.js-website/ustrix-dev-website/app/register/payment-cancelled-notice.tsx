'use client';

import { alertInfoStyle } from './styles';

export default function PaymentCancelledNotice() {
  return (
    <div role="status" style={{ ...alertInfoStyle, marginBottom: '24px' }}>
      Payment was cancelled. You can restart the subscription process.
    </div>
  );
}

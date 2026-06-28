import type { CSSProperties } from 'react';

export const pageStyle: CSSProperties = {
  padding: '20px 16px 32px',
  fontFamily: 'Arial, Helvetica, sans-serif',
  background: '#f5f7fb',
  minHeight: '100vh',
};

export const layoutGridStyle: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: '16px',
  alignItems: 'start',
};

export const cardStyle: CSSProperties = {
  background: '#ffffff',
  border: '1px solid #e5e7eb',
  borderRadius: '12px',
  padding: '16px',
  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)',
};

export const formCardStyle: CSSProperties = {
  ...cardStyle,
};

export const checkoutPanelStyle: CSSProperties = {
  ...cardStyle,
  padding: '20px 18px',
};

export const checkoutSubmitButtonStyle = (disabled: boolean): CSSProperties => ({
  width: '100%',
  marginTop: '4px',
  padding: '13px 16px',
  fontSize: '15px',
  fontWeight: 600,
  letterSpacing: '0.01em',
  color: '#ffffff',
  background: disabled ? '#94a3b8' : '#0f172a',
  border: 'none',
  borderRadius: '10px',
  cursor: disabled ? 'not-allowed' : 'pointer',
  boxShadow: disabled ? 'none' : '0 8px 20px rgba(15, 23, 42, 0.18)',
});

export const sectionHintStyle: CSSProperties = {
  margin: '0 0 12px 0',
  fontSize: '13px',
  color: '#6b7280',
  lineHeight: 1.45,
};

export const labelStyle: CSSProperties = {
  display: 'block',
  marginBottom: '4px',
  fontSize: '13px',
  fontWeight: 600,
  color: '#374151',
};

export const inputStyle: CSSProperties = {
  width: '100%',
  padding: '9px 11px',
  fontSize: '14px',
  border: '1px solid #d1d5db',
  borderRadius: '8px',
  background: '#ffffff',
  color: '#111827',
  boxSizing: 'border-box',
};

export const fieldStyle: CSSProperties = {
  marginBottom: '10px',
};

export const fieldErrorStyle: CSSProperties = {
  marginTop: '4px',
  fontSize: '12px',
  color: '#b91c1c',
};

export const alertErrorStyle: CSSProperties = {
  marginBottom: '12px',
  padding: '10px 12px',
  background: '#fef2f2',
  border: '1px solid #fecaca',
  borderRadius: '8px',
  color: '#b91c1c',
  fontSize: '13px',
};

export const alertInfoStyle: CSSProperties = {
  marginBottom: '12px',
  padding: '10px 12px',
  background: '#eff6ff',
  border: '1px solid #bfdbfe',
  borderRadius: '8px',
  color: '#1d4ed8',
  fontSize: '13px',
};

export const sectionTitleStyle: CSSProperties = {
  margin: '0 0 8px 0',
  fontSize: '15px',
  fontWeight: 700,
  color: '#111827',
};

export const sectionDividerStyle: CSSProperties = {
  border: 'none',
  borderTop: '1px solid #e5e7eb',
  margin: '14px 0',
};

export const agentNoteStyle: CSSProperties = {
  marginTop: '12px',
  padding: '12px',
  background: '#f9fafb',
  border: '1px solid #e5e7eb',
  borderRadius: '8px',
};

export const secondaryLinkStyle: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '10px 14px',
  fontSize: '14px',
  fontWeight: 600,
  color: '#111827',
  background: '#ffffff',
  border: '1px solid #d1d5db',
  borderRadius: '8px',
  textDecoration: 'none',
};

export function getChoiceCardStyle(selected: boolean): CSSProperties {
  return {
    width: '100%',
    textAlign: 'left',
    padding: '10px 12px',
    borderRadius: '8px',
    border: selected ? '2px solid #111827' : '1px solid #e5e7eb',
    background: selected ? '#f9fafb' : '#ffffff',
    cursor: 'pointer',
  };
}

export function getInputStyle(hasError: boolean): CSSProperties {
  return {
    ...inputStyle,
    borderColor: hasError ? '#fca5a5' : '#d1d5db',
  };
}

export const primaryButtonStyle = (disabled: boolean): CSSProperties => ({
  width: '100%',
  padding: '11px 14px',
  fontSize: '14px',
  fontWeight: 600,
  color: '#ffffff',
  background: disabled ? '#6b7280' : '#111827',
  border: 'none',
  borderRadius: '8px',
  cursor: disabled ? 'not-allowed' : 'pointer',
});

export const compactHeadingStyle: CSSProperties = {
  margin: '0 0 10px 0',
  fontSize: '15px',
  fontWeight: 700,
  color: '#111827',
};

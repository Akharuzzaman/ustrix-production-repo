import type { CSSProperties } from 'react';

export const pageStyle: CSSProperties = {
  padding: '32px 20px 48px',
  fontFamily: 'Arial, Helvetica, sans-serif',
  background: '#f5f7fb',
  minHeight: '100vh',
};

export const layoutGridStyle: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gap: '24px',
  alignItems: 'start',
};

export const cardStyle: CSSProperties = {
  background: '#ffffff',
  border: '1px solid #e5e7eb',
  borderRadius: '16px',
  padding: '24px',
  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.05)',
};

export const formCardStyle: CSSProperties = {
  ...cardStyle,
};

export const sectionHintStyle: CSSProperties = {
  margin: '0 0 18px 0',
  fontSize: '14px',
  color: '#6b7280',
  lineHeight: 1.5,
};

export const labelStyle: CSSProperties = {
  display: 'block',
  marginBottom: '6px',
  fontSize: '14px',
  fontWeight: 600,
  color: '#374151',
};

export const inputStyle: CSSProperties = {
  width: '100%',
  padding: '11px 13px',
  fontSize: '15px',
  border: '1px solid #d1d5db',
  borderRadius: '10px',
  background: '#ffffff',
  color: '#111827',
  boxSizing: 'border-box',
};

export const fieldStyle: CSSProperties = {
  marginBottom: '14px',
};

export const fieldErrorStyle: CSSProperties = {
  marginTop: '6px',
  fontSize: '13px',
  color: '#b91c1c',
};

export const alertErrorStyle: CSSProperties = {
  marginBottom: '16px',
  padding: '12px 14px',
  background: '#fef2f2',
  border: '1px solid #fecaca',
  borderRadius: '10px',
  color: '#b91c1c',
  fontSize: '14px',
};

export const alertInfoStyle: CSSProperties = {
  marginBottom: '16px',
  padding: '12px 14px',
  background: '#eff6ff',
  border: '1px solid #bfdbfe',
  borderRadius: '10px',
  color: '#1d4ed8',
  fontSize: '14px',
};

export const sectionTitleStyle: CSSProperties = {
  margin: '0 0 6px 0',
  fontSize: '18px',
  fontWeight: 700,
  color: '#111827',
};

export const sectionDividerStyle: CSSProperties = {
  border: 'none',
  borderTop: '1px solid #e5e7eb',
  margin: '24px 0',
};

export const agentNoteStyle: CSSProperties = {
  marginTop: '20px',
  padding: '16px',
  background: '#f9fafb',
  border: '1px solid #e5e7eb',
  borderRadius: '12px',
};

export const secondaryLinkStyle: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '12px 18px',
  fontSize: '15px',
  fontWeight: 600,
  color: '#111827',
  background: '#ffffff',
  border: '1px solid #d1d5db',
  borderRadius: '10px',
  textDecoration: 'none',
};

export function getChoiceCardStyle(selected: boolean): CSSProperties {
  return {
    width: '100%',
    textAlign: 'left',
    padding: '16px',
    borderRadius: '12px',
    border: selected ? '2px solid #111827' : '1px solid #e5e7eb',
    background: selected ? '#f9fafb' : '#ffffff',
    cursor: 'pointer',
  };
}

export const valuePropStyle: CSSProperties = {
  margin: '18px 0 0 0',
  paddingLeft: '18px',
  color: '#4b5563',
  fontSize: '13px',
  lineHeight: 1.7,
};

export function getInputStyle(hasError: boolean): CSSProperties {
  return {
    ...inputStyle,
    borderColor: hasError ? '#fca5a5' : '#d1d5db',
  };
}

export const primaryButtonStyle = (disabled: boolean): CSSProperties => ({
  width: '100%',
  padding: '13px 18px',
  fontSize: '16px',
  fontWeight: 600,
  color: '#ffffff',
  background: disabled ? '#6b7280' : '#111827',
  border: 'none',
  borderRadius: '10px',
  cursor: disabled ? 'not-allowed' : 'pointer',
});

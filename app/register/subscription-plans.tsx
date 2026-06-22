'use client';

import type { CSSProperties } from 'react';
import { SUBSCRIPTION_PLANS, type PlanCode } from './types';

type SubscriptionPlansProps = {
  selectedPlan: PlanCode;
  onSelect: (planCode: PlanCode) => void;
  disabled?: boolean;
  compact?: boolean;
};

function getCardStyle(selected: boolean, recommended: boolean): CSSProperties {
  return {
    position: 'relative',
    width: '100%',
    padding: '14px 16px',
    borderRadius: '12px',
    border: selected ? '2px solid #111827' : '1px solid #e5e7eb',
    background: selected ? '#f9fafb' : '#ffffff',
    cursor: 'pointer',
    textAlign: 'left',
    boxShadow:
      recommended && !selected
        ? '0 2px 10px rgba(17, 24, 39, 0.06)'
        : 'none',
  };
}

export default function SubscriptionPlans({
  selectedPlan,
  onSelect,
  disabled = false,
  compact = false,
}: SubscriptionPlansProps) {
  return (
    <div
      style={{
        display: 'grid',
        gap: '10px',
        gridTemplateColumns: compact ? '1fr' : 'repeat(2, minmax(0, 1fr))',
      }}
    >
      {SUBSCRIPTION_PLANS.map((plan) => {
        const selected = selectedPlan === plan.planCode;

        return (
          <button
            key={plan.planCode}
            type="button"
            disabled={disabled}
            onClick={() => onSelect(plan.planCode)}
            style={getCardStyle(selected, Boolean(plan.recommended))}
          >
            {plan.recommended && (
              <span
                style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  fontSize: '10px',
                  fontWeight: 700,
                  color: '#ffffff',
                  background: '#111827',
                  padding: '3px 7px',
                  borderRadius: '999px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                }}
              >
                Recommended
              </span>
            )}

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                gap: '12px',
                paddingRight: plan.recommended ? '72px' : 0,
              }}
            >
              <div>
                <p
                  style={{
                    margin: '0 0 2px 0',
                    fontSize: '12px',
                    fontWeight: 700,
                    color: '#6b7280',
                    letterSpacing: '0.05em',
                  }}
                >
                  {plan.planCode}
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: '16px',
                    fontWeight: 700,
                    color: '#111827',
                  }}
                >
                  {plan.name}
                </p>
              </div>
              <p
                style={{
                  margin: 0,
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#374151',
                  whiteSpace: 'nowrap',
                }}
              >
                {plan.priceLabel}
              </p>
            </div>
            {!compact && (
              <p
                style={{
                  margin: '8px 0 0 0',
                  fontSize: '13px',
                  lineHeight: 1.4,
                  color: '#6b7280',
                }}
              >
                {plan.description}
              </p>
            )}
          </button>
        );
      })}
    </div>
  );
}

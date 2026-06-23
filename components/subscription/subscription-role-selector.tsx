'use client';

import { SUBSCRIPTION_ROLE_OPTIONS, SUBSCRIBE_AS_HEADING, SUBSCRIBE_AS_HELPER } from './constants';
import type { SubscriptionRole } from './types';
import styles from './subscription-role-selector.module.css';

type SubscriptionRoleSelectorProps = {
  selectedRole: SubscriptionRole | null;
  onSelect: (role: SubscriptionRole) => void;
  disabled?: boolean;
  includeAgent?: boolean;
  heading?: string;
  helper?: string;
  compact?: boolean;
};

export default function SubscriptionRoleSelector({
  selectedRole,
  onSelect,
  disabled = false,
  includeAgent = true,
  heading = SUBSCRIBE_AS_HEADING,
  helper = SUBSCRIBE_AS_HELPER,
  compact = false,
}: SubscriptionRoleSelectorProps) {
  const options = includeAgent
    ? SUBSCRIPTION_ROLE_OPTIONS
    : SUBSCRIPTION_ROLE_OPTIONS.filter((option) => option.value !== 'agent');

  return (
    <section className={`${styles.section} ${compact ? styles.compact : ''}`} aria-labelledby="subscription-role-heading">
      <h3 id="subscription-role-heading" className={styles.heading}>
        {heading}
      </h3>
      {helper ? <p className={styles.helper}>{helper}</p> : null}

      <div className={styles.grid} role="radiogroup" aria-labelledby="subscription-role-heading">
        {options.map((option) => {
          const selected = selectedRole === option.value;

          return (
            <button
              key={option.value}
              type="button"
              role="radio"
              aria-checked={selected}
              disabled={disabled}
              onClick={() => onSelect(option.value)}
              className={`${styles.card} ${selected ? styles.cardSelected : ''}`}
              style={
                selected
                  ? {
                      borderColor: option.accentColor,
                      background: `linear-gradient(180deg, #ffffff 0%, ${option.accentColor}12 100%)`,
                    }
                  : undefined
              }
            >
              <span className={styles.cardTitle}>{option.title}</span>
              {option.description ? (
                <span className={styles.cardDescription}>{option.description}</span>
              ) : null}
            </button>
          );
        })}
      </div>
    </section>
  );
}

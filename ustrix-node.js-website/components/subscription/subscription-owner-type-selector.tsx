'use client';

import {
  OWNER_TYPE_OPTIONS,
  SUBSCRIPTION_SPECIFY_HEADING,
  SUBSCRIPTION_SPECIFY_HELPER,
} from './constants';
import type { OwnerType } from './types';
import styles from './subscription-owner-type-selector.module.css';

type SubscriptionOwnerTypeSelectorProps = {
  selectedOwnerType: OwnerType | null;
  onSelect: (ownerType: OwnerType) => void;
  disabled?: boolean;
  idPrefix?: string;
  compact?: boolean;
};

export default function SubscriptionOwnerTypeSelector({
  selectedOwnerType,
  onSelect,
  disabled = false,
  idPrefix = 'owner-type',
  compact = false,
}: SubscriptionOwnerTypeSelectorProps) {
  return (
    <section
      className={`${styles.section} ${disabled ? styles.sectionDisabled : ''} ${compact ? styles.compact : ''}`}
      aria-labelledby={`${idPrefix}-heading`}
    >
      <h3 id={`${idPrefix}-heading`} className={styles.heading}>
        {SUBSCRIPTION_SPECIFY_HEADING}
      </h3>
      {SUBSCRIPTION_SPECIFY_HELPER ? (
        <p className={styles.helper}>{SUBSCRIPTION_SPECIFY_HELPER}</p>
      ) : null}

      <div className={styles.grid} role="radiogroup" aria-labelledby={`${idPrefix}-heading`}>
        {OWNER_TYPE_OPTIONS.map((option) => {
          const selected = selectedOwnerType === option.value;

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

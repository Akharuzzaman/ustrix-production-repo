import type { PlanCode } from '@/app/register/types';
import { getPlanByCode } from '@/app/register/types';
import {
  getSubscriptionTypeLabel,
  SUBSCRIPTION_PLAN_LABEL,
  SUBSCRIPTION_TYPE_LABEL,
} from './constants';
import type { SubscriptionRole } from './types';
import styles from './subscription-checkout-summary.module.css';

type SubscriptionCheckoutSummaryProps = {
  subscriptionType: SubscriptionRole | null;
  planCode: PlanCode;
};

export default function SubscriptionCheckoutSummary({
  subscriptionType,
  planCode,
}: SubscriptionCheckoutSummaryProps) {
  const plan = getPlanByCode(planCode);

  return (
    <div className={styles.summary} aria-label="Subscription summary">
      <div className={styles.row}>
        <span className={styles.label}>{SUBSCRIPTION_TYPE_LABEL}</span>
        <span className={styles.value}>{getSubscriptionTypeLabel(subscriptionType)}</span>
      </div>
      <div className={styles.row}>
        <span className={styles.label}>{SUBSCRIPTION_PLAN_LABEL}</span>
        <span className={styles.value}>{plan.name}</span>
      </div>
    </div>
  );
}

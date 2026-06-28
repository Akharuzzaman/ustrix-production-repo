import { SUBSCRIPTION_FLOW_STEPS } from './constants';
import styles from './subscription-flow-steps.module.css';

type SubscriptionFlowStepsProps = {
  activeStep?: 1 | 2 | 3 | 4;
  compact?: boolean;
};

export default function SubscriptionFlowSteps({
  activeStep = 1,
  compact = false,
}: SubscriptionFlowStepsProps) {
  return (
    <ol
      className={`${styles.steps} ${compact ? styles.compact : ''}`}
      aria-label="Subscription registration steps"
    >
      {SUBSCRIPTION_FLOW_STEPS.map((label, index) => {
        const stepNumber = (index + 1) as 1 | 2 | 3 | 4;
        const className =
          stepNumber === activeStep
            ? `${styles.step} ${styles.stepActive}`
            : stepNumber < activeStep
              ? `${styles.step} ${styles.stepComplete}`
              : styles.step;

        return (
          <li key={label} className={className}>
            {label}
          </li>
        );
      })}
    </ol>
  );
}

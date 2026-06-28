'use client';

import Link from 'next/link';
import { useState } from 'react';
import { buildRegisterHref } from '@/components/subscription/build-register-href';
import {
  CHOOSE_PLAN_HEADING,
  OWNER_TYPE_REQUIRED_MESSAGE,
  ROLE_REQUIRED_MESSAGE,
} from '@/components/subscription/constants';
import SubscriptionFlowSteps from '@/components/subscription/subscription-flow-steps';
import SubscriptionOwnerTypeSelector from '@/components/subscription/subscription-owner-type-selector';
import SubscriptionRoleSelector from '@/components/subscription/subscription-role-selector';
import { getPlanCodesForOwnerType } from '@/components/subscription/plan-matrix';
import type { OwnerType, SubscriptionRole } from '@/components/subscription/types';
import { PLANS, SUBSCRIPTION_ROLES } from './data';
import { useLanding } from './landing-provider';
import styles from './landing.module.css';
import {
  formatPlanPrice,
  PLAN_PRICES,
  type BillingCycle,
} from './pricing';

type SubscriptionPlansSectionProps = {
  billing: BillingCycle;
};

export default function SubscriptionPlansSection({
  billing,
}: SubscriptionPlansSectionProps) {
  const { t, currency } = useLanding();
  const [selectedRole, setSelectedRole] = useState<SubscriptionRole | null>(null);
  const [ownerType, setOwnerType] = useState<OwnerType | null>(null);

  const canSpecifyOwnerType = Boolean(selectedRole);
  const canChoosePlan = Boolean(selectedRole && ownerType);
  const activeStep: 1 | 2 | 3 | 4 = !selectedRole ? 1 : !ownerType ? 2 : 3;
  const allowedPlanCodes = getPlanCodesForOwnerType(ownerType);
  const visiblePlans = PLANS.filter(
    (plan) => !ownerType || allowedPlanCodes.includes(plan.code)
  );

  return (
    <>
      <SubscriptionFlowSteps activeStep={activeStep} />

      <div className={styles.subscriptionSubscribeSection}>
        <SubscriptionRoleSelector
          selectedRole={selectedRole}
          onSelect={setSelectedRole}
        />
      </div>

      <div className={styles.subscriptionOwnerSection}>
        <SubscriptionOwnerTypeSelector
          selectedOwnerType={ownerType}
          onSelect={setOwnerType}
          disabled={!canSpecifyOwnerType}
          idPrefix="landing-owner-type"
        />
      </div>

      {!selectedRole && (
        <p className={styles.subscriptionFlowHint}>{t.subscriptionSubscribeHint}</p>
      )}

      {selectedRole && !ownerType && (
        <p className={styles.subscriptionFlowHint}>{OWNER_TYPE_REQUIRED_MESSAGE}</p>
      )}

      <h3 className={styles.choosePlanHeading}>{CHOOSE_PLAN_HEADING}</h3>

      <ul className={`${styles.planGrid} ${!canChoosePlan ? styles.planGridBlocked : ''}`}>
        {visiblePlans.map((plan) => {
          const prices = PLAN_PRICES[currency][plan.code];
          const amount = billing === 'monthly' ? prices.monthly : prices.yearly;

          return (
            <li
              key={plan.code}
              className={`${styles.planCard} ${
                plan.recommended ? styles.planRecommended : ''
              }`}
            >
              {plan.recommended && (
                <span className={styles.badge}>{t.recommended}</span>
              )}
              <h3 className={styles.cardTitle}>{plan.name}</h3>
              <p className={styles.planPrice}>
                {formatPlanPrice(currency, amount, billing)}
              </p>
              <ul className={styles.planFeatures}>
                {plan.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              {canChoosePlan && selectedRole ? (
                <Link
                  href={buildRegisterHref({
                    role: selectedRole,
                    ownerType,
                    plan: plan.query,
                  })}
                  className={styles.btnPrimary}
                >
                  {plan.cta}
                </Link>
              ) : (
                <span className={styles.btnPrimaryDisabled} aria-disabled="true">
                  {plan.cta}
                </span>
              )}
            </li>
          );
        })}
      </ul>

      {!canChoosePlan && (
        <p className={styles.subscriptionFlowHint}>
          {!selectedRole ? ROLE_REQUIRED_MESSAGE : t.subscriptionPlanGateHint}
        </p>
      )}

      <ul className={styles.subscriptionRoleLinks}>
        {SUBSCRIPTION_ROLES.map((role) => (
          <li key={role.id}>
            <Link
              href={buildRegisterHref({ role: role.id, ownerType, plan: 'STARTER' })}
              className={!canChoosePlan ? styles.subscriptionRoleLinkDisabled : undefined}
              aria-disabled={!canChoosePlan}
              onClick={(event) => {
                if (!canChoosePlan) {
                  event.preventDefault();
                }
              }}
            >
              {role.cta}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

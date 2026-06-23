'use client';

import { useEffect, useState, type FormEvent } from 'react';
import SubscriptionCheckoutForm from '@/components/subscription/subscription-checkout-form';
import SubscriptionCheckoutSummary from '@/components/subscription/subscription-checkout-summary';
import { parseSubscriptionSearchParams } from '@/components/subscription/build-register-href';
import {
  CHOOSE_PLAN_HEADING,
  OWNER_TYPE_REQUIRED_MESSAGE,
  ROLE_REQUIRED_MESSAGE,
} from '@/components/subscription/constants';
import { resolvePlanForOwnerType } from '@/components/subscription/plan-matrix';
import SubscriptionOwnerTypeSelector from '@/components/subscription/subscription-owner-type-selector';
import SubscriptionRoleSelector from '@/components/subscription/subscription-role-selector';
import type { OwnerType, SubscriptionRole } from '@/components/subscription/types';
import {
  submitRegistration,
  type RegisterFormState,
} from './register-api';
import { FreeDashboardAccess, PaidPlanCheckout } from './payment-step';
import SubscriptionPlans from './subscription-plans';
import { isPaidPlan, type PlanCode } from './types';
import {
  alertErrorStyle,
  cardStyle,
  checkoutPanelStyle,
  checkoutSubmitButtonStyle,
  compactHeadingStyle,
  fieldErrorStyle,
  layoutGridStyle,
  sectionDividerStyle,
} from './styles';
import {
  hasFieldErrors,
  readCheckoutFormValues,
  validateSubscriptionCheckoutForm,
  type CheckoutFieldErrors,
} from './validation';

const initialRegisterState: RegisterFormState = { status: 'idle' };

export default function RegisterForm() {
  const [state, setState] = useState<RegisterFormState>(initialRegisterState);
  const [isPending, setIsPending] = useState(false);
  const [selectedRole, setSelectedRole] = useState<SubscriptionRole | null>(null);
  const [ownerType, setOwnerType] = useState<OwnerType | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<PlanCode>('STARTER');
  const [fieldErrors, setFieldErrors] = useState<CheckoutFieldErrors>({});
  const [flowError, setFlowError] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const parsed = parseSubscriptionSearchParams(params);

    if (parsed.ownerType) {
      setOwnerType(parsed.ownerType);
    }

    if (parsed.role) {
      setSelectedRole(parsed.role);
    }

    if (parsed.plan) {
      setSelectedPlan(
        resolvePlanForOwnerType(parsed.ownerType, parsed.plan)
      );
    }
  }, []);

  useEffect(() => {
    if (!ownerType) {
      return;
    }
    setSelectedPlan((current) => resolvePlanForOwnerType(ownerType, current));
  }, [ownerType]);

  useEffect(() => {
    if (!ownerType && !selectedRole) {
      return;
    }

    const params = new URLSearchParams(window.location.search);

    if (ownerType) {
      params.set('ownerType', ownerType);
    } else {
      params.delete('ownerType');
    }

    if (selectedRole) {
      params.set('role', selectedRole);
    } else {
      params.delete('role');
    }

    params.set('plan', selectedPlan);

    const nextQuery = params.toString();
    const nextUrl = nextQuery ? `/register?${nextQuery}` : '/register';
    window.history.replaceState(null, '', nextUrl);
  }, [selectedRole, ownerType, selectedPlan]);

  const canSpecifyOwnerType = Boolean(selectedRole);
  const canChoosePlan = Boolean(selectedRole && ownerType);
  const canProceed = canChoosePlan;

  if (state.status === 'success') {
    if (isPaidPlan(selectedPlan)) {
      return (
        <PaidPlanCheckout
          data={state.data}
          planCode={selectedPlan}
          subscriptionRole={selectedRole}
        />
      );
    }

    return <FreeDashboardAccess data={state.data} />;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!selectedRole) {
      setFlowError(ROLE_REQUIRED_MESSAGE);
      return;
    }

    if (!ownerType) {
      setFlowError(OWNER_TYPE_REQUIRED_MESSAGE);
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);

    const errors = validateSubscriptionCheckoutForm(
      ownerType,
      readCheckoutFormValues(formData)
    );

    if (hasFieldErrors(errors)) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    setFlowError(null);
    setIsPending(true);

    try {
      // TODO: connect ownerType and business fields to API once backend fields are confirmed.
      const result = await submitRegistration(formData);
      setState(result);
    } finally {
      setIsPending(false);
    }
  }

  return (
    <div style={layoutGridStyle}>
      <aside style={cardStyle}>
        <SubscriptionRoleSelector
          selectedRole={selectedRole}
          onSelect={(role) => {
            setSelectedRole(role);
            setFieldErrors({});
            setFlowError(null);
          }}
          disabled={isPending}
          compact
        />

        <hr style={sectionDividerStyle} />

        <SubscriptionOwnerTypeSelector
          selectedOwnerType={ownerType}
          onSelect={(value) => {
            setOwnerType(value);
            setFieldErrors({});
            setFlowError(null);
          }}
          disabled={isPending || !canSpecifyOwnerType}
          idPrefix="register-owner-type"
          compact
        />

        {flowError && (
          <p role="alert" style={{ ...fieldErrorStyle, marginTop: '8px' }}>
            {flowError}
          </p>
        )}

        <hr style={sectionDividerStyle} />

        <h2 style={compactHeadingStyle}>{CHOOSE_PLAN_HEADING}</h2>

        <SubscriptionPlans
          selectedPlan={selectedPlan}
          onSelect={setSelectedPlan}
          ownerType={ownerType}
          disabled={isPending || !canChoosePlan}
          blocked={!canChoosePlan}
          blockedMessage={
            !selectedRole
              ? ROLE_REQUIRED_MESSAGE
              : OWNER_TYPE_REQUIRED_MESSAGE
          }
          compact
        />
      </aside>

      <section style={checkoutPanelStyle}>
        <h2 style={compactHeadingStyle}>Checkout</h2>

        <SubscriptionCheckoutSummary
          subscriptionType={selectedRole}
          planCode={selectedPlan}
        />

        <form noValidate onSubmit={handleSubmit}>
          <input type="hidden" name="subscriptionRole" value={selectedRole ?? ''} />
          {/* TODO: connect ownerType to API once backend field is confirmed. */}
          <input type="hidden" name="ownerType" value={ownerType ?? ''} />
          <input type="hidden" name="planCode" value={selectedPlan} />

          {state.status === 'error' && (
            <div role="alert" style={alertErrorStyle}>
              {state.message}
            </div>
          )}

          {ownerType ? (
            <SubscriptionCheckoutForm
              key={ownerType}
              ownerType={ownerType}
              disabled={isPending || !canProceed}
              fieldErrors={fieldErrors}
              idPrefix="register"
            />
          ) : (
            <p style={{ margin: '0 0 18px', fontSize: '13px', lineHeight: 1.5, color: '#64748b' }}>
              Complete your subscription selections to enter account details.
            </p>
          )}

          <button
            type="submit"
            disabled={isPending || !canProceed}
            style={checkoutSubmitButtonStyle(isPending || !canProceed)}
          >
            {!canProceed
              ? 'Complete selections'
              : isPending
                ? 'Creating account…'
                : isPaidPlan(selectedPlan)
                  ? 'Continue to payment'
                  : 'Create account'}
          </button>
        </form>
      </section>
    </div>
  );
}

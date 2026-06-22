'use client';

import { useState, type FormEvent } from 'react';
import {
  submitRegistration,
  type RegisterFormState,
} from './register-api';
import { FreeDashboardAccess, PaidPlanCheckout } from './payment-step';
import SubscriptionPlans from './subscription-plans';
import {
  ADMIN_EMAIL_HELPER,
  isPaidPlan,
  PAYMENT_NOTE,
  type PlanCode,
} from './types';
import {
  alertErrorStyle,
  cardStyle,
  fieldErrorStyle,
  fieldStyle,
  formCardStyle,
  getInputStyle,
  labelStyle,
  layoutGridStyle,
  primaryButtonStyle,
  sectionHintStyle,
  valuePropStyle,
} from './styles';
import {
  hasFieldErrors,
  PASSWORD_HELPER_TEXT,
  validateRegistrationForm,
  type FieldErrors,
} from './validation';

const initialRegisterState: RegisterFormState = { status: 'idle' };

export default function RegisterForm() {
  const [state, setState] = useState<RegisterFormState>(initialRegisterState);
  const [isPending, setIsPending] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PlanCode>('STARTER');
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  if (state.status === 'success') {
    if (isPaidPlan(selectedPlan)) {
      return <PaidPlanCheckout data={state.data} planCode={selectedPlan} />;
    }

    return <FreeDashboardAccess data={state.data} />;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const errors = validateRegistrationForm({
      companyName: String(formData.get('companyName') ?? ''),
      firstName: String(formData.get('firstName') ?? ''),
      lastName: String(formData.get('lastName') ?? ''),
      email: String(formData.get('email') ?? ''),
      password: String(formData.get('password') ?? ''),
      confirmPassword: String(formData.get('confirmPassword') ?? ''),
    });

    if (hasFieldErrors(errors)) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    setIsPending(true);

    try {
      const result = await submitRegistration(formData);
      setState(result);
    } finally {
      setIsPending(false);
    }
  }

  return (
    <div style={layoutGridStyle}>
      <aside style={cardStyle}>
        <h2 style={{ margin: '0 0 8px 0', fontSize: '18px', color: '#111827' }}>
          Choose your plan
        </h2>
        <p style={{ ...sectionHintStyle, marginBottom: '16px' }}>
          Select the subscription that fits your team. Upgrade anytime from your
          dashboard.
        </p>

        <SubscriptionPlans
          selectedPlan={selectedPlan}
          onSelect={setSelectedPlan}
          disabled={isPending}
          compact
        />

        <ul style={valuePropStyle}>
          <li>Procurement and selling in one platform</li>
          <li>Secure dashboard access after onboarding</li>
          <li>Complete profile and settings inside USTRIX</li>
        </ul>

        <p style={{ ...sectionHintStyle, margin: '16px 0 0 0', fontSize: '13px' }}>
          {PAYMENT_NOTE}
        </p>
      </aside>

      <section style={formCardStyle}>
        <h2 style={{ margin: '0 0 8px 0', fontSize: '18px', color: '#111827' }}>
          Admin account
        </h2>
        <p style={{ ...sectionHintStyle, marginBottom: '18px' }}>
          Basic details only. Business configuration is completed in your
          dashboard after login.
        </p>

        <form noValidate onSubmit={handleSubmit}>
          {state.status === 'error' && (
            <div role="alert" style={alertErrorStyle}>
              {state.message}
            </div>
          )}

          <div style={fieldStyle}>
            <label htmlFor="companyName" style={labelStyle}>
              Company / Account Name
            </label>
            <input
              id="companyName"
              name="companyName"
              type="text"
              disabled={isPending}
              style={getInputStyle(Boolean(fieldErrors.companyName))}
              placeholder="Acme Facility Services Inc."
            />
            {fieldErrors.companyName && (
              <p style={fieldErrorStyle}>{fieldErrors.companyName}</p>
            )}
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '12px',
              marginBottom: '14px',
            }}
          >
            <div>
              <label htmlFor="firstName" style={labelStyle}>
                Admin First Name
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                disabled={isPending}
                style={getInputStyle(Boolean(fieldErrors.firstName))}
              />
              {fieldErrors.firstName && (
                <p style={fieldErrorStyle}>{fieldErrors.firstName}</p>
              )}
            </div>
            <div>
              <label htmlFor="lastName" style={labelStyle}>
                Admin Last Name
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                disabled={isPending}
                style={getInputStyle(Boolean(fieldErrors.lastName))}
              />
              {fieldErrors.lastName && (
                <p style={fieldErrorStyle}>{fieldErrors.lastName}</p>
              )}
            </div>
          </div>

          <div style={fieldStyle}>
            <label htmlFor="email" style={labelStyle}>
              Admin Email
            </label>
            <p
              style={{
                ...sectionHintStyle,
                margin: '0 0 8px 0',
                fontSize: '13px',
              }}
            >
              {ADMIN_EMAIL_HELPER}
            </p>
            <input
              id="email"
              name="email"
              type="email"
              disabled={isPending}
              style={getInputStyle(Boolean(fieldErrors.email))}
              placeholder="admin@yourcompany.com"
              autoComplete="email"
            />
            {fieldErrors.email && (
              <p style={fieldErrorStyle}>{fieldErrors.email}</p>
            )}
          </div>

          <div style={fieldStyle}>
            <label htmlFor="mobileNumber" style={labelStyle}>
              Mobile Number <span style={{ fontWeight: 400 }}>(optional)</span>
            </label>
            <input
              id="mobileNumber"
              name="mobileNumber"
              type="tel"
              disabled={isPending}
              style={getInputStyle(false)}
              placeholder="+1 416 555 0100"
            />
          </div>

          <div style={fieldStyle}>
            <label htmlFor="password" style={labelStyle}>
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              disabled={isPending}
              style={getInputStyle(Boolean(fieldErrors.password))}
              autoComplete="new-password"
            />
            <p
              style={{
                ...sectionHintStyle,
                margin: '6px 0 0 0',
                fontSize: '12px',
              }}
            >
              {PASSWORD_HELPER_TEXT}
            </p>
            {fieldErrors.password && (
              <p style={fieldErrorStyle}>{fieldErrors.password}</p>
            )}
          </div>

          <div style={{ ...fieldStyle, marginBottom: '20px' }}>
            <label htmlFor="confirmPassword" style={labelStyle}>
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              disabled={isPending}
              style={getInputStyle(Boolean(fieldErrors.confirmPassword))}
              autoComplete="new-password"
            />
            {fieldErrors.confirmPassword && (
              <p style={fieldErrorStyle}>{fieldErrors.confirmPassword}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isPending}
            style={primaryButtonStyle(isPending)}
          >
            {isPending
              ? 'Creating account…'
              : isPaidPlan(selectedPlan)
                ? 'Create Account'
                : 'Continue with Free'}
          </button>
        </form>
      </section>
    </div>
  );
}

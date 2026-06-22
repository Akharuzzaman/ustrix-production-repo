'use client';

import Link from 'next/link';
import { useState, type FormEvent } from 'react';
import {
  agentNoteStyle,
  alertInfoStyle,
  cardStyle,
  fieldErrorStyle,
  fieldStyle,
  getChoiceCardStyle,
  getInputStyle,
  labelStyle,
  primaryButtonStyle,
  secondaryLinkStyle,
  sectionDividerStyle,
  sectionHintStyle,
  sectionTitleStyle,
} from '@/app/register/styles';
import { PASSWORD_HELPER_TEXT } from '@/app/register/validation';
import {
  AGENT_TYPE_OPTIONS,
  getAgentEmailHelperText,
  getLeadCostPlaceholder,
  LEAD_COST_TYPE_OPTIONS,
  SERVICE_CATEGORY_OPTIONS,
  type AgentType,
  type LeadCostType,
  type ServiceCategory,
} from './types';
import {
  hasAgentFieldErrors,
  validateAgentForm,
  type AgentFieldErrors,
} from './validation';

const confidentialNoteStyle = {
  marginBottom: '24px',
  padding: '16px',
  background: '#f8fafc',
  border: '1px solid #e2e8f0',
  borderRadius: '12px',
};

export default function AgentRegisterForm() {
  const [submitted, setSubmitted] = useState(false);
  const [agentType, setAgentType] = useState<AgentType>('INDIVIDUAL');
  const [leadCostType, setLeadCostType] = useState<LeadCostType>('PERCENTAGE');
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [fieldErrors, setFieldErrors] = useState<AgentFieldErrors>({});

  function toggleCategory(category: ServiceCategory) {
    setCategories((current) =>
      current.includes(category)
        ? current.filter((value) => value !== category)
        : [...current, category]
    );
    setFieldErrors((current) => ({ ...current, categories: undefined }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const errors = validateAgentForm({
      agentType,
      businessName: String(formData.get('businessName') ?? ''),
      firstName: String(formData.get('firstName') ?? ''),
      lastName: String(formData.get('lastName') ?? ''),
      email: String(formData.get('email') ?? ''),
      mobileCode: String(formData.get('mobileCode') ?? ''),
      mobileNumber: String(formData.get('mobileNumber') ?? ''),
      leadCostType,
      leadCostValue: String(formData.get('leadCostValue') ?? ''),
      categories,
      country: String(formData.get('country') ?? ''),
      province: String(formData.get('province') ?? ''),
      city: String(formData.get('city') ?? ''),
      password: String(formData.get('password') ?? ''),
      confirmPassword: String(formData.get('confirmPassword') ?? ''),
    });

    if (hasAgentFieldErrors(errors)) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <section style={cardStyle}>
        <p style={{ color: '#059669', fontWeight: 600, marginBottom: '8px' }}>
          Confidential agent onboarding
        </p>
        <h2 style={{ margin: '0 0 16px 0', color: '#111827', fontSize: '28px' }}>
          Agent registration request prepared
        </h2>
        <p style={{ color: '#374151', lineHeight: 1.7, marginBottom: '20px' }}>
          Your agent onboarding information has been captured on this page.
          Backend submission and approval workflow will be connected in the next
          development step.
        </p>
        <div style={alertInfoStyle}>
          Agent identity is not disclosed to buyer or seller. Lead cost is
          handled privately by USTRIX.
        </div>
        <Link href="/register" style={secondaryLinkStyle}>
          Register as Buyer or Seller
        </Link>
      </section>
    );
  }

  return (
    <section style={cardStyle}>
      <div style={confidentialNoteStyle}>
        <p style={{ margin: '0 0 8px 0', fontWeight: 700, color: '#111827' }}>
          Confidential agent onboarding
        </p>
        <p style={{ margin: 0, fontSize: '14px', color: '#475569', lineHeight: 1.6 }}>
          Agent identity and commission details are visible only to USTRIX
          platform administration. They are not disclosed to buyers or sellers.
          Lead cost is handled privately by USTRIX.
        </p>
      </div>

      <form noValidate onSubmit={handleSubmit}>
        <input type="hidden" name="agentType" value={agentType} />
        <input type="hidden" name="leadCostType" value={leadCostType} />

        <section>
          <h2 style={sectionTitleStyle}>Agent type</h2>
          <p style={sectionHintStyle}>
            Select whether you are registering as an individual agent or a
            brokerage organization.
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '12px',
            }}
          >
            {AGENT_TYPE_OPTIONS.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  setAgentType(option.value);
                  setFieldErrors((current) => ({
                    ...current,
                    agentType: undefined,
                    email: undefined,
                  }));
                }}
                style={getChoiceCardStyle(agentType === option.value)}
              >
                <span
                  style={{
                    display: 'block',
                    fontSize: '15px',
                    fontWeight: 700,
                    color: '#111827',
                    marginBottom: '6px',
                  }}
                >
                  {option.label}
                </span>
                <span style={{ fontSize: '13px', color: '#6b7280', lineHeight: 1.5 }}>
                  {option.description}
                </span>
              </button>
            ))}
          </div>
          {fieldErrors.agentType && (
            <p style={fieldErrorStyle}>{fieldErrors.agentType}</p>
          )}
        </section>

        <hr style={sectionDividerStyle} />

        <section>
          <h2 style={sectionTitleStyle}>Agent profile</h2>
          <div style={fieldStyle}>
            <label htmlFor="businessName" style={labelStyle}>
              Legal / Business Name
            </label>
            <input
              id="businessName"
              name="businessName"
              type="text"
              style={getInputStyle(Boolean(fieldErrors.businessName))}
              placeholder="Northline Procurement Brokers Ltd."
            />
            {fieldErrors.businessName && (
              <p style={fieldErrorStyle}>{fieldErrors.businessName}</p>
            )}
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '16px',
              marginBottom: '18px',
            }}
          >
            <div>
              <label htmlFor="firstName" style={labelStyle}>
                Contact Person First Name
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                style={getInputStyle(Boolean(fieldErrors.firstName))}
              />
              {fieldErrors.firstName && (
                <p style={fieldErrorStyle}>{fieldErrors.firstName}</p>
              )}
            </div>
            <div>
              <label htmlFor="lastName" style={labelStyle}>
                Contact Person Last Name
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                style={getInputStyle(Boolean(fieldErrors.lastName))}
              />
              {fieldErrors.lastName && (
                <p style={fieldErrorStyle}>{fieldErrors.lastName}</p>
              )}
            </div>
          </div>

          <div style={fieldStyle}>
            <label htmlFor="email" style={labelStyle}>
              Email
            </label>
            <p style={{ ...sectionHintStyle, margin: '0 0 10px 0', fontSize: '13px' }}>
              {getAgentEmailHelperText(agentType)}
            </p>
            <input
              id="email"
              name="email"
              type="email"
              style={getInputStyle(Boolean(fieldErrors.email))}
              placeholder={
                agentType === 'ORGANIZATION'
                  ? 'contact@brokerage.com'
                  : 'agent@example.com'
              }
              autoComplete="email"
            />
            {fieldErrors.email && (
              <p style={fieldErrorStyle}>{fieldErrors.email}</p>
            )}
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '120px 1fr',
              gap: '16px',
            }}
          >
            <div>
              <label htmlFor="mobileCode" style={labelStyle}>
                Mobile Code
              </label>
              <input
                id="mobileCode"
                name="mobileCode"
                type="text"
                style={getInputStyle(Boolean(fieldErrors.mobileCode))}
                placeholder="+1"
                defaultValue="+1"
              />
              {fieldErrors.mobileCode && (
                <p style={fieldErrorStyle}>{fieldErrors.mobileCode}</p>
              )}
            </div>
            <div>
              <label htmlFor="mobileNumber" style={labelStyle}>
                Mobile Number
              </label>
              <input
                id="mobileNumber"
                name="mobileNumber"
                type="tel"
                style={getInputStyle(Boolean(fieldErrors.mobileNumber))}
                placeholder="4165550100"
              />
              {fieldErrors.mobileNumber && (
                <p style={fieldErrorStyle}>{fieldErrors.mobileNumber}</p>
              )}
            </div>
          </div>
        </section>

        <hr style={sectionDividerStyle} />

        <section>
          <h2 style={sectionTitleStyle}>Lead cost preferences</h2>
          <p style={sectionHintStyle}>
            Preferred lead cost settings remain confidential and are managed by
            USTRIX administration.
          </p>

          <p style={{ ...labelStyle, marginBottom: '10px' }}>
            Preferred Lead Cost Type
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '12px',
              marginBottom: '18px',
            }}
          >
            {LEAD_COST_TYPE_OPTIONS.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  setLeadCostType(option.value);
                  setFieldErrors((current) => ({
                    ...current,
                    leadCostType: undefined,
                  }));
                }}
                style={getChoiceCardStyle(leadCostType === option.value)}
              >
                <span style={{ fontSize: '15px', fontWeight: 700, color: '#111827' }}>
                  {option.label}
                </span>
              </button>
            ))}
          </div>
          {fieldErrors.leadCostType && (
            <p style={{ ...fieldErrorStyle, marginTop: '-8px', marginBottom: '18px' }}>
              {fieldErrors.leadCostType}
            </p>
          )}

          <div style={fieldStyle}>
            <label htmlFor="leadCostValue" style={labelStyle}>
              Default Lead Cost Value
            </label>
            <input
              id="leadCostValue"
              name="leadCostValue"
              type="text"
              inputMode="decimal"
              style={getInputStyle(Boolean(fieldErrors.leadCostValue))}
              placeholder={getLeadCostPlaceholder(leadCostType)}
            />
            {fieldErrors.leadCostValue && (
              <p style={fieldErrorStyle}>{fieldErrors.leadCostValue}</p>
            )}
          </div>
        </section>

        <hr style={sectionDividerStyle} />

        <section>
          <h2 style={sectionTitleStyle}>Service / procurement categories</h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '10px',
            }}
          >
            {SERVICE_CATEGORY_OPTIONS.map((option) => {
              const checked = categories.includes(option.value);
              return (
                <label
                  key={option.value}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '12px 14px',
                    border: checked ? '2px solid #111827' : '1px solid #e5e7eb',
                    borderRadius: '10px',
                    background: checked ? '#f9fafb' : '#ffffff',
                    cursor: 'pointer',
                    fontSize: '14px',
                    color: '#374151',
                  }}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleCategory(option.value)}
                  />
                  {option.label}
                </label>
              );
            })}
          </div>
          {fieldErrors.categories && (
            <p style={{ ...fieldErrorStyle, marginTop: '10px' }}>
              {fieldErrors.categories}
            </p>
          )}
        </section>

        <hr style={sectionDividerStyle} />

        <section>
          <h2 style={sectionTitleStyle}>Coverage area</h2>
          <div style={fieldStyle}>
            <label htmlFor="country" style={labelStyle}>
              Country
            </label>
            <input
              id="country"
              name="country"
              type="text"
              style={getInputStyle(Boolean(fieldErrors.country))}
              placeholder="Canada"
              defaultValue="Canada"
            />
            {fieldErrors.country && (
              <p style={fieldErrorStyle}>{fieldErrors.country}</p>
            )}
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '16px',
            }}
          >
            <div>
              <label htmlFor="province" style={labelStyle}>
                Province / State
              </label>
              <input
                id="province"
                name="province"
                type="text"
                style={getInputStyle(Boolean(fieldErrors.province))}
                placeholder="Ontario"
              />
              {fieldErrors.province && (
                <p style={fieldErrorStyle}>{fieldErrors.province}</p>
              )}
            </div>
            <div>
              <label htmlFor="city" style={labelStyle}>
                City / Region
              </label>
              <input
                id="city"
                name="city"
                type="text"
                style={getInputStyle(Boolean(fieldErrors.city))}
                placeholder="Toronto / GTA"
              />
              {fieldErrors.city && (
                <p style={fieldErrorStyle}>{fieldErrors.city}</p>
              )}
            </div>
          </div>
        </section>

        <hr style={sectionDividerStyle} />

        <section>
          <h2 style={sectionTitleStyle}>Security</h2>
          <p style={sectionHintStyle}>{PASSWORD_HELPER_TEXT}</p>
          <div style={fieldStyle}>
            <label htmlFor="password" style={labelStyle}>
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              style={getInputStyle(Boolean(fieldErrors.password))}
              autoComplete="new-password"
            />
            {fieldErrors.password && (
              <p style={fieldErrorStyle}>{fieldErrors.password}</p>
            )}
          </div>
          <div style={fieldStyle}>
            <label htmlFor="confirmPassword" style={labelStyle}>
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              style={getInputStyle(Boolean(fieldErrors.confirmPassword))}
              autoComplete="new-password"
            />
            {fieldErrors.confirmPassword && (
              <p style={fieldErrorStyle}>{fieldErrors.confirmPassword}</p>
            )}
          </div>
        </section>

        <div style={{ ...agentNoteStyle, marginBottom: '24px' }}>
          <Link href="/register" style={secondaryLinkStyle}>
            Register as Buyer or Seller
          </Link>
        </div>

        <button type="submit" style={primaryButtonStyle(false)}>
          Submit Agent Registration Request
        </button>
      </form>
    </section>
  );
}

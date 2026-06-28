'use client';

import type { CheckoutFieldErrors } from '@/app/register/validation';
import { PASSWORD_HELPER_TEXT } from '@/app/register/validation';
import type { OwnerType } from '@/components/subscription/types';
import styles from './subscription-checkout-form.module.css';

type SubscriptionCheckoutFormProps = {
  ownerType: OwnerType;
  disabled?: boolean;
  fieldErrors: CheckoutFieldErrors;
  idPrefix?: string;
};

type FieldProps = {
  id: string;
  name: string;
  label: string;
  error?: string;
  disabled?: boolean;
  optional?: boolean;
  hint?: string;
  hintAfterLabel?: boolean;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  defaultValue?: string;
  inputMode?: 'decimal' | 'text' | 'tel' | 'email';
};

function CheckoutField({
  id,
  name,
  label,
  error,
  disabled,
  optional,
  hint,
  hintAfterLabel = false,
  type = 'text',
  placeholder,
  autoComplete,
  defaultValue,
  inputMode,
}: FieldProps) {
  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.label}>
        {label}
        {optional ? (
          <span className={styles.labelOptional}> (optional)</span>
        ) : null}
      </label>
      {hint && !hintAfterLabel ? <p className={styles.fieldHint}>{hint}</p> : null}
      <input
        id={id}
        name={name}
        type={type}
        disabled={disabled}
        placeholder={placeholder}
        autoComplete={autoComplete}
        defaultValue={defaultValue}
        inputMode={inputMode}
        className={`${styles.input} ${error ? styles.inputError : ''}`}
      />
      {hint && hintAfterLabel ? <p className={styles.fieldHint}>{hint}</p> : null}
      {error ? <p className={styles.error}>{error}</p> : null}
    </div>
  );
}

function PasswordFields({
  idPrefix,
  disabled,
  fieldErrors,
}: {
  idPrefix: string;
  disabled: boolean;
  fieldErrors: CheckoutFieldErrors;
}) {
  return (
    <>
      <CheckoutField
        id={`${idPrefix}-password`}
        name="password"
        label="Password"
        type="password"
        disabled={disabled}
        error={fieldErrors.password}
        hint={PASSWORD_HELPER_TEXT}
        hintAfterLabel
        autoComplete="new-password"
      />

      <CheckoutField
        id={`${idPrefix}-confirmPassword`}
        name="confirmPassword"
        label="Confirm password"
        type="password"
        disabled={disabled}
        error={fieldErrors.confirmPassword}
        autoComplete="new-password"
      />
    </>
  );
}

function BusinessInformationSection({
  idPrefix,
  disabled,
  fieldErrors,
}: {
  idPrefix: string;
  disabled: boolean;
  fieldErrors: CheckoutFieldErrors;
}) {
  return (
    <section className={styles.section}>
      <h3 className={styles.sectionTitle}>Company details</h3>
      <p className={styles.sectionLead}>
        Required for business and organization subscriptions. Enter your
        registered company information exactly as it appears on official records.
      </p>

      <CheckoutField
        id={`${idPrefix}-companyName`}
        name="companyName"
        label="Legal business name"
        disabled={disabled}
        error={fieldErrors.companyName}
        placeholder="Acme Facility Services Inc."
        autoComplete="organization"
      />

      <CheckoutField
        id={`${idPrefix}-corporationNumber`}
        name="corporationNumber"
        label="Corporation / registration number"
        disabled={disabled}
        error={fieldErrors.corporationNumber}
        placeholder="123456789"
      />

      <CheckoutField
        id={`${idPrefix}-addressLine1`}
        name="addressLine1"
        label="Registered street address"
        disabled={disabled}
        error={fieldErrors.addressLine1}
        placeholder="100 King Street West"
        autoComplete="address-line1"
      />

      <CheckoutField
        id={`${idPrefix}-addressLine2`}
        name="addressLine2"
        label="Address line 2"
        disabled={disabled}
        optional
        placeholder="Suite 500"
        autoComplete="address-line2"
      />

      <div className={styles.rowThree}>
        <CheckoutField
          id={`${idPrefix}-city`}
          name="city"
          label="City"
          disabled={disabled}
          error={fieldErrors.city}
          placeholder="Toronto"
          autoComplete="address-level2"
        />
        <CheckoutField
          id={`${idPrefix}-province`}
          name="province"
          label="Province / state"
          disabled={disabled}
          error={fieldErrors.province}
          placeholder="Ontario"
          autoComplete="address-level1"
        />
        <CheckoutField
          id={`${idPrefix}-postalCode`}
          name="postalCode"
          label="Postal code"
          disabled={disabled}
          error={fieldErrors.postalCode}
          placeholder="M5H 2N2"
          autoComplete="postal-code"
        />
      </div>

      <CheckoutField
        id={`${idPrefix}-country`}
        name="country"
        label="Country"
        disabled={disabled}
        error={fieldErrors.country}
        defaultValue="Canada"
        autoComplete="country-name"
      />
    </section>
  );
}

function AdminAccountSection({
  idPrefix,
  disabled,
  fieldErrors,
}: {
  idPrefix: string;
  disabled: boolean;
  fieldErrors: CheckoutFieldErrors;
}) {
  return (
    <section className={styles.section}>
      <h3 className={styles.sectionTitle}>Admin account</h3>
      <p className={styles.sectionLead}>
        The primary administrator who will manage this organization account.
        Additional users can be invited after registration.
      </p>

      <div className={styles.rowTwo}>
        <CheckoutField
          id={`${idPrefix}-firstName`}
          name="firstName"
          label="Admin first name"
          disabled={disabled}
          error={fieldErrors.firstName}
          autoComplete="given-name"
        />
        <CheckoutField
          id={`${idPrefix}-lastName`}
          name="lastName"
          label="Admin last name"
          disabled={disabled}
          error={fieldErrors.lastName}
          autoComplete="family-name"
        />
      </div>

      <CheckoutField
        id={`${idPrefix}-email`}
        name="email"
        label="Admin business email"
        type="email"
        disabled={disabled}
        error={fieldErrors.email}
        hint="Use a company email address for organization accounts."
        placeholder="admin@yourcompany.com"
        autoComplete="email"
      />

      <CheckoutField
        id={`${idPrefix}-mobileNumber`}
        name="mobileNumber"
        label="Mobile number"
        type="tel"
        disabled={disabled}
        optional
        placeholder="+1 416 555 0100"
        autoComplete="tel"
      />

      <PasswordFields
        idPrefix={idPrefix}
        disabled={disabled}
        fieldErrors={fieldErrors}
      />
    </section>
  );
}

function PersonalInformationSection({
  idPrefix,
  disabled,
  fieldErrors,
}: {
  idPrefix: string;
  disabled: boolean;
  fieldErrors: CheckoutFieldErrors;
}) {
  return (
    <section className={styles.section}>
      <h3 className={styles.sectionTitle}>Personal information</h3>
      <p className={styles.sectionLead}>
        Individual subscriptions require your personal details only. Company
        registration fields are not needed for this account type.
      </p>

      <div className={styles.rowTwo}>
        <CheckoutField
          id={`${idPrefix}-firstName`}
          name="firstName"
          label="First name"
          disabled={disabled}
          error={fieldErrors.firstName}
          autoComplete="given-name"
        />
        <CheckoutField
          id={`${idPrefix}-lastName`}
          name="lastName"
          label="Last name"
          disabled={disabled}
          error={fieldErrors.lastName}
          autoComplete="family-name"
        />
      </div>

      <CheckoutField
        id={`${idPrefix}-email`}
        name="email"
        label="Email"
        type="email"
        disabled={disabled}
        error={fieldErrors.email}
        hint="Used to sign in and receive account notifications."
        placeholder="you@example.com"
        autoComplete="email"
      />

      <CheckoutField
        id={`${idPrefix}-mobileNumber`}
        name="mobileNumber"
        label="Mobile number"
        type="tel"
        disabled={disabled}
        optional
        placeholder="+1 416 555 0100"
        autoComplete="tel"
      />

      <PasswordFields
        idPrefix={idPrefix}
        disabled={disabled}
        fieldErrors={fieldErrors}
      />
    </section>
  );
}

export default function SubscriptionCheckoutForm({
  ownerType,
  disabled = false,
  fieldErrors,
  idPrefix = 'checkout',
}: SubscriptionCheckoutFormProps) {
  if (ownerType === 'organization') {
    return (
      <div className={styles.form}>
        <BusinessInformationSection
          idPrefix={idPrefix}
          disabled={disabled}
          fieldErrors={fieldErrors}
        />
        <AdminAccountSection
          idPrefix={idPrefix}
          disabled={disabled}
          fieldErrors={fieldErrors}
        />
      </div>
    );
  }

  return (
    <div className={styles.form}>
      <PersonalInformationSection
        idPrefix={idPrefix}
        disabled={disabled}
        fieldErrors={fieldErrors}
      />
    </div>
  );
}

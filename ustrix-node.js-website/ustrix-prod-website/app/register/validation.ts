import { isValidEmailFormat } from '@/lib/email-validation';
import type { OwnerType } from '@/components/subscription/types';

export const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;

export const PASSWORD_HELPER_TEXT =
  'Use at least 8 characters with uppercase, lowercase, number, and special character.';

export type CheckoutFieldErrors = Partial<
  Record<
    | 'companyName'
    | 'corporationNumber'
    | 'addressLine1'
    | 'city'
    | 'province'
    | 'postalCode'
    | 'country'
    | 'firstName'
    | 'lastName'
    | 'email'
    | 'password'
    | 'confirmPassword',
    string
  >
>;

export type CheckoutFormValues = {
  companyName: string;
  corporationNumber: string;
  addressLine1: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

/** @deprecated Use CheckoutFieldErrors */
export type FieldErrors = CheckoutFieldErrors;

/** @deprecated Use CheckoutFormValues */
export type RegistrationFormValues = CheckoutFormValues;

export function readCheckoutFormValues(formData: FormData): CheckoutFormValues {
  return {
    companyName: String(formData.get('companyName') ?? ''),
    corporationNumber: String(formData.get('corporationNumber') ?? ''),
    addressLine1: String(formData.get('addressLine1') ?? ''),
    city: String(formData.get('city') ?? ''),
    province: String(formData.get('province') ?? ''),
    postalCode: String(formData.get('postalCode') ?? ''),
    country: String(formData.get('country') ?? ''),
    firstName: String(formData.get('firstName') ?? ''),
    lastName: String(formData.get('lastName') ?? ''),
    email: String(formData.get('email') ?? ''),
    password: String(formData.get('password') ?? ''),
    confirmPassword: String(formData.get('confirmPassword') ?? ''),
  };
}

function validatePasswordFields(
  values: Pick<CheckoutFormValues, 'password' | 'confirmPassword'>,
  errors: CheckoutFieldErrors
) {
  if (!values.password) {
    errors.password = 'Password is required.';
  } else if (!PASSWORD_REGEX.test(values.password)) {
    errors.password = PASSWORD_HELPER_TEXT;
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = 'Please confirm your password.';
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match.';
  }
}

function validatePersonalFields(
  values: Pick<CheckoutFormValues, 'firstName' | 'lastName' | 'email'>,
  errors: CheckoutFieldErrors
) {
  if (!values.firstName.trim()) {
    errors.firstName = 'First name is required.';
  }

  if (!values.lastName.trim()) {
    errors.lastName = 'Last name is required.';
  }

  if (!values.email.trim()) {
    errors.email = 'Email is required.';
  } else if (!isValidEmailFormat(values.email)) {
    errors.email = 'Enter a valid email address.';
  }
}

function validateBusinessFields(
  values: Pick<
    CheckoutFormValues,
    | 'companyName'
    | 'corporationNumber'
    | 'addressLine1'
    | 'city'
    | 'province'
    | 'postalCode'
    | 'country'
  >,
  errors: CheckoutFieldErrors
) {
  if (!values.companyName.trim()) {
    errors.companyName = 'Legal business name is required.';
  }

  if (!values.corporationNumber.trim()) {
    errors.corporationNumber = 'Corporation or registration number is required.';
  }

  if (!values.addressLine1.trim()) {
    errors.addressLine1 = 'Registered street address is required.';
  }

  if (!values.city.trim()) {
    errors.city = 'City is required.';
  }

  if (!values.province.trim()) {
    errors.province = 'Province or state is required.';
  }

  if (!values.postalCode.trim()) {
    errors.postalCode = 'Postal code is required.';
  }

  if (!values.country.trim()) {
    errors.country = 'Country is required.';
  }
}

function validateAdminFields(
  values: Pick<CheckoutFormValues, 'firstName' | 'lastName' | 'email'>,
  errors: CheckoutFieldErrors
) {
  if (!values.firstName.trim()) {
    errors.firstName = 'Admin first name is required.';
  }

  if (!values.lastName.trim()) {
    errors.lastName = 'Admin last name is required.';
  }

  if (!values.email.trim()) {
    errors.email = 'Admin email is required.';
  } else if (!isValidEmailFormat(values.email)) {
    errors.email = 'Enter a valid email address.';
  }
}

export function validateSubscriptionCheckoutForm(
  ownerType: OwnerType,
  values: CheckoutFormValues
): CheckoutFieldErrors {
  const errors: CheckoutFieldErrors = {};

  if (ownerType === 'organization') {
    validateBusinessFields(values, errors);
    validateAdminFields(values, errors);
  } else {
    validatePersonalFields(values, errors);
  }

  validatePasswordFields(values, errors);

  return errors;
}

export function hasBusinessFieldValues(values: CheckoutFormValues): boolean {
  return Boolean(
    values.companyName.trim() ||
      values.corporationNumber.trim() ||
      values.addressLine1.trim() ||
      values.city.trim() ||
      values.province.trim() ||
      values.postalCode.trim() ||
      values.country.trim()
  );
}

/** @deprecated Use validateSubscriptionCheckoutForm */
export function validateRegistrationForm(
  values: CheckoutFormValues
): CheckoutFieldErrors {
  return validateSubscriptionCheckoutForm('individual', values);
}

export function hasFieldErrors(errors: CheckoutFieldErrors): boolean {
  return Object.keys(errors).length > 0;
}

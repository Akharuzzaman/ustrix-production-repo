import { isValidEmailFormat } from '@/lib/email-validation';

export const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;

export const PASSWORD_HELPER_TEXT =
  'Use at least 8 characters with uppercase, lowercase, number, and special character.';

export type FieldErrors = Partial<
  Record<
    | 'companyName'
    | 'firstName'
    | 'lastName'
    | 'email'
    | 'password'
    | 'confirmPassword',
    string
  >
>;

export type RegistrationFormValues = {
  companyName: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export function validateRegistrationForm(
  values: RegistrationFormValues
): FieldErrors {
  const errors: FieldErrors = {};

  if (!values.companyName.trim()) {
    errors.companyName = 'Company or account name is required.';
  }

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

  return errors;
}

export function hasFieldErrors(errors: FieldErrors): boolean {
  return Object.keys(errors).length > 0;
}

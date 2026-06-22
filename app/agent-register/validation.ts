import {
  AGENT_ORGANIZATION_EMAIL_ERROR,
  isPersonalEmailDomain,
  isValidEmailFormat,
} from '@/lib/email-validation';
import {
  PASSWORD_HELPER_TEXT,
  PASSWORD_REGEX,
} from '@/app/register/validation';
import type { AgentType, LeadCostType, ServiceCategory } from './types';

export type AgentFieldErrors = Partial<
  Record<
    | 'agentType'
    | 'businessName'
    | 'firstName'
    | 'lastName'
    | 'email'
    | 'mobileCode'
    | 'mobileNumber'
    | 'leadCostType'
    | 'leadCostValue'
    | 'categories'
    | 'country'
    | 'province'
    | 'city'
    | 'password'
    | 'confirmPassword',
    string
  >
>;

export type AgentFormValues = {
  agentType: AgentType;
  businessName: string;
  firstName: string;
  lastName: string;
  email: string;
  mobileCode: string;
  mobileNumber: string;
  leadCostType: LeadCostType;
  leadCostValue: string;
  categories: ServiceCategory[];
  country: string;
  province: string;
  city: string;
  password: string;
  confirmPassword: string;
};

export function validateAgentForm(values: AgentFormValues): AgentFieldErrors {
  const errors: AgentFieldErrors = {};

  if (!values.agentType) {
    errors.agentType = 'Please select an agent type.';
  }

  if (!values.businessName.trim()) {
    errors.businessName = 'Legal or business name is required.';
  }

  if (!values.firstName.trim()) {
    errors.firstName = 'Contact person first name is required.';
  }

  if (!values.lastName.trim()) {
    errors.lastName = 'Contact person last name is required.';
  }

  if (!values.email.trim()) {
    errors.email = 'Email is required.';
  } else if (!isValidEmailFormat(values.email)) {
    errors.email = 'Enter a valid email address.';
  } else if (
    values.agentType === 'ORGANIZATION' &&
    isPersonalEmailDomain(values.email)
  ) {
    errors.email = AGENT_ORGANIZATION_EMAIL_ERROR;
  }

  if (!values.mobileCode.trim()) {
    errors.mobileCode = 'Mobile code is required.';
  }

  if (!values.mobileNumber.trim()) {
    errors.mobileNumber = 'Mobile number is required.';
  }

  if (!values.leadCostType) {
    errors.leadCostType = 'Select a preferred lead cost type.';
  }

  if (!values.leadCostValue.trim()) {
    errors.leadCostValue = 'Default lead cost value is required.';
  } else if (Number.isNaN(Number(values.leadCostValue))) {
    errors.leadCostValue = 'Enter a valid numeric lead cost value.';
  }

  if (values.categories.length === 0) {
    errors.categories = 'Select at least one service or procurement category.';
  }

  if (!values.country.trim()) {
    errors.country = 'Country is required.';
  }

  if (!values.province.trim()) {
    errors.province = 'Province or state is required.';
  }

  if (!values.city.trim()) {
    errors.city = 'City or region is required.';
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

export function hasAgentFieldErrors(errors: AgentFieldErrors): boolean {
  return Object.keys(errors).length > 0;
}

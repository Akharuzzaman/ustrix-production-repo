export const PERSONAL_EMAIL_DOMAINS = [
  'gmail.com',
  'googlemail.com',
  'yahoo.com',
  'ymail.com',
  'hotmail.com',
  'outlook.com',
  'live.com',
  'msn.com',
  'icloud.com',
  'me.com',
  'mac.com',
  'aol.com',
  'proton.me',
  'protonmail.com',
  'zoho.com',
  'mail.com',
  'gmx.com',
  'yandex.com',
];

export const ORGANIZATION_EMAIL_ERROR =
  'Organization accounts must be registered with a corporate email address. Personal email addresses can be added later for additional users.';

export const AGENT_ORGANIZATION_EMAIL_ERROR =
  'Organization or brokerage agent accounts must use a corporate email address. Personal emails are allowed only for individual agents.';

export function getEmailDomain(email: string): string {
  return email.trim().toLowerCase().split('@')[1] || '';
}

export function isPersonalEmailDomain(email: string): boolean {
  return PERSONAL_EMAIL_DOMAINS.includes(getEmailDomain(email));
}

export function isValidEmailFormat(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

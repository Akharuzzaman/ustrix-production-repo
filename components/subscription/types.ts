export type SubscriptionRole = 'buyer' | 'seller' | 'agent';

export type OwnerType = 'individual' | 'organization';

export type OwnerTypeOption = {
  value: OwnerType;
  title: string;
  description: string;
  accentColor: string;
};

export type SubscriptionRoleOption = {
  value: SubscriptionRole;
  title: string;
  description: string;
  accentColor: string;
  href: string;
};

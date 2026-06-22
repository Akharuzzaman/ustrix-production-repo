export type AgentType = 'INDIVIDUAL' | 'ORGANIZATION';

export type LeadCostType = 'PERCENTAGE' | 'FLAT';

export type ServiceCategory =
  | 'UTILITIES'
  | 'RENOVATION'
  | 'MAINTENANCE'
  | 'CLEANING'
  | 'HVAC'
  | 'GAS'
  | 'ELECTRICAL'
  | 'WATER'
  | 'PROPERTY_SERVICES'
  | 'GENERAL';

export type AgentTypeOption = {
  value: AgentType;
  label: string;
  description: string;
};

export type LeadCostTypeOption = {
  value: LeadCostType;
  label: string;
};

export type ServiceCategoryOption = {
  value: ServiceCategory;
  label: string;
};

export const AGENT_TYPE_OPTIONS: AgentTypeOption[] = [
  {
    value: 'INDIVIDUAL',
    label: 'Individual Agent / Broker',
    description: 'Independent agent submitting and managing procurement leads.',
  },
  {
    value: 'ORGANIZATION',
    label: 'Brokerage / Agency / Organization',
    description: 'Agency or brokerage operating leads on behalf of clients.',
  },
];

export const LEAD_COST_TYPE_OPTIONS: LeadCostTypeOption[] = [
  { value: 'PERCENTAGE', label: 'Percentage' },
  { value: 'FLAT', label: 'Flat Amount' },
];

export const SERVICE_CATEGORY_OPTIONS: ServiceCategoryOption[] = [
  { value: 'UTILITIES', label: 'Utilities' },
  { value: 'RENOVATION', label: 'Renovation' },
  { value: 'MAINTENANCE', label: 'Maintenance' },
  { value: 'CLEANING', label: 'Cleaning' },
  { value: 'HVAC', label: 'HVAC' },
  { value: 'GAS', label: 'Gas' },
  { value: 'ELECTRICAL', label: 'Electrical' },
  { value: 'WATER', label: 'Water' },
  { value: 'PROPERTY_SERVICES', label: 'Property Services' },
  { value: 'GENERAL', label: 'General Goods / Services' },
];

export function getAgentEmailHelperText(agentType: AgentType): string {
  return agentType === 'ORGANIZATION'
    ? 'Use a corporate email address for brokerage or agency accounts.'
    : 'Personal or corporate email is accepted for individual agents.';
}

export function getLeadCostPlaceholder(leadCostType: LeadCostType): string {
  return leadCostType === 'PERCENTAGE' ? 'Example: 5' : 'Example: 100';
}

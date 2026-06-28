export interface FeeFinanceSettingsDto {
  feeTypes: FeeTypeDto[];
  fineRules: FineRuleDto[];
  feeReminders: FeeReminderDto[];
}

export interface FeeTypeDto {
  id: string;
  feeName: string;
  frequency: string;
}

export interface FineRuleDto {
  id: string;
  fineType: string;
  value: number;
}

export interface FeeReminderDto {
  id: string;
  reminderFrequencyDays: number;
  isActive: boolean;
}

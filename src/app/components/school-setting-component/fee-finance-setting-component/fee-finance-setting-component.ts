import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FeeFinanceSettingsService } from '../../../proxy/fee-finance-settings/fee-finance-setting.service';
import { FeeFinanceSettingsDto, FeeTypeDto, FineRuleDto, FeeReminderDto } from '../../../proxy/fee-finance-settings/fee-finance-settings-dto';

interface FeeTypeDtoWithState extends FeeTypeDto { isEditing?: boolean; }
interface FineRuleDtoWithState extends FineRuleDto { isEditing?: boolean; }
interface FeeReminderDtoWithState extends FeeReminderDto { isEditing?: boolean; }

@Component({
  selector: 'app-fee-finance-setting-component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './fee-finance-setting-component.html',
  styleUrl: './fee-finance-setting-component.css'
})
export class FeeFinanceSettingComponent implements OnInit {
  private service = inject(FeeFinanceSettingsService);
  tenantId!: string;
  settings: FeeFinanceSettingsDto = { feeTypes: [], fineRules: [], feeReminders: [] };

  ngOnInit(): void {
    this.tenantId = localStorage.getItem('tenantId') ?? '';
    this.service.getFeeFinanceSettings(this.tenantId).subscribe({
      next: (res) => {
        this.settings = res;
      },
      error: (err) => console.error(err)
    });
  }

  saveAll(): void {
    this.service.createUpdateFeeFinanceSettings(this.tenantId, this.settings).subscribe({
      next: () => alert('Settings Saved!'),
      error: (err) => console.error(err)
    });
  }

  addFeeType() { this.settings.feeTypes.push({ id: '', feeName: '', frequency: 'Monthly' } as FeeTypeDtoWithState); }
  removeFeeType(i: number) { this.settings.feeTypes.splice(i, 1); }

  addFineRule() { this.settings.fineRules.push({ id: '', fineType: 'Percentage', value: 0 } as FineRuleDtoWithState); }
  removeFineRule(i: number) { this.settings.fineRules.splice(i, 1); }

  addReminder() { this.settings.feeReminders.push({ id: '', reminderFrequencyDays: 7, isActive: true } as FeeReminderDtoWithState); }
  removeReminder(i: number) { this.settings.feeReminders.splice(i, 1); }
}

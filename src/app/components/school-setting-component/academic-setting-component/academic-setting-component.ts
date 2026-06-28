import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SchoolAcademicSettingService } from '../../../proxy/school-academic-settings/school-academic-setting.service';
import {
  AcademicSettingsDto,
  CreateUpdateAcademicSettingsDto,
  GradePolicyDto,
  SchoolPromotionRuleDto,
  SchoolClassesDto,
  SchoolSectionDto,
  SchoolSubjectDto,
  SchoolRuleDto,
  SchoolFilterDto
} from '../../../proxy/school-academic-settings/academic-settings-dto';

interface WithState { isEditing?: boolean; }
interface GradePolicyDtoWithState extends GradePolicyDto, WithState {}
interface SchoolPromotionRuleDtoWithState extends SchoolPromotionRuleDto, WithState {}
interface SchoolClassesDtoWithState extends SchoolClassesDto, WithState {}
interface SchoolSectionDtoWithState extends SchoolSectionDto, WithState {}
interface SchoolSubjectDtoWithState extends SchoolSubjectDto, WithState {}
interface SchoolRuleDtoWithState extends SchoolRuleDto, WithState {}
interface SchoolFilterDtoWithState extends SchoolFilterDto, WithState {}

interface AcademicSettingsDtoWithState extends AcademicSettingsDto {
  gradePolicies: GradePolicyDtoWithState[];
  schoolPromotionRules: SchoolPromotionRuleDtoWithState[];
  schoolClasses: SchoolClassesDtoWithState[];
  schoolSections: SchoolSectionDtoWithState[];
  schoolSubjects: SchoolSubjectDtoWithState[];
  schoolRules: SchoolRuleDtoWithState[];
  schoolFilters: SchoolFilterDtoWithState[];
}

@Component({
  selector: 'app-academic-setting-component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './academic-setting-component.html',
  styleUrl: './academic-setting-component.css'
})
export class AcademicSettingComponent implements OnInit {
  private academicSettingService = inject(SchoolAcademicSettingService);
  academicSettings: AcademicSettingsDtoWithState | null = null;
  tenantId!: string;
  isMasterAdmin: boolean = false;
  filterOperators = ['>', '<', '>=', '<=', '=='];

  ngOnInit(): void {
    this.tenantId = localStorage.getItem('tenantId') ?? '';
    this.isMasterAdmin = !this.tenantId; // If empty string, master admin
    this.loadSettings();
  }

  loadSettings(): void {
    this.academicSettingService.getSchoolAcadmicSettings(this.tenantId).subscribe({
      next: (res: AcademicSettingsDto) => {
        this.academicSettings = {
          ...res,
          gradePolicies: res.gradePolicies.map(p => ({ ...p, isEditing: false })),
          schoolPromotionRules: res.schoolPromotionRules.map(r => ({ ...r, isEditing: false })),
          schoolClasses: res.schoolClasses.map(c => ({ ...c, isEditing: false })),
          schoolSections: (res.schoolSections || []).map(s => ({ ...s, isEditing: false })),
          schoolSubjects: res.schoolSubjects.map(s => ({ ...s, isEditing: false })),
          schoolRules: (res.schoolRules || []).map(r => ({ ...r, isEditing: false })),
          schoolFilters: (res.schoolFilters || []).map(f => ({ ...f, isEditing: false }))
        };
      },
      error: (err) => console.error('Failed to load academic settings', err)
    });
  }

  saveSettings(): void {
    if (!this.academicSettings) return;
    const dto: CreateUpdateAcademicSettingsDto = {
      gradePolicies: this.academicSettings.gradePolicies,
      schoolPromotionRules: this.academicSettings.schoolPromotionRules,
      schoolRules: this.academicSettings.schoolRules,
      schoolClasses: this.academicSettings.schoolClasses,
      schoolSections: this.academicSettings.schoolSections,
      schoolSubjects: this.academicSettings.schoolSubjects,
    };
    this.academicSettingService.createUpdateRules(this.tenantId, dto).subscribe(() => {
        alert('Academic Settings Saved');
        this.loadSettings();
    });
  }

  saveFilters(): void {
    if (!this.academicSettings) return;
    this.academicSettingService.createUpdateFilters(this.tenantId, this.academicSettings.schoolFilters).subscribe(() => {
        alert('Filters Saved');
        this.loadSettings();
    });
  }

  // Generic Edit Toggle
  toggleEdit(item: any, idField: string = 'id'): void {
    item.isEditing = !item.isEditing;
    if (!item.isEditing && !item[idField]) {
      // In a real app we let backend generate GUID, so we can leave it empty or temp
      // Just mark editing complete
    }
  }

  addGradePolicy(): void { this.academicSettings?.gradePolicies.unshift({ id: '', grade: '', fromPercent: 0, toPercent: 0, isEditing: true }); }
  removeGradePolicy(index: number): void { this.academicSettings?.gradePolicies.splice(index, 1); }

  addPromotionRule(): void { this.academicSettings?.schoolPromotionRules.unshift({ promotionId: '', ruleId: '', filterId: '', ruleName: '', filterKey: '>', filterValue: '', promotionValue: '0', isPercent: false, isEditing: true }); }
  removePromotionRule(index: number): void { this.academicSettings?.schoolPromotionRules.splice(index, 1); }

  addClass(): void { this.academicSettings?.schoolClasses.push({ id: '', className: '', isEditing: true }); }
  removeClass(i: number): void { this.academicSettings?.schoolClasses.splice(i, 1); }

  addSection(): void { this.academicSettings?.schoolSections.push({ id: '', appClassId: '', sectionName: '', sectionOrder: 0, description: '', isEditing: true }); }
  removeSection(i: number): void { this.academicSettings?.schoolSections.splice(i, 1); }

  addSubject(): void { this.academicSettings?.schoolSubjects.push({ id: '', classId: '', subjectName: '', className: '', isOptional: false, isEditing: true }); }
  removeSubject(i: number): void { this.academicSettings?.schoolSubjects.splice(i, 1); }

  addRule(): void { this.academicSettings?.schoolRules.push({ id: '', ruleName: '', isEditing: true }); }
  removeRule(i: number): void { this.academicSettings?.schoolRules.splice(i, 1); }

  addFilter(): void { this.academicSettings?.schoolFilters.push({ id: '00000000-0000-0000-0000-000000000000', filterKey: '', filterValue: '', isEditing: true }); }
  removeFilter(i: number): void { this.academicSettings?.schoolFilters.splice(i, 1); }
}

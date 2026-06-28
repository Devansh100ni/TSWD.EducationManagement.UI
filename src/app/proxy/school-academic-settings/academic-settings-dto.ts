export interface AcademicSettingsDto {
    gradePolicies: GradePolicyDto[];
    schoolPromotionRules: SchoolPromotionRuleDto[];
    schoolClasses: SchoolClassesDto[];
    schoolSections: SchoolSectionDto[];
    schoolSubjects: SchoolSubjectDto[];
    schoolRules: SchoolRuleDto[];
    schoolFilters: SchoolFilterDto[];
}

export interface GradePolicyDto {
  id: string;
  fromPercent: number;
  toPercent: number;
  grade: string;
}

export interface SchoolPromotionRuleDto {
  promotionId: string;
  ruleId: string;
  filterId: string;
  ruleName: string;
  filterKey: string;
  filterValue: string;
  promotionValue: string;
  isPercent: boolean;
}

export interface SchoolClassesDto {
  id: string;
  className: string;
}

export interface SchoolSectionDto {
  id: string;
  appClassId: string;
  sectionName: string;
  sectionOrder: number;
  description: string;
}

export interface SchoolSubjectDto {
  id: string;
  classId: string;
  subjectName: string;
  className: string;
  isOptional: boolean;
}

export interface SchoolRuleDto {
  id: string;
  ruleName: string;
}

export interface SchoolFilterDto {
  id: string;
  filterKey: string;
  filterValue: string;
}

export interface CreateUpdateAcademicSettingsDto {
    gradePolicies: GradePolicyDto[];
    schoolPromotionRules: SchoolPromotionRuleDto[];
    schoolRules: SchoolRuleDto[];
    schoolClasses: SchoolClassesDto[];
    schoolSections: SchoolSectionDto[];
    schoolSubjects: SchoolSubjectDto[];
}

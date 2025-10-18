export interface UpdateSchoolGeneralSettingDto {
  id: string; // Guid
  schoolName: string;
  schoolCode: string;
  address?: string | null;
  email?: string | null;
  phone?: string | null;
  logoUrl?: string | null;
}
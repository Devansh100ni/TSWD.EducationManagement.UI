export interface SchoolGeneralSettingDto {
  id: string; // Guid
  tenantId?: string | null; // Guid?
  schoolName: string;
  schoolCode: string;
  address?: string | null;
  email?: string | null;
  phone?: string | null;
  logoUrl?: string | null;
  timeZone?: string | null;
  dateFormat?: string | null;
}

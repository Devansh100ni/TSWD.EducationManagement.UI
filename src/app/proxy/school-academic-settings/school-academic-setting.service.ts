import { inject, Injectable } from '@angular/core';
import { RestService } from '../shared/rest.service';
import { AcademicSettingsDto } from './academic-settings-dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SchoolAcademicSettingService {
  private restService = inject(RestService);

  private readonly baseUrl = '/SchoolAcademicSettings';

  /**
   * Get school general settings by tenantId
   * @param tenantId - GUID of the tenant
   */
  getSchoolAcadmicSettings(tenantId: string): Observable<AcademicSettingsDto> {
    return this.restService.request<null, AcademicSettingsDto>({
      method: 'GET',
      url: `${this.baseUrl}/GetAcademicSettings/${tenantId}`,
    });
  }

  createUpdateRules(tenantId: string, dto: any): Observable<boolean> {
    return this.restService.request<any, boolean>({
      method: 'POST',
      url: `${this.baseUrl}/CreateUpdateRules/${tenantId}`,
      body: dto
    });
  }

  createUpdateFilters(tenantId: string, filters: any[]): Observable<boolean> {
    return this.restService.request<any[], boolean>({
      method: 'POST',
      url: `${this.baseUrl}/CreateUpdateFilters/${tenantId}`,
      body: filters
    });
  }
}

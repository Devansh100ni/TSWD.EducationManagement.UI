import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RestService } from '../shared/rest.service';
import { SchoolGeneralSettingDto } from './SchoolGeneralSettingDto';
import { UpdateSchoolGeneralSettingDto } from './UpdateSchoolGeneralSettingDto';

@Injectable({
  providedIn: 'root'
})
export class GeneralSettingsService {
  private restService = inject(RestService);

  private readonly baseUrl = '/SchoolSettings';

  /**
   * Get school general settings by tenantId
   * @param tenantId - GUID of the tenant
   */
  getSchoolGeneralSettings(tenantId: string): Observable<SchoolGeneralSettingDto> {
    return this.restService.request<null, SchoolGeneralSettingDto>({
      method: 'GET',
      url: `${this.baseUrl}/${tenantId}`
    });
  }

  /**
   * Update school general settings
   * @param input - DTO containing updated settings
   */
  updateSchoolGeneralSettings(input: UpdateSchoolGeneralSettingDto): Observable<SchoolGeneralSettingDto> {
    return this.restService.request<UpdateSchoolGeneralSettingDto, SchoolGeneralSettingDto>({
      method: 'PUT',
      url: this.baseUrl,
      body: input
    });
  }
}

import { inject, Injectable } from '@angular/core';
import { RestService } from '../shared/rest.service';
import { FeeFinanceSettingsDto } from './fee-finance-settings-dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FeeFinanceSettingsService {
  private restService = inject(RestService);

  private readonly baseUrl = '/FeeFinanceSettings';

  getFeeFinanceSettings(tenantId: string): Observable<FeeFinanceSettingsDto> {
    return this.restService.request<null, FeeFinanceSettingsDto>({
      method: 'GET',
      url: `${this.baseUrl}/GetFeeFinanceSettings/${tenantId}`,
    });
  }

  createUpdateFeeFinanceSettings(tenantId: string, dto: FeeFinanceSettingsDto): Observable<boolean> {
    return this.restService.request<FeeFinanceSettingsDto, boolean>({
      method: 'POST',
      url: `${this.baseUrl}/CreateUpdateFeeFinanceSettings/${tenantId}`,
      body: dto
    });
  }
}

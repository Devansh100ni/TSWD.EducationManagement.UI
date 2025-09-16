import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TenantDto } from './tenantdto';
import { PagedResult } from '../shared/pagedresult';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Result } from '../shared/result';

@Injectable({
  providedIn: 'root',
})
export class TenantService {
  baseApi = environment.apiBaseUrl;
  private apiUrl = `${environment.apiBaseUrl}/Tenants`;

  constructor(private http: HttpClient) {}

  getTenants(pageNumber: number, pageSize: number): Observable<PagedResult<TenantDto>> {
    const url = this.apiUrl + '/GetTenantList';

    const body = { pageNumber, pageSize };

    return this.http.post<PagedResult<TenantDto>>(url, body);
  }

  createOrUpdate(tenantData: any): Observable<Result<TenantDto>> {
    const url = `${this.apiUrl}/CreateOrUpdate`; // your POST endpoint
    return this.http.post<Result<TenantDto>>(url, tenantData);
  }

  getById(id: string): Observable<Result<TenantDto>> {
    const url = `${this.apiUrl}?id=${id}`; // your POST endpoint
    return this.http.get<Result<TenantDto>>(url);
  }
}

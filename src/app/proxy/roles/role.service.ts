import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { roleDto } from './roleDto';
import { PagedResult } from '../shared/pagedresult';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PermissionGroup } from './PermissionGroup';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  baseApi = environment.apiBaseUrl;
  private apiUrl = `${environment.apiBaseUrl}/role`;
  private http = inject(HttpClient);

  get(
    pageNumber: number,
    pageSize: number,
    tenantId?: string | null
  ): Observable<PagedResult<roleDto>> {
    const url = this.apiUrl + '/Get';
    let params = new HttpParams();

    if (tenantId) {
      params = params.set('tenantId', tenantId);
    }

    const body = { pageNumber, pageSize };

    return this.http.post<PagedResult<roleDto>>(url, body, { params });
  }

  getPermissions(): Observable<PermissionGroup[]> {
    const url = this.apiUrl + '/GetPermissions';
    return this.http.get<PermissionGroup[]>(url);
  }

  createOrUpdate(data: any) {
    const url = this.apiUrl + '/createUpdate';
    return this.http.post(url, data);
  }

  getById(id: string) {
    return this.http.get(`/api/roles/${id}`);
  }
}

import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { PagedResult } from '../shared/pagedresult';
import { UsersDtos } from './usersdtos';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiBaseUrl}/Users`;

  GetAllUsers(
    pageNumber: number,
    pageSize: number,
    tenantId?: string | null
  ): Observable<PagedResult<UsersDtos>> {
    let params = new HttpParams();

    if (tenantId) {
      params = params.set('tenantId', tenantId);
    }

    const body = { pageNumber, pageSize };

    return this.http.post<PagedResult<UsersDtos>>(this.apiUrl, body, { params });
  }
}

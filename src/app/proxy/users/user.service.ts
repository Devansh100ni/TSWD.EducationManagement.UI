import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { PagedResult } from '../shared/pagedresult';
import { UsersDtos } from './usersdtos';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { RestService } from '../shared/rest.service';
import { Result } from '../shared/result';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  private cookieService = inject(CookieService);
  constructor(private restService: RestService) {}

  GetAllUsers(
    pageNumber: number,
    pageSize: number,
    tenantId?: string | null
  ): Observable<PagedResult<UsersDtos>> {
    return this.restService.request<any, PagedResult<UsersDtos>>({
      method: 'POST',
      url: '/Users', // <-- adjust URL if needed
      params: { tenantId },
      body: { pageNumber, pageSize },
    });
  }

  createUpdateUser(data: any): Observable<UsersDtos> {
    return this.restService.request<any, UsersDtos>({
      method: 'POST',
      url: '/Users/CreateUpdateUser', // <-- adjust URL if needed
      body: data,
    });
  }

  getUserById(id:string): Observable<Result<UsersDtos>>{
     return this.restService.request<any, Result<UsersDtos>>({
      method: 'GET',
      url: '/Users/GetUserById', // <-- adjust URL if needed
      params: { id }
    });
  }

  searchUsers(query:any): Observable<PagedResult<UsersDtos>>{
    console.log(query)
     return this.restService.request<any, PagedResult<UsersDtos>>({
      method: 'POST',
      url: '/Users', // <-- adjust URL if needed
      params: { tenantId: 'ec6ebd89-1c82-4e1e-956b-57270e084de9' },
      body: { pageNumber: 1, pageSize: 10 },
    });
  }
}

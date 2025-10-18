import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RestConfig } from './rest-config';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../auth/auth-service';
import { LoaderService } from './loader-service';
import { ToastService } from './toast-service';
import { ConstantsClass } from './constants.class';

@Injectable({
  providedIn: 'root',
})
export class RestService {
  private defaultApiBaseUrl = environment.apiBaseUrl; // <-- your API base URL

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private auth: AuthService,
    private loader: LoaderService,
    private toaster: ToastService
  ) {}

  request<TInput, TOutput>(
    options: {
      method: 'GET' | 'POST' | 'PUT' | 'DELETE';
      url: string;
      params?: Record<string, any>;
      body?: TInput;
    },
    config?: RestConfig
  ): Observable<TOutput> {
    const apiBaseUrl = config?.apiBaseUrl || this.defaultApiBaseUrl;

    const token = this.cookieService.get('AuthCookie');

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    if (token) {
      headers = headers.set('Authorization', token);
    }

    if (config?.headers) {
      config.headers.keys().forEach((key) => {
        headers = headers.set(key, config.headers!.get(key)!);
      });
    }

    let httpParams = new HttpParams();
    if (options.params) {
      Object.keys(options.params).forEach((key) => {
        const value = options.params![key];
        if (value !== undefined && value !== null) {
          httpParams = httpParams.set(key, value);
        }
      });
    }

    const fullUrl = `${apiBaseUrl}${options.url}`;
    let http$: Observable<TOutput>;
    switch (options.method) {
      case 'GET':
        http$ = this.http.get<TOutput>(fullUrl, { headers, params: httpParams });
        break;
      case 'POST':
        http$ = this.http.post<TOutput>(fullUrl, options.body, { headers, params: httpParams });
        break;
      case 'PUT':
        http$ = this.http.put<TOutput>(fullUrl, options.body, { headers, params: httpParams });
        break;
      case 'DELETE':
        http$ = this.http.delete<TOutput>(fullUrl, { headers, params: httpParams });
        break;
      default:
        throw new Error(`Unsupported HTTP method: ${options.method}`);
    }

    return http$.pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 0) {
          // API or network issue
          this.toaster.error(ConstantsClass.ApiDown);
        } else if (error.status === 401) {
          this.toaster.error(ConstantsClass.Unauthorized);
          //this.auth.logout();
        } else {
          const msg = error.error?.message || error.message || ConstantsClass.UnknownError ;
          this.toaster.error(`Error: ${msg}`);
        }
        this.loader.hide();
        return throwError(() => error);
      })
    );
  }
}

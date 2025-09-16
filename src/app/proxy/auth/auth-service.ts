import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Result } from '../shared/result';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginRequest } from './loginrequest';
import { environment } from '../../../environments/environment';
import { User } from './User';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private cookieService = inject(CookieService);
  private router = inject(Router);
  $user = new BehaviorSubject<User | undefined>(undefined);

  private readonly apiUrl = `${environment.apiBaseUrl}/authentication`;

  login(request: LoginRequest): Observable<Result<string>> {
    return this.http.post<Result<string>>(this.apiUrl, request);
  }

  setUser(user: User): void {
    this.$user.next(user);
    localStorage.setItem("Email", user.email);
    localStorage.setItem("Role", user.role);
    localStorage.setItem("fName", user.firstName);
  }

  user(): Observable<User | undefined> {
    return this.$user.asObservable();
  }

  getUser(): User | undefined {
    const _email = localStorage.getItem("Email");
    const _Role = localStorage.getItem("Role");
    const _fName = localStorage.getItem("fName");
    if (_email && _Role && _fName) {
      const user: User = {
        email: _email,
        role: _Role,
        firstName: _fName
      };
      return user;
    }
    return undefined;
  }

  logout(): void {
    localStorage.clear();
    const options = {
      path: '/',  // or the specific path used when setting the cookie
      // if you used a domain, replace with your actual domain
    };

    // Delete the specific cookie
    this.cookieService.delete('AuthCookie', options.path);

    // Delete all cookies (this may not delete cookies with specific paths/domains)
    this.cookieService.deleteAll('/',);

    this.cookieService.delete("AuthCookie");
    this.cookieService.deleteAll();
    this.$user.next(undefined);
    this.router.navigateByUrl('');
  }

  handleError(error: any) {
    debugger
    if (error.status === 401) {
      this.logout();
      this.router.navigateByUrl('/login')

    } else {
      console.log(error);
    }
  }
}

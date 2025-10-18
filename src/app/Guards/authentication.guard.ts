import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../proxy/auth/auth-service';
import { jwtDecode } from 'jwt-decode';
import { JwtClaims } from '../proxy/auth/JwtClaims';

export const authenticationGuard: CanActivateFn = (route, state) => {
  const cookieService = inject(CookieService);
  var authService = inject(AuthService);
  const router = inject(Router);

  let token = cookieService.get('AuthCookie');

  if (token) {
    try {
      token = token.replace(/^bearer\s+/i, '');
      const decodedToken: JwtClaims = jwtDecode<JwtClaims>(token);

      // Check expiration
      const expirationTime = (decodedToken.exp ?? 0) * 1000;
      const currentTime = new Date().getTime();

      if (expirationTime < currentTime) {
        authService.logout();
        return router.navigateByUrl('/');
      }

      const user = {
        email:
          decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'] ?? '',
        role: decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] ?? '',
        firstName: decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] ?? '',
        userId:
          decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'] ??
          '',
        tenantId:
          decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/userdata'] ?? '',
      };

      authService.setUser(user);

      const allowedRoles = route.data['roles'] as string[] | undefined;
      if (allowedRoles && !allowedRoles.includes(user.role)) {
        return router.parseUrl('/'); // or redirect to dashboard
      }

      return true;
    } catch (error) {
      authService.handleError(error);
    }
  } else {
    authService.logout();
    return router.navigateByUrl('/');
  }

  return false;
};

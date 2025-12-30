import { Routes } from '@angular/router';
import { LoginComponent } from './components/login-component/login-component';
import { LayoutComponent } from './components/layout-component/layout-component';
import { authenticationGuard } from './Guards/authentication.guard';
import { DashboardComponent } from './components/dashboard-component/dashboard-component';
import { TenantsComponent } from './components/tenants-component/tenants-component';
import { TenantDetailsComponent } from './components/tenant-details-component/tenant-details-component';
import { SchoolSettingComponent } from './components/school-setting-component/school-setting-component';
import { ClassSectionSettingComponent } from './components/class-section-setting-component/class-section-setting-component';
import { PreHomeComponent } from './pre-home/pre-home-component/pre-home-component';
import { LandingComponent } from './pre-home/landing-component/landing-component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full',
  },
  {
    path: 'landing',
    component: PreHomeComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: LandingComponent,
      }
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'home',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: LayoutComponent,
    canActivate: [authenticationGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [authenticationGuard],
      },
      {
        path: 'tenants',
        component: TenantsComponent,
        canActivate: [authenticationGuard],
        data: { animation: 'slide', roles: ['ApplicationAdministrator']  },
      },
      {
        path: 'tenant-details/:id',
        component: TenantDetailsComponent,
        canActivate: [authenticationGuard],
        data: { animation: 'slide', roles: ['ApplicationAdministrator']  },
      },
      {
        path: 'school-settings',
        component: SchoolSettingComponent,
        canActivate: [authenticationGuard],
        data: { animation: 'slide', roles: ['Admin']  },
      },
      {
        path: 'classes-n-section-settings',
        component: ClassSectionSettingComponent,
        canActivate: [authenticationGuard],
        data: { animation: 'slide', roles: ['Admin']  },
      },
    ],
  },
];

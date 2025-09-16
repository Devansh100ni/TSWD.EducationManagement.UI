import { Routes } from '@angular/router';
import { LoginComponent } from './components/login-component/login-component';
import { LayoutComponent } from './components/layout-component/layout-component';
import { authenticationGuard } from './Guards/authentication.guard';
import { DashboardComponent } from './components/dashboard-component/dashboard-component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
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
    ],
  },
];

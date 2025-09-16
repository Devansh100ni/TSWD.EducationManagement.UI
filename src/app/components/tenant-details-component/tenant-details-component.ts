import { Component, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { TenantUsersComponent } from './tenant-users-component/tenant-users-component';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { TenantConfigurationComponent } from './tenant-configuration-component/tenant-configuration-component';
import { TenantRolesComponent } from './tenant-roles-component/tenant-roles-component';

@Component({
  selector: 'app-tenant-details-component',
  imports: [TenantUsersComponent, TenantConfigurationComponent, TenantRolesComponent, NgbNavModule],
  templateUrl: './tenant-details-component.html',
  styleUrl: './tenant-details-component.css',
})
export class TenantDetailsComponent {
  active = 1;
  constructor(public el: ElementRef, private router: Router) {}

  handeBack() {
    this.router.navigateByUrl('home/tenants');
  }
}

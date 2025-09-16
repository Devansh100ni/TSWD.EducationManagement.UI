import { NgClass } from '@angular/common';
import { Component, ElementRef, inject, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../../proxy/auth/auth-service';

@Component({
  selector: 'app-layout-component',
  imports: [RouterOutlet, NgClass],
  templateUrl: './layout-component.html',
  styleUrl: './layout-component.css',
})
export class LayoutComponent {
  sidebarActive = false;
  authService = inject(AuthService);
  
  logout() {
    this.authService.logout();
  }

  
  toggleSidebar(): void {
    this.sidebarActive = !this.sidebarActive;
  }
}

import { NgClass } from '@angular/common';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../proxy/auth/auth-service';
import gsap from 'gsap';
import { User } from '../../proxy/auth/User';
import { filter } from 'rxjs';

@Component({
  selector: 'app-layout-component',
  imports: [RouterOutlet, NgClass, RouterLink],
  templateUrl: './layout-component.html',
  styleUrl: './layout-component.css',
})
export class LayoutComponent implements OnInit {
  sidebarActive = false;
  authService = inject(AuthService);
  user: User | undefined;
  @ViewChild('outlet') outlet!: RouterOutlet;
  activeRoute: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.user = this.authService.getUser();

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.activeRoute = event.urlAfterRedirects || event.url;
        this.setActiveNavItem();
      });

    // Set initial active route
    this.activeRoute = this.router.url;
    this.setActiveNavItem();
  }

  private setActiveNavItem() {
    const navItems = document.querySelectorAll('#sideNavItems li');
    navItems.forEach((item) => item.classList.remove('active'));

    // Add active class based on current route
    if (this.activeRoute.includes('/dashboard')) {
      document.querySelector('#item-dashboard')?.classList.add('active');
    } else if (this.activeRoute.includes('/tenants')) {
      document.querySelector('#item-tenants')?.classList.add('active');
    } else if (this.activeRoute.includes('/users')) {
      document.querySelector('#item-users')?.classList.add('active');
    }
    // Add more conditions for other routes
  }
  isActive(route: string): boolean {
    return this.activeRoute.includes(route);
  }
  isExactActive(route: string): boolean {
    return this.activeRoute === route;
  }

  logout() {
    this.authService.logout();
  }

  toggleSidebar(): void {
    this.sidebarActive = !this.sidebarActive;
  }

  onActivate(component: any) {
    if (component.el) {
      const el = component.el.nativeElement;

      // Reset starting position
      gsap.set(el, { x: '100%', opacity: 0 });

      // Slide in
      gsap.to(el, {
        x: '0%',
        opacity: 1,
        duration: 0.5,
        ease: 'power2.out',
      });
    }
  }
}

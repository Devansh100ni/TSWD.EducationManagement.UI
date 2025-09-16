import { NgClass } from '@angular/common';
import { Component, ElementRef, inject, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../proxy/auth/auth-service';
import gsap from 'gsap';

@Component({
  selector: 'app-layout-component',
  imports: [RouterOutlet, NgClass, RouterLink],
  templateUrl: './layout-component.html',
  styleUrl: './layout-component.css',
})
export class LayoutComponent {
  sidebarActive = false;
  authService = inject(AuthService);
   @ViewChild('outlet') outlet!: RouterOutlet;
  
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
        ease: 'power2.out'
      });
    }
  }
}

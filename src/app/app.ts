import { Component, OnInit, signal } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { LoaderComponent } from './shared/loader-component/loader-component';
import { TosterComponent } from './shared/toster-component/toster-component';
import { LoaderService } from './proxy/shared/loader-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoaderComponent, TosterComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('TSWD.EducationManagement.UI');

  constructor(private router: Router, private loaderService: LoaderService) { }

  ngOnInit() {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {
        this.showLoader();
      }
      if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
        this.hideLoader();
      }
    });
  }

  showLoader() {
    this.loaderService.show();
  }

  hideLoader() {
    // keep it for 2-3 secs then hide
    setTimeout(() => {
      this.loaderService.hide();
    }, 2000); // 2 seconds
  }
}

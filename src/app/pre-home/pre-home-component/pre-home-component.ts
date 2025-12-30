import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterOutlet, RouterLinkWithHref } from '@angular/router';
import LocomotiveScroll from 'locomotive-scroll';
import { NgbNavLink } from "../../../../node_modules/@ng-bootstrap/ng-bootstrap/index";

@Component({
  selector: 'app-pre-home-component',
  imports: [RouterOutlet, RouterLinkWithHref],
  templateUrl: './pre-home-component.html',
  styleUrl: './pre-home-component.css',
})
export class PreHomeComponent implements OnInit, AfterViewInit {
  locoScroll!: LocomotiveScroll;
  lastScrollY = 0;

  constructor(private title: Title, private meta: Meta) {}

  ngOnInit() {
    this.title.setTitle('CodeArdra Solutions');

    this.meta.updateTag({
      name: 'description',
      content: 'User profile page of My Angular App',
    });

    this.changeFavicon('/CodeArdra_Solutions_logo_dark_edited.png');
  }

  ngAfterViewInit() {
    this.locoScroll = new LocomotiveScroll({
      el: document.querySelector('[data-scroll-container]') as HTMLElement,
      smooth: true
    });

    this.syncNavbarWithLocoScroll();
  }

  syncNavbarWithLocoScroll() {
    const navbar = document.getElementById('mainNavbar');
    if (!navbar) return;

    this.locoScroll.on('scroll', (args: any) => {
      const scrollY = args.scroll.y;
      
      // Add shadow when scrolled
      if (scrollY > 50) {
        navbar.classList.add('navbar-scrolled');
      } else {
        navbar.classList.remove('navbar-scrolled');
      }
    });
  }

  changeFavicon(iconPath: string) {
    const link: HTMLLinkElement =
      document.querySelector("link[rel*='icon']") || document.createElement('link');

    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = iconPath;

    document.getElementsByTagName('head')[0].appendChild(link);
  }
}

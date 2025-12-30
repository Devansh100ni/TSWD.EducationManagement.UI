import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { SchoolManagementInnerLanding } from "./inner-components/school-management-inner-landing/school-management-inner-landing";
import { ModulesInnerLanding } from "./inner-components/modules-inner-landing/modules-inner-landing";
import { ReviewsInnerLanding } from "./inner-components/reviews-inner-landing/reviews-inner-landing";
import { FaqsInnerLanding } from "./inner-components/faqs-inner-landing/faqs-inner-landing";
import { StartTodayInnerLanding } from "./inner-components/start-today-inner-landing/start-today-inner-landing";
import { FooterInnerLanding } from "./inner-components/footer-inner-landing/footer-inner-landing";

@Component({
  selector: 'app-landing-component',
  imports: [SchoolManagementInnerLanding, ModulesInnerLanding, ReviewsInnerLanding, FaqsInnerLanding, StartTodayInnerLanding, FooterInnerLanding],
  templateUrl: './landing-component.html',
  styleUrl: './landing-component.css',
})
export class LandingComponent implements AfterViewInit {
  @ViewChild('track', { static: true }) track!: ElementRef<HTMLElement>;
  @ViewChild('wrap', { static: true }) wrap!: ElementRef<HTMLElement>;
  @ViewChild('prev', { static: true }) prev!: ElementRef<HTMLButtonElement>;
  @ViewChild('next', { static: true }) next!: ElementRef<HTMLButtonElement>;
  @ViewChild('dots', { static: true }) dotsBox!: ElementRef<HTMLElement>;

  @ViewChildren('card') cardRefs!: QueryList<ElementRef<HTMLElement>>;

  current = 0;
  private sx = 0;
  private sy = 0;

  private autoPlayTimer: any;
  autoPlayDelay = 6000;
  isPaused = false;

  /* ------------------ Demo Data ------------------ */

  cards = [
    {
      title: 'Custom Education ERP',
      desc: 'A fully configurable ERP built around your academic, administrative, and financial workflows.',
      bg: 'landing/CustomEducationERP.png',
      thumb: 'landing/CustomEducationERP_thumb.png',
    },
    {
      title: 'AI-Powered Insights',
      desc: 'Leverage AI for attendance trends, performance analytics, predictive reporting, and smart decision-making.',
      bg: 'landing/AIPoweredInsights.png',
      thumb: 'landing/AIPoweredInsights_thumb.png',
    },
    {
      title: 'Multi-School Management',
      desc: 'Manage multiple schools, branches, or campuses from a single centralized dashboard with role-based access.',
      bg: 'landing/MultiSchoolManagement.png',
      thumb: 'landing/MultiSchoolManagement_thumb.png',
    },
    {
      title: 'Student Lifecycle Automation',
      desc: 'From admissions to academics, exams, fees, and certificates—everything connected and automated.',
      bg: 'landing/StudentLifecycleAutomation.png',
      thumb: 'landing/StudentLifecycleAutomation_thumb.png',
    },
    {
      title: 'Secure & Scalable Platform',
      desc: 'Enterprise-grade security, cloud-ready architecture, and scalability that grows with your institution.',
      bg: 'landing/SecureScalablePlatform.png',
      thumb: 'landing/SecureScalablePlatform_thumb.png',
    },
  ];

  /* ------------------ Lifecycle ------------------ */

  ngAfterViewInit(): void {
    this.createDots();
    this.toggleUI(0);
    this.center(0);

    if (this.isMobile()) {
      this.dotsBox.nativeElement.hidden = true;
    }

    this.startAutoPlay();
  }

  startAutoPlay(): void {
    this.clearAutoPlay();

    this.autoPlayTimer = setInterval(() => {
      if (!this.isPaused) {
        this.goInfinite(1);
      }
    }, this.autoPlayDelay);
  }

  clearAutoPlay(): void {
    if (this.autoPlayTimer) {
      clearInterval(this.autoPlayTimer);
      this.autoPlayTimer = null;
    }
  }

  goInfinite(step: number): void {
    let index = this.current + step;

    if (index >= this.cardsEl.length) {
      index = 0; // loop to first
    }

    if (index < 0) {
      index = this.cardsEl.length - 1; // loop to last
    }

    this.activate(index, true);
  }

  /* ------------------ Helpers ------------------ */

  private isMobile(): boolean {
    return window.matchMedia('(max-width:767px)').matches;
  }

  private get cardsEl(): HTMLElement[] {
    return this.cardRefs.map((c) => c.nativeElement);
  }

  private get dots(): HTMLElement[] {
    return Array.from(this.dotsBox.nativeElement.children) as HTMLElement[];
  }

  /* ------------------ Core Logic ------------------ */

  createDots(): void {
    this.cards.forEach((_, i) => {
      const dot = document.createElement('span');
      dot.className = 'dot';
      dot.onclick = () => this.activate(i, true);
      this.dotsBox.nativeElement.appendChild(dot);
    });
  }

  center(i: number): void {
    const card = this.cardsEl[i];
    const wrap = this.wrap.nativeElement;

    const axis = this.isMobile() ? 'top' : 'left';
    const size = this.isMobile() ? 'clientHeight' : 'clientWidth';
    const start = this.isMobile() ? card.offsetTop : card.offsetLeft;

    wrap.scrollTo({
      [axis]: start - (wrap[size] / 2 - card[size] / 2),
      behavior: 'smooth',
    } as ScrollToOptions);
  }

  toggleUI(i: number): void {
    this.cardsEl.forEach((c, k) => c.toggleAttribute('active', k === i));

    this.dots.forEach((d, k) => d.classList.toggle('active', k === i));

    this.prev.nativeElement.disabled = i === 0;
    this.next.nativeElement.disabled = i === this.cardsEl.length - 1;
  }

  activate(i: number, scroll: boolean): void {
    if (i === this.current) return;

    this.current = i;
    this.toggleUI(i);
    if (scroll) this.center(i);
  }

  go(step: number): void {
    // const index = Math.min(Math.max(this.current + step, 0), this.cardsEl.length - 1);
    // this.activate(index, true);

    this.goInfinite(step);
  }

  /* ------------------ Hover ------------------ */

  onHover(i: number): void {
    if (window.matchMedia('(hover:hover)').matches) {
      this.isPaused = true;
      this.activate(i, true);
    }
  }

  /* ------------------ Touch ------------------ */

  onTouchStart(e: TouchEvent): void {
    this.sx = e.touches[0].clientX;
    this.sy = e.touches[0].clientY;
  }

  onTouchEnd(e: TouchEvent): void {
    const dx = e.changedTouches[0].clientX - this.sx;
    const dy = e.changedTouches[0].clientY - this.sy;

    if (this.isMobile() ? Math.abs(dy) > 60 : Math.abs(dx) > 60) {
      this.go((this.isMobile() ? dy : dx) > 0 ? -1 : 1);
    }
  }

  /* ------------------ Keyboard & Resize ------------------ */

  @HostListener('window:keydown', ['$event'])
  onKeydown(e: KeyboardEvent): void {
    if (['ArrowRight', 'ArrowDown'].includes(e.key)) this.go(1);
    if (['ArrowLeft', 'ArrowUp'].includes(e.key)) this.go(-1);
  }

  @HostListener('window:resize')
  onResize(): void {
    this.center(this.current);
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.isPaused = false;
  }
}

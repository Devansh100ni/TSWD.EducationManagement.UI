import { Component, ElementRef, ViewChild } from '@angular/core';
import { LoaderService } from '../../proxy/shared/loader-service';
import gsap from 'gsap';

@Component({
  selector: 'app-loader-component',
  imports: [],
  templateUrl: './loader-component.html',
  styleUrl: './loader-component.css',
})
export class LoaderComponent {
  @ViewChild('preloaderContainer', { static: true }) loaderOverlay!: ElementRef;

  constructor(private loaderService: LoaderService) {}

  ngOnInit() {
    this.createPreloader();
    this.loaderService.loaderState$.subscribe((isVisible) => {
      if (isVisible) {
        this.show();
      } else {
        this.hide();
      }
    });
  }

  private show() {
    gsap.to(this.loaderOverlay.nativeElement, {
      duration: 0.5,
      autoAlpha: 1,
      ease: 'power2.out',
    });
  }

  private hide() {
    gsap.to(this.loaderOverlay.nativeElement, {
      duration: 0.5,
      autoAlpha: 0,
      ease: 'power2.in',
    });
  }

  createPreloader() {
    const options = {
      radius: 42,
      dotSize: 15,
      dotCount: 10,
      colors: ['green', 'red', 'purple', 'blue'],
      boxOpacity: 0.2,
      boxBorder: '1px solid #AAA',
      animationOffset: 1.8,
    };

    const element = this.loaderOverlay.nativeElement;
    const box = document.createElement('div');
    const dots: HTMLElement[] = [];

    gsap.set(element, {
      position: 'fixed',
      top: '0',
      left: '0',
      perspective: 600,
      overflow: 'hidden',
      zIndex: 2000,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(81, 78, 78, 0.6)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      pointerEvents: 'all',
    });

    const animation = gsap.timeline({ paused: true });
    animation.from(
      box,
      { opacity: 0, scale: 0.1, duration: 0.2, ease: 'back.out(1.7)' },
      options.animationOffset
    );

    // dots
    for (let i = 0; i < options.dotCount; i++) {
      const dot = document.createElement('div');
      element.appendChild(dot);
      gsap.set(dot, {
        width: options.dotSize,
        height: options.dotSize,
        transformOrigin: `${-options.radius}px 0px`,
        x: options.radius,
        backgroundColor: options.colors[i % options.colors.length],
        borderRadius: '50%',
        position: 'absolute',
        rotation: i * (360 / options.dotCount),
      });
      dot.className = 'preloader-dot';
      dots.push(dot);

      animation.from(
        dot,
        { scale: 0.01, opacity: 0, duration: 0.3, ease: 'power3.out' },
        options.animationOffset
      );

      const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.25 });
      options.colors.forEach((color, j) => {
        tl.to(dot, { rotation: '-=360', duration: 2.5, ease: 'power3.inOut' }, j * 2.9)
          .to(dot, { backgroundColor: color, duration: 1.2, ease: 'power1.inOut' }, 1.6 + 2.9 * j)
          .to(
            dot,
            { skewX: 45, duration: 0.6, yoyo: true, repeat: 1, ease: 'power2.inOut' },
            1.6 + 2.9 * j
          );
      });
      animation.add(tl, i * 0.07);
    }

    animation.play(options.animationOffset);
  }
}

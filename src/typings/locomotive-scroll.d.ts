declare module 'locomotive-scroll' {
  interface LocomotiveScrollOptions {
    el: HTMLElement;
    name?: string;
    smooth?: boolean;
    smoothMobile?: boolean;
    inertia?: number;
    getDirection?: boolean;
    getSpeed?: boolean;
    tablet?: { smooth: boolean };
    smartphone?: { smooth: boolean };
    [key: string]: any;
  }

  export default class LocomotiveScroll {
    constructor(options: LocomotiveScrollOptions);
    update(): void;
    destroy(): void;
    scrollTo(target: HTMLElement | string | number, options?: any): void;
    on(event: string, callback: (args?: any) => void): void;
    off(event: string, callback: (args?: any) => void): void;
  }
}

import { Injectable, TemplateRef } from '@angular/core';
import { Toast } from './toast';


@Injectable({
  providedIn: 'root'
})
export class ToastService {

  toasts: Toast[] = [];

  show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    this.toasts.push({ textOrTpl, ...options });
  }

  remove(toast: Toast) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }

  // helpers for different types
  success(message: string, delay = 3000) {
    this.show(message, { classname: 'bg-success text-light', delay });
  }

  error(message: string, delay = 3000) {
    this.show(message, { classname: 'bg-danger text-light', delay });
  }

  info(message: string, delay = 3000) {
    this.show(message, { classname: 'bg-info text-dark', delay });
  }

  warning(message: string, delay = 3000) {
    this.show(message, { classname: 'bg-warning text-dark', delay });
  }
}

import { Component, inject, TemplateRef } from '@angular/core';
import { NgbToast } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from '../../proxy/shared/toast-service';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-toster-component',
  imports: [NgbToast, NgTemplateOutlet ],
  templateUrl: './toster-component.html',
  styleUrl: './toster-component.css',
})
export class TosterComponent {
  constructor(public toastService: ToastService) {}

  isTemplate(toast: string | TemplateRef<any>): toast is TemplateRef<any> {
    return toast instanceof TemplateRef;
  }
}

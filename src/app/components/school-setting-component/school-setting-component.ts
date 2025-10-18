import { Component, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { GeneralSettingComponent } from './general-setting-component/general-setting-component';
import { AcademicSettingComponent } from "./academic-setting-component/academic-setting-component";
import { FeeFinanceSettingComponent } from "./fee-finance-setting-component/fee-finance-setting-component";
import { LibrarySettingComponent } from "./library-setting-component/library-setting-component";

@Component({
  selector: 'app-school-setting-component',
  imports: [NgbNavModule, GeneralSettingComponent, AcademicSettingComponent, FeeFinanceSettingComponent, LibrarySettingComponent],
  templateUrl: './school-setting-component.html',
  styleUrl: './school-setting-component.css',
})
export class SchoolSettingComponent {
  active = 1;
  constructor(public el: ElementRef, private router: Router) {}
}

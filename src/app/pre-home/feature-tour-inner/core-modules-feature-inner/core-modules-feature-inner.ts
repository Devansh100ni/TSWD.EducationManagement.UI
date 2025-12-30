import { Component } from '@angular/core';

@Component({
  selector: 'app-core-modules-feature-inner',
  imports: [],
  templateUrl: './core-modules-feature-inner.html',
  styleUrl: './core-modules-feature-inner.css',
})
export class CoreModulesFeatureInner {
  columns = 3;

  coreModules = [
    { title: 'Student / Teacher Login', icon: 'core-modules/studentparentslogin.svg', href: '#' },
    { title: 'Student / Parents Login', icon: 'core-modules/studentlogin.svg', href: '#' },
    { title: 'Attendance Management', icon: 'core-modules/attendencemanagement.svg', href: '#' },
    { title: 'Time-table', icon: 'core-modules/timetable.svg', href: '#' },
    { title: 'News Management', icon: 'core-modules/newspaper.svg', href: '#' },
    { title: 'Messaging System', icon: 'core-modules/messaging.svg', href: '#' },
    { title: 'Courses & Batches', icon: 'core-modules/cources.svg', href: '#' },
    { title: 'Finance', icon: 'core-modules/finance.svg', href: '#' },
    { title: 'Examination', icon: 'core-modules/exam.svg', href: '#' },
    { title: 'User Management', icon: 'core-modules/user-management.svg', href: '#' },
    { title: 'Report Center', icon: 'core-modules/reporting.svg', href: '#' },
    { title: 'Student Information', icon: 'core-modules/studentinformation.svg', href: '#' },
    { title: 'Certificate Generator', icon: 'core-modules/certificate-generator.svg', href: '#' },
    { title: 'ID Card Generator', icon: 'core-modules/id-card-generator.svg', href: '#' },
    { title: 'Email / SMS Integration', icon: 'core-modules/emailsms.svg', href: '#' },
    { title: 'School Events / Calandar', icon: 'core-modules/schoolevents.svg', href: '#' },
    { title: 'Gradebook', icon: 'core-modules/gradebook.svg', href: '#' },
   
  ];

  getColumnItems(columnIndex: number) {
    return this.coreModules.filter((_, index) => index % this.columns === columnIndex);
  }
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-add-on-modules-feature-inner',
  imports: [],
  templateUrl: './add-on-modules-feature-inner.html',
  styleUrl: './add-on-modules-feature-inner.css',
})
export class AddOnModulesFeatureInner {
  columns = 3;

  coreModules = [
    { title: 'Custom & Bulk Import', icon: 'addon-modules/bulk-import.svg', href: '#' },
    { title: 'Custom Reports', icon: 'addon-modules/custom-report.svg', href: '#' },
    { title: 'Gallery', icon: 'addon-modules/gallery.svg', href: '#' },
    { title: 'Discussion', icon: 'addon-modules/discussion.svg', href: '#' },
    { title: 'Data Export', icon: 'addon-modules/export.svg', href: '#' },
    {
      title: 'Student Assignment Management',
      icon: 'addon-modules/assignment.svg',
      href: '#',
    },
    { title: 'Google SSO', icon: 'addon-modules/sso.svg', href: '#' },
    { title: 'Form Builder', icon: 'addon-modules/studentparentslogin.svg', href: '#' },
    { title: 'Reminder', icon: 'addon-modules/studentparentslogin.svg', href: '#' },
    { title: 'Enquiry & Registration', icon: 'addon-modules/studentparentslogin.svg', href: '#' },
    { title: 'Google Meet Integration', icon: 'addon-modules/studentparentslogin.svg', href: '#' },
    { title: 'Google Docs', icon: 'addon-modules/studentparentslogin.svg', href: '#' },
    { title: 'Gate Management', icon: 'addon-modules/studentparentslogin.svg', href: '#' },
    {
      title: 'Smart AI Timetable Generator',
      icon: 'addon-modules/studentparentslogin.svg',
      href: '#',
    },
    { title: 'Student / Teacher Login', icon: 'addon-modules/studentparentslogin.svg', href: '#' },
    { title: 'Inventory Management', icon: 'addon-modules/inventory-management.svg', href: '#' },
    { title: 'Library Management', icon: 'addon-modules/library-management.svg', href: '#' },
    { title: 'Data Management', icon: 'addon-modules/library-management.svg', href: '#' },
    { title: 'E-Book Section', icon: 'addon-modules/library-management.svg', href: '#' },
    { title: 'Payroll system', icon: 'addon-modules/library-management.svg', href: '#' },
  ];

  getColumnItems(columnIndex: number) {
    return this.coreModules.filter((_, index) => index % this.columns === columnIndex);
  }
}

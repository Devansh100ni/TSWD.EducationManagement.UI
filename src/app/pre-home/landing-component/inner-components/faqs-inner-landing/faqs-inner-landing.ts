import { Component } from '@angular/core';

interface Faq {
  question: string;
  answer: string;
}

@Component({
  selector: 'app-faqs-inner-landing',
  imports: [],
  templateUrl: './faqs-inner-landing.html',
  styleUrl: './faqs-inner-landing.css'
})
export class FaqsInnerLanding {
faqs: Faq[] = [
    {
      question: 'What is the Education Management System?',
      answer:
        'It is an all-in-one digital platform designed to manage academic, administrative, and operational processes for educational institutions.'
    },
    {
      question: 'Is the system customizable for my institution?',
      answer:
        'Yes, our system offers a fully customizable ERP that adapts to your institution’s unique workflows and requirements.'
    },
    {
      question: 'Can I manage multiple schools or branches?',
      answer:
        'Absolutely. The platform supports multi-school and multi-branch management with centralized control and role-based access.'
    },
    {
      question: 'Does the system support AI features?',
      answer:
        'Yes, AI-powered insights help with analytics, reporting, automation, and smart decision-making.'
    },
    {
      question: 'How secure is the platform?',
      answer:
        'We implement enterprise-grade security, data encryption, regular backups, and compliance with modern data protection standards.'
    }
  ];
}

import { Component, inject, OnInit, signal, TemplateRef, WritableSignal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../proxy/auth/auth-service';
import { LoginRequest } from '../../proxy/auth/loginrequest';
import { Result } from '../../proxy/shared/result';
import { ToastService } from '../../proxy/shared/toast-service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login-component',
  imports: [ReactiveFormsModule, FormsModule],
  providers: [NgbModalConfig, NgbModal],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  tenant: string = '';
  cookieService = inject(CookieService);

  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    config: NgbModalConfig,
    private auth: AuthService,
    private toastService: ToastService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(10)]],
      tenantName: [this.tenant],
    });
  }

  handleSubmit() {
    if (this.loginForm.valid) {
      const request: LoginRequest = this.loginForm.value;
      this.auth.login(request).subscribe({
        next: (res: Result<string>) => {
          if (res.success) {
            console.log('Token:', res.data);
            this.cookieService.set(
              'AuthCookie',
              `Bearer ${res.data}`,
              undefined,
              '/',
              undefined,
              true,
              'Strict'
            );
            this.toastService.success('Logged in successfully', 5000);
            this.route.navigateByUrl('home');
          } else {
            this.toastService.error('Invalid Email & Password', 5000);
          }
        },
        error: (err) => {
          console.error(err);
        },
      });
    } else {
      const emailInvalid = this.loginForm.get('email')?.invalid;
      const passwordInvalid = this.loginForm.get('password')?.invalid;

      // ✅ Case: Both invalid
      if (emailInvalid && passwordInvalid) {
        this.toastService.error('Invalid email and password', 5000);
        return;
      }

      // ✅ Case: Only email invalid
      if (emailInvalid) {
        if (this.loginForm.get('email')?.errors?.['required']) {
          this.toastService.error('Email is required', 5000);
        } else if (this.loginForm.get('email')?.errors?.['email']) {
          this.toastService.error('Enter a valid email address', 5000);
        }
        return;
      }

      // ✅ Case: Only password invalid
      if (passwordInvalid) {
        if (this.loginForm.get('password')?.errors?.['required']) {
          this.toastService.error('Password is required', 5000);
        } else {
          this.toastService.error('Enter a valid password', 5000);
        }
        return;
      }
    }
  }

  handleForgotPassword() {
    alert('click forgot password');
  }

  open(content: TemplateRef<any>) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then((result) => {
        console.log(result);
      });
  }

  saveTenant(modal: any) {
    this.loginForm.patchValue({
      tenantName: this.tenant,
    });
    modal.close();
    if (this.tenant) {
      this.toastService.success(`Tanent Changed to ${this.tenant}`, 3000);
    }
  }

  handleClear() {
    this.tenant = '';
    this.loginForm.patchValue({
      tenantName: this.tenant,
    });
  }
}

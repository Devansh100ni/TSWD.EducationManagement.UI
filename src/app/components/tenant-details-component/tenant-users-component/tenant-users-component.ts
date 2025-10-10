import { Component, inject, Inject, OnInit, TemplateRef } from '@angular/core';
import { UserService } from '../../../proxy/users/user.service';
import { ActivatedRoute } from '@angular/router';
import { UsersDtos } from '../../../proxy/users/usersdtos';
import { NgbModal, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-tenant-users-component',
  imports: [NgbPaginationModule, FormsModule, ReactiveFormsModule],
  templateUrl: './tenant-users-component.html',
  styleUrl: './tenant-users-component.css',
})
export class TenantUsersComponent implements OnInit {
  private modalService = inject(NgbModal);
  private fb = inject(FormBuilder);

  tenantId!: string;
  users: UsersDtos[] = [];
  form!: FormGroup;
  page = 1;
  pageSize = 10;
  collectionSize = 0;
  constructor(private userService: UserService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.tenantId = this.route.snapshot.paramMap.get('id') ?? '';

    this.route.paramMap.subscribe((params) => {
      this.tenantId = params.get('id') ?? '';
      console.log('Tenant ID:', this.tenantId);
    });
  }

  loadUsers() {
    this.userService.GetAllUsers(1, 10).subscribe((result) => {
      this.users = result.items;
      this.collectionSize = result.totalCount;
    });
  }

  buildForm() {
    this.form = this.fb.group({
    id: [null],
    tenantId: [null],
    roleId: [null],

    userName: ['', Validators.required],
    name: [''],
    surname: [''],

    email: ['', [Validators.required, Validators.email]],
    emailConfirmed: [false],

    passwordHash: [''],
    securityStamp: [crypto.randomUUID()],
    isExternal: [false],

    phoneNumber: [''],
    phoneNumberConfirmed: [false],

    isActive: [true],
    twoFactorEnabled: [false],

    lockoutEnd: [null],
    lockoutEnabled: [false],
    accessFailedCount: [0],

    shouldChangePasswordOnNextLogin: [false],
    entityVersion: [null],
    lastPasswordChangeTime: [null]
  });
  }

  open(content: TemplateRef<any>) {
    this.buildForm();
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  onSubmit(modal: any) {
    if (this.form.valid) {
      console.log('Form Value:', this.form.value);
      // this.userService.createOrUpdate(this.form.value).subscribe(...)
      modal.close('Save click');
    }
  }

  pageChange() {
    this.loadUsers();
  }
}

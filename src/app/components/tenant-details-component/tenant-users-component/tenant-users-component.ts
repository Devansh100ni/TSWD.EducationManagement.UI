import { Component, inject, Inject, OnInit, TemplateRef } from '@angular/core';
import { UserService } from '../../../proxy/users/user.service';
import { ActivatedRoute } from '@angular/router';
import { UsersDtos } from '../../../proxy/users/usersdtos';
import { NgbModal, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoaderService } from '../../../proxy/shared/loader-service';
import { RoleService } from '../../../proxy/roles/role.service';
import { roleDto } from '../../../proxy/roles/roleDto';

@Component({
  selector: 'app-tenant-users-component',
  imports: [NgbPaginationModule, FormsModule, ReactiveFormsModule],
  templateUrl: './tenant-users-component.html',
  styleUrl: './tenant-users-component.css',
})
export class TenantUsersComponent implements OnInit {
  private modalService = inject(NgbModal);
  private fb = inject(FormBuilder);
  private loader = inject(LoaderService);
  private userService = inject(UserService);
  private roleService = inject(RoleService);
  private route = inject(ActivatedRoute);

  tenantId!: string;
  users: UsersDtos[] = [];
  roles: roleDto[] = [];
  form!: FormGroup;
  page = 1;
  pageSize = 10;
  collectionSize = 0;

  ngOnInit(): void {
    this.tenantId = this.route.snapshot.paramMap.get('id') ?? '';

    this.route.paramMap.subscribe((params) => {
      this.tenantId = params.get('id') ?? '';
    });

    this.loadUsers();
    this.getRoles();
  }

  loadUsers() {
    this.loader.show();
    this.userService.GetAllUsers(this.page, this.pageSize, this.tenantId).subscribe((result) => {
      this.users = result.items;
      this.collectionSize = result.totalCount;
      this.loader.hide();
    });
  }

  buildForm() {
    this.form = this.fb.group({
      id: [null],
      tenantId: [this.tenantId, Validators.required],
      roleId: ['', Validators.required],

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
    });
  }

  open(content: TemplateRef<any>) {
    this.buildForm();
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  getRoles() {
    this.loader.show();
    this.roleService.getAllRoles(this.tenantId).subscribe((result) => {
      this.roles = result;
      this.loader.hide();
    });
  }

  onSubmit(modal: any) {
    if (this.form.valid) {
      this.loader.show();
      debugger
      console.log('Form Value:', this.form.value);
      this.userService.createUpdateUser(this.form.value).subscribe(() => {
        this.loadUsers();
        this.loader.hide();
      });
      modal.close('Save click');
    } else {
      alert('invalid form');
    }
  }

  pageChange() {
    this.loadUsers();
  }
}

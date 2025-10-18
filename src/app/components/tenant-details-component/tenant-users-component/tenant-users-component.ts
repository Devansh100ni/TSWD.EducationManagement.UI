import { Component, inject, Inject, OnInit, TemplateRef } from '@angular/core';
import { UserService } from '../../../proxy/users/user.service';
import { ActivatedRoute } from '@angular/router';
import { UsersDtos } from '../../../proxy/users/usersdtos';
import { NgbModal, NgbModalRef, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
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
import { ToastService } from '../../../proxy/shared/toast-service';
import { ConstantsClass } from '../../../proxy/shared/constants.class';
import { SearchComponent } from '../../../shared/search-component/search-component';
import { PagedResult } from '../../../proxy/shared/pagedresult';
import { map } from 'rxjs';

@Component({
  selector: 'app-tenant-users-component',
  imports: [NgbPaginationModule, FormsModule, ReactiveFormsModule, SearchComponent],
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
  private toast = inject(ToastService);

  tenantId!: string;
  userId?: string | null;
  roles: roleDto[] = [];
  users: UsersDtos[] = [];
  user?: UsersDtos | null = null;
  form!: FormGroup;
  page = 1;
  pageSize = 10;
  collectionSize = 0;
  modalRef!: NgbModalRef;
  selectedUser: any;
  //searchUsers = (query: any) => this.userService.searchUsers(query);
  
  searchUsers = (query: string) => {
    return this.userService
      .searchUsers(query)
      .pipe(map((pagedResult: PagedResult<UsersDtos>) => pagedResult.items || []));
  };

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

  buildForm(isDisableSomeFields: boolean = false) {
    this.form = this.fb.group({
      id: [this.user?.id],
      tenantId: [this.tenantId, Validators.required],
      roleId: [this.user?.roleId, Validators.required],

      userName: [
        { value: this.user?.userName, disabled: isDisableSomeFields },
        Validators.required,
      ],
      name: [this.user?.name],
      surname: [this.user?.surname],

      email: [
        { value: this.user?.email, disabled: isDisableSomeFields },
        [Validators.required, Validators.email],
      ],
      emailConfirmed: [false],

      passwordHash: [''],
      securityStamp: [crypto.randomUUID()],
      isExternal: [false],

      phoneNumber: [this.user?.phoneNumber],
      phoneNumberConfirmed: [false],

      isActive: [this.user?.isActive],
      twoFactorEnabled: [false],

      lockoutEnd: [null],
      lockoutEnabled: [false],
      accessFailedCount: [0],

      shouldChangePasswordOnNextLogin: [false],
    });
  }

  open(content: TemplateRef<any>) {
    this.buildForm();
    this.modalRef = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  handleEdit(id: any, content: TemplateRef<any>) {
    if (id === undefined || id === null) return;
    this.loader.show();
    this.userService.getUserById(id).subscribe((result) => {
      if (result.success) {
        this.userId = id;
        this.user = result?.data;
        this.buildForm(true);
        this.loader.hide();
        this.modalRef = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
      }
    });
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
      this.userService.createUpdateUser(this.form.value).subscribe(() => {
        this.loadUsers();
        this.loader.hide();
        this.closeModal(this.modalRef, 'Saved Data');
        if (this.userId) {
          this.toast.success(ConstantsClass.Success('User', 'updated'));
        } else {
          this.toast.success(ConstantsClass.Success('User', 'added'));
        }
      });
      modal.close('Save click');
    } else {
      this.toast.error(ConstantsClass.InvalidForm);
    }
  }

  pageChange() {
    this.loadUsers();
  }

  closeModal(modal: NgbModalRef, reason: string) {
    this.modalRef.result.finally(() => {
      this.user = null;
      this.userId = '';
      this.resetForm();
    });
    modal.dismiss(reason); // or modal.close(reason)
  }

  resetForm() {
    this.form.reset();
  }
}

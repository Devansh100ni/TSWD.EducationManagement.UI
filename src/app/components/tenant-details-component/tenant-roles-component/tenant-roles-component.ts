import { Component, inject, OnInit, TemplateRef } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgbModal, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { roleDto } from '../../../proxy/roles/roleDto';
import { RoleService } from '../../../proxy/roles/role.service';
import { LoaderService } from '../../../proxy/shared/loader-service';
import { PermissionGroup } from '../../../proxy/roles/PermissionGroup';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tenant-roles-component',
  imports: [NgbPaginationModule, FormsModule, ReactiveFormsModule],
  templateUrl: './tenant-roles-component.html',
  styleUrl: './tenant-roles-component.css',
})
export class TenantRolesComponent implements OnInit {
  private modalService = inject(NgbModal);
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  roles: roleDto[] = [];
  allPermissionGroups!: PermissionGroup[];
  form!: FormGroup;
  page = 1;
  pageSize = 10;
  collectionSize = 0;
  tenantId!: string;

  constructor(private roleService: RoleService, private loader: LoaderService) {}

  ngOnInit(): void {
    this.tenantId = this.route.snapshot.paramMap.get('id') ?? '';
    this.loadData();
  }

  loadData() {
    this.loader.show();
    this.roleService.get(this.page, this.pageSize, this.tenantId).subscribe((result: any) => {
      this.roles = result.items;
      this.collectionSize = result.totalCount;
      this.loader.hide();
    });
  }

  loadPermission() {
    this.loader.show();
    this.roleService.getPermissions().subscribe((result: any) => {
      this.allPermissionGroups = result;
      this.loader.hide();
      this.loadPermissionGroups(); // <-- run after data arrives
    });
  }

  buildForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      permissionGroups: this.fb.array([]), // dynamic form array
    });
    this.loadPermission();
  }

  loadPermissionGroups(): void {
    const groupsArray = this.form.get('permissionGroups') as FormArray;

    this.allPermissionGroups.forEach((group: any) => {
      groupsArray.push(
        this.fb.group({
          groupName: [group.groupName],
          selectAll: [false],
          permissions: this.fb.array(
            group.permissions.map((perm: any) =>
              this.fb.group({
                permissionName: [perm.name],
                isGranted: [false],
              })
            )
          ),
        })
      );
    });
  }

  get permissionGroups(): FormArray {
    return this.form.get('permissionGroups') as FormArray;
  }

  permissionsArray(groupIndex: number): FormArray {
    return this.permissionGroups.at(groupIndex).get('permissions') as FormArray;
  }

  onSelectAllChange(groupIndex: number): void {
    const group = this.permissionGroups.at(groupIndex) as FormGroup;
    const selectAll = group.get('selectAll')?.value;
    const permissions = group.get('permissions') as FormArray;

    permissions.controls.forEach((perm) => perm.get('isGranted')?.setValue(selectAll));
  }

  onIndividualChange(groupIndex: number): void {
    const group = this.permissionGroups.at(groupIndex) as FormGroup;
    const permissions = group.get('permissions') as FormArray;
    const allChecked = permissions.controls.every((p) => p.get('isGranted')?.value);
    const selectAllControl = group.get('selectAll');

    // Auto update the "Select All" checkbox
    if (selectAllControl?.value !== allChecked) {
      selectAllControl?.setValue(allChecked, { emitEvent: false });
    }
  }

  open(content: TemplateRef<any>) {
    this.buildForm();
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  onSubmit(model: any) {}

  pageChange() {
    this.loadData();
  }
}

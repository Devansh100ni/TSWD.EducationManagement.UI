import { Component, ElementRef, inject, TemplateRef } from '@angular/core';
import { NgbModal, NgbNavModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { TenantDto } from '../../proxy/tenants/tenantdto';
import { TenantService } from '../../proxy/tenants/tenant.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tenants-component',
  imports: [NgbPaginationModule, FormsModule, ReactiveFormsModule, NgbNavModule],
  templateUrl: './tenants-component.html',
  styleUrl: './tenants-component.css',
})
export class TenantsComponent {
  private modalService = inject(NgbModal);
  private fb = inject(FormBuilder);

  active = 1;
  form!: FormGroup;
  tenants: TenantDto[] = [];
  page = 1;
  pageSize = 10;
  collectionSize = 0;
  tenantId: string = '';
  tenant?: TenantDto;

  constructor(private tenantService: TenantService, private router: Router, public el: ElementRef) {}

  ngOnInit() {
    this.loadTenants();
  }

  buildForm() {
    this.form = this.fb.group({
      id: [this.tenant?.id],
      name: [this.tenant?.name, [Validators.required, Validators.minLength(5)]],
    });
  }

  loadTenants() {
    this.tenantService.getTenants(this.page, this.pageSize).subscribe((result) => {
      this.tenants = result.items;
      this.collectionSize = result.totalCount;
    });
  }

  pageChange() {
    this.loadTenants();
  }

  open(content: TemplateRef<any>) {
    this.buildForm();
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  onEdit(id: string, content: TemplateRef<any>){
    this.tenantId = id;
    this.tenantService.getById(id).subscribe((resp) => {
      this.tenant = resp.data;
      this.open(content);
    })
  }

  submitTenant(modal: any) {
    if (this.form.invalid) return;

    const formData = new FormData();
    formData.append('Id', this.form.value.id || ''); // empty string if null
    formData.append('Name', this.form.value.name);

    this.tenantService.createOrUpdate(formData).subscribe({
      next: (res) => {
        modal.close();
        this.loadTenants();
      },
      error: (err) => {
        console.error('Error creating tenant', err);
      },
    });
  }

  onDetails(id:string){
    this.router.navigateByUrl(`home/tenant-details/${id}`)
  }
}

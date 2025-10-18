import { Component, inject, OnInit } from '@angular/core';
import { GeneralSettingsService } from '../../../proxy/general-settings/general-settings.service';
import { UsersDtos } from '../../../proxy/users/usersdtos';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoaderService } from '../../../proxy/shared/loader-service';
import { ToastService } from '../../../proxy/shared/toast-service';
import { SchoolGeneralSettingDto } from '../../../proxy/general-settings/SchoolGeneralSettingDto';
import { ConstantsClass } from '../../../proxy/shared/constants.class';
import { UpdateSchoolGeneralSettingDto } from '../../../proxy/general-settings/UpdateSchoolGeneralSettingDto';

@Component({
  selector: 'app-general-setting-component',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './general-setting-component.html',
  styleUrl: './general-setting-component.css',
})
export class GeneralSettingComponent implements OnInit {
  private settingService = inject(GeneralSettingsService);
  private toast = inject(ToastService);
  private loader = inject(LoaderService);
  private fb = inject(FormBuilder);

  tenantId!: string;
  user?: UsersDtos | null = null;
  form!: FormGroup;
  schoolGeneralSetting?: SchoolGeneralSettingDto;

  ngOnInit(): void {
    this.buildForm();
    this.tenantId = localStorage.getItem('tenantId') ?? '';
    this.loadData();
  }

  loadData() {
    this.loader.show();

    this.settingService.getSchoolGeneralSettings(this.tenantId).subscribe((result) => {
      this.schoolGeneralSetting = result;
      this.buildForm();
      this.loader.hide();
    });
  }

  buildForm() {
    this.form = this.fb.group({
      id: [this.schoolGeneralSetting?.id, [Validators.required]],
      tenantId: [this.schoolGeneralSetting?.tenantId, [Validators.required]],
      schoolName: [this.schoolGeneralSetting?.schoolName, [Validators.required]],
      schoolCode: [this.schoolGeneralSetting?.schoolCode, [Validators.required]],
      email: [this.schoolGeneralSetting?.email, [Validators.email]],
      address: [this.schoolGeneralSetting?.address],
      phone: [this.schoolGeneralSetting?.phone],
    });
  }

  handleSubmit() {
    if (this.form.valid) {
      this.loader.show();
      let updateDto: UpdateSchoolGeneralSettingDto = this.form.value;
      this.settingService.updateSchoolGeneralSettings(updateDto).subscribe((result) => {
        this.schoolGeneralSetting = result;
        this.buildForm();
        this.loader.hide();
        this.toast.success(ConstantsClass.Success("Settings", "updated"))
      });
    } else {
      this.toast.error(ConstantsClass.InvalidForm);
    }
  }
}

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassSectionSettingComponent } from './class-section-setting-component';

describe('ClassSectionSettingComponent', () => {
  let component: ClassSectionSettingComponent;
  let fixture: ComponentFixture<ClassSectionSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassSectionSettingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassSectionSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

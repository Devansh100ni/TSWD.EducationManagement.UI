import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolSettingComponent } from './school-setting-component';

describe('SchoolSettingComponent', () => {
  let component: SchoolSettingComponent;
  let fixture: ComponentFixture<SchoolSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchoolSettingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchoolSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

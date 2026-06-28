import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeeFinanceSettingComponent } from './fee-finance-setting-component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('FeeFinanceSettingComponent', () => {
  let component: FeeFinanceSettingComponent;
  let fixture: ComponentFixture<FeeFinanceSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeeFinanceSettingComponent, HttpClientTestingModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FeeFinanceSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

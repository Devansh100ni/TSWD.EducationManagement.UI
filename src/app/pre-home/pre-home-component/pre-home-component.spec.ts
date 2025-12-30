import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreHomeComponent } from './pre-home-component';

describe('PreHomeComponent', () => {
  let component: PreHomeComponent;
  let fixture: ComponentFixture<PreHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureTourInner } from './feature-tour-inner';

describe('FeatureTourInner', () => {
  let component: FeatureTourInner;
  let fixture: ComponentFixture<FeatureTourInner>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatureTourInner]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeatureTourInner);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

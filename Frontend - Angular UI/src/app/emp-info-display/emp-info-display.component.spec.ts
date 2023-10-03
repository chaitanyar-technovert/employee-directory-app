import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpInfoDisplayComponent } from './emp-info-display.component';

describe('EmpInfoDisplayComponent', () => {
  let component: EmpInfoDisplayComponent;
  let fixture: ComponentFixture<EmpInfoDisplayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmpInfoDisplayComponent]
    });
    fixture = TestBed.createComponent(EmpInfoDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

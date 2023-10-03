import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpDeleteConfirmComponent } from './emp-delete-confirm.component';

describe('EmpDeleteConfirmComponent', () => {
  let component: EmpDeleteConfirmComponent;
  let fixture: ComponentFixture<EmpDeleteConfirmComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmpDeleteConfirmComponent]
    });
    fixture = TestBed.createComponent(EmpDeleteConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

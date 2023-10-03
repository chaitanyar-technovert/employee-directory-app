import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoEmpDetailsComponent } from './no-emp-details.component';

describe('NoEmpDetailsComponent', () => {
  let component: NoEmpDetailsComponent;
  let fixture: ComponentFixture<NoEmpDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NoEmpDetailsComponent]
    });
    fixture = TestBed.createComponent(NoEmpDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

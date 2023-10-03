import { Component, Inject, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../services/core.service';
import { DepartmentService } from '../services/department.service';
import { Department } from '../model/department';
import { OfficeLocation } from '../model/office-location';
import { JobTitle } from '../model/job-title';
import { OfficeLocationService } from '../services/office-location.service';
import { JobTitleService } from '../services/job-title.service';
import { EmployeeSharedService } from '../services/employee-shared.service';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.scss']
})
export class EmpAddEditComponent implements OnInit {

  empForm: FormGroup;

  departments: Department[] = [];
  officeLocations?: OfficeLocation[] = [];
  jobTitles?: JobTitle[] = []

  constructor(
    private _formBuilder: FormBuilder,
    private _empService: EmployeeService,
    private _dialogRef: MatDialogRef<EmpAddEditComponent>,
    private _dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any = null,
    private _coreService: CoreService,
    private _deptService: DepartmentService,
    private _officeService: OfficeLocationService,
    private _jobTitleService: JobTitleService,
    private _employeeSharedService: EmployeeSharedService
  ) {
    this.empForm = this._formBuilder.group({
      firstName: '',
      lastName: '',
      email: '',
      jobTitleId: '',
      officeLocationId: '',
      departmentId: '',
      phoneNumber: '',
      skypeId: '',
    })
  }

  ngOnInit(): void {
  
    this.empForm.patchValue(this.data);

    this.fetchDepartmentList();
    this.fetchOfficeLocationsList();
    this.fetchJobTitlesList();
  }

  onFormSubmit() {
    if (this.data) {
      this.editEmployee();
    } else {
      this.addEmployee();
    }
  }

  // Adds New Employee Details into JSON Database.
  addEmployee() {
    this._empService.addEmployee(this.empForm.value).subscribe({
      next: (emp: any) => {
        this._coreService.openSnackBar('Employee details added successfully...!');
        this._dialogRef.close(true);
      },
      error: (err: any) => {
        console.error(err);
      }
    });
  }

  // Updates Employee Details into JSON Database.
  editEmployee() {
    this._empService.updateEmployee(this.data.id, this.empForm.value).subscribe({
      next: (val: any) => {
        this._coreService.openSnackBar('Employee details updated successfully...!');
        this._dialogRef.close(true);
        this._employeeSharedService.notifyEmployeeUpdated();
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  addDepartment() {
    this._deptService.getDepartmentList().subscribe((departments: Department[]) => {
      const maxId = departments.reduce((max, dept) => (dept.id > max ? dept.id : max), 0);
      const nextId = maxId + 1;

      const deptToJSON: Department = {
        id: nextId,
        name: this.empForm.value.department,
        count: 0,
      };

      this._deptService.addDepartment(deptToJSON).subscribe(
        (val: any) => {
          console.log(`Department added successfully with ID: ${nextId}`);
        },
        (error: any) => {
          console.error('Error adding department:', error);
        }
      );
    });
  }

  fetchDepartmentList() {
    this._deptService.getDepartmentList().subscribe(res => {
      this.departments = res;
    })
  }

  fetchOfficeLocationsList() {
    this._officeService.getOfficeLocationList().subscribe(res => {
      this.officeLocations = res;
    })
  }

  fetchJobTitlesList() {
    this._jobTitleService.getJobTitleList().subscribe(res => {
      this.jobTitles = res;
    })
  }
}
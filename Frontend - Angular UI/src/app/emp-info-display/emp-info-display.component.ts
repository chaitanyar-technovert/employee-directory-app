import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { EmployeeSharedService } from '../services/employee-shared.service';
import { DeleteDialogConfirmService } from '../services/delete-dialog-confirm.service';
import { CoreService } from '../services/core.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EmpAddEditComponent } from '../emp-add-edit/emp-add-edit.component';
import { Department } from '../model/department';
import { DepartmentService } from '../services/department.service';
import { JobTitle } from '../model/job-title';
import { JobTitleService } from '../services/job-title.service';

@Component({
  selector: 'app-emp-info-display',
  templateUrl: './emp-info-display.component.html',
  styleUrls: ['./emp-info-display.component.scss']
})
export class EmpInfoDisplayComponent implements OnInit {

  employees: any[] = [];

  employeeId?: number;

  employeeDetailsById: any;

  showDepartments: boolean = false;

  departments: Department[] = [];

  jobTitles: JobTitle[] = [];

  constructor(
    private _dialog: MatDialog,
    private _employeeService: EmployeeService,
    private _employeeSharedService: EmployeeSharedService,
    private _deleteEmpConfirmService: DeleteDialogConfirmService,
    private _departmentService: DepartmentService,
    private _jobTitleService: JobTitleService,
    private _coreService: CoreService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    // Displays the card in container.
    this.fetchEmployeeList();
    this.fetchDepartmentList();
    this.fetchJobTitleList();

    // After adding employee, container is automatically refreshed.
    this._employeeSharedService.employeeUpdated$.subscribe(() => {
      this.fetchEmployeeList();
    })

    // Update the employee list when the character page filtered list changes (Renders employees list on click).
    this._employeeSharedService.charPageFilteredListSource.subscribe((charPageFilteredList: any[]) => {
      this.employees = charPageFilteredList;
    });

    // Extracting the id for editing and deleting the employee details from url.
    const url = window.location.href;
    const id = this.extractLastNumberFromURL(url);
    const action = this.extractActionPartOfUrl(url);

    // Passing the id to delete employee details.
    if (id !== null) {
      // this.fetchEmployeeById(id);
      this.editOrDeleteOperation(id, action);
    }

    let dept = this.extractLastPartOfUrl(url);

    if (dept === 'departments') {
      this.showDepartments = true;
    } else {
      this.showDepartments = false;
    }
  }

  // Gets the employee list from JSON Server.
  fetchEmployeeList() {
    this._employeeService.getEmployeeList().subscribe(
      (data: any) => {
        this.employees = data;
        // console.log(data);
      },
      (error: any) => {
        console.error('Error fetching employee list:', error);
      }
    );
  }

  fetchDepartmentList() {
    this._departmentService.getDepartmentList().subscribe(dept => {
      this.departments = dept;
      // console.log(dept);
    })
  }

  fetchJobTitleList() {
    this._jobTitleService.getJobTitleList().subscribe(jobTitle => {
      this.jobTitles = jobTitle;
      // console.log(jobTitle);
    })
  }

  // Delete Employee Details.
  deleteEmpDetails(empId: number) {
    this._deleteEmpConfirmService.openDeleteConfirmDialog('Are you sure you want to delete employee details ?')
      .afterClosed().subscribe(res => {
        if (res) {

          // Call the deleteEmployee method from EmployeeService
          this._employeeService.deleteEmployee(empId).subscribe(
            (response: any) => {

              this._router.navigate(['/employees']);

              console.log('Employee deleted successfully:', response);
              this._coreService.openSnackBar('Employee details deleted successfully', 'done');

              // Call fetchEmployeeList() of the EmpInfoDisplayComponent to update the employee list
              this.fetchEmployeeList();

              this._employeeSharedService.notifyEmployeeUpdated();
            },
            (error: any) => {
              console.error('Error deleting employee:', error);
            }
          );
        }
      })
  }

  // Event handler for employee delete
  onDeleteEmployee(employeeId: number) {
    this.deleteEmpDetails(employeeId);
  }

  // Extracting id from URL.
  extractLastNumberFromURL(url: string): number | null {
    const parts = url.split('/');
    const lastPart = parts[parts.length - 1];
    const number = parseInt(lastPart, 10);

    if (!isNaN(number)) {
      return number;
    } else {
      return null;
    }
  }

  extractLastPartOfUrl(url: string): string {
    const parts = url.split('/');
    return parts[parts.length - 1];
  }

  extractActionPartOfUrl(url: string): string {
    const parts = url.split('/');
    return parts[parts.length - 2];
  }

  fetchEmployeeById(id: number) {
    this._employeeService.getEmployeeById(id).subscribe(
      (res: any) => {
        this.employeeDetailsById = res;
        console.log(this.employeeDetailsById);
        this.openAddEditEmpForm(this.employeeDetailsById);
      },
      (error: any) => {
        console.error('Error fetching employee by id:', error);
      }
    );
  }

  // URL navigation for edit and delete.
  editOrDeleteOperation(id: number, action: string) {
    if (action === 'edit') {
      console.log('this.updateEmpDetails(id) & Id: ', id);
      this.fetchEmployeeById(id);
    } else {
      console.log('this.deleteEmpDetails(id) & Id: ', id);
      this.deleteEmpDetails(id);
    }
  }

  // Open Add & Edit form in popup.
  openAddEditEmpForm(employeeData: any) {
    console.log(employeeData);
    // this.router.navigate(['/employees/add-edit-emp-details'])
    const dialogRef = this._dialog.open(EmpAddEditComponent, { 
      data: employeeData
    });
    dialogRef.afterClosed().subscribe({
      next: val => {
        if (val) {
          this._employeeSharedService.notifyEmployeeUpdated();
        }
      },
    });
  }
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { EmpInfoDisplayComponent } from '../emp-info-display/emp-info-display.component';
import { CoreService } from '../services/core.service';
import { DeleteDialogConfirmService } from '../services/delete-dialog-confirm.service';
import { MatDialog } from '@angular/material/dialog';
import { EmpAddEditComponent } from '../emp-add-edit/emp-add-edit.component';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { DepartmentService } from '../services/department.service';
import { Department } from '../model/department';
import { JobTitle } from '../model/job-title';

@Component({
  selector: 'app-employee-card',
  templateUrl: './employee-card.component.html',
  styleUrls: ['./employee-card.component.scss']
})
export class EmployeeCardComponent implements OnInit {

  @Input() employee: any;

  // @Input() departments: Department[] = [];
  @Input() departments: any;

  // @Input() jobTitles: JobTitle[] = [];
  @Input() jobTitles: any;

  // department: any;
  
  @Output() deleteEmployee: EventEmitter<number> = new EventEmitter<number>();
  // @Output() editEmployee: EventEmitter<number> = new EventEmitter<number>();

  constructor(
    private _dialog: MatDialog,
    // private _empService: EmployeeService,
    private empInfoDisplayComponent: EmpInfoDisplayComponent,
    private _router: Router,
    private _departmentService: DepartmentService,
    // private _coreService: CoreService,
    // private _deleteEmpConfirmService: DeleteDialogConfirmService,
    // private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    // this.department = this._departmentService.getDepartmentById(this.employee.department)
    // console.log(this.departments);

    // console.log(this.employee);
    // console.log(this.departments);
    // console.log(this.jobTitles);
  }


  // Edit employee details popup.
  editEmpCard(employee: any) {

    // console.log('edit emp icon clicked with id' + employee.id);

    const dialogRef = this._dialog.open(EmpAddEditComponent, {
      data: employee,
    });

    dialogRef.afterClosed().subscribe({
      next: val => {
        if (val) {
          this.empInfoDisplayComponent.fetchEmployeeList();
          // this._router.navigate(['/employees']);
        }
      },
    })
  }

  // Delete Employee Details Emit.
  deleteEmpDetails(empId: number) {

    // console.log('delete emp icon clicked');
    // console.log(empId);

    this.deleteEmployee.emit(this.employee.id);

  //   this._deleteEmpConfirmService.openDeleteConfirmDialog('Are you sure you want to delete employee details ?')
  //     .afterClosed().subscribe(res => {
  //       if (res) {

  //         // Call the deleteEmployee method from EmployeeService
  //         this._empService.deleteEmployee(empId).subscribe(
  //           (response: any) => {

  //             console.log('Employee deleted successfully:', response);
  //             this._coreService.openSnackBar('Employee details deleted successfully', 'done');

  //             // Call fetchEmployeeList() of the EmpInfoDisplayComponent to update the employee list
  //             this.empInfoDisplayComponent.fetchEmployeeList();
  //           },
  //           (error: any) => {
  //             console.error('Error deleting employee:', error);
  //           }
  //         );
  //       }
  //     })
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

  // getDepartmentName(empDeptId: number): any {
    
  //   let deptFilter: any = this.departments.filter( dept => dept.id === empDeptId);
  //   let deptName = deptFilter.name;
  //   console.log(deptName);

  // }

  getDepartmentName(empDeptId: number): any {
    const deptFilter: Department | undefined = this.departments.find((dept: Department) => dept.id === empDeptId);
    if (deptFilter) {
      return deptFilter.name;
    }
    return '';
  }

  getjobTitleName(jobTitleId: number): any {
    const jobTitleFilter: JobTitle | undefined = this.jobTitles.find((jobTitle: JobTitle) => jobTitle.id === jobTitleId);
    if (jobTitleFilter) {
      return jobTitleFilter.name;
    }
    return '';
  }
  
}

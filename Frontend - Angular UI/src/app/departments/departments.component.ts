import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DepartmentSharedService } from '../services/department-shared.service';
import { EmployeeService } from '../services/employee.service';
import { EmployeeSharedService } from '../services/employee-shared.service';
import { CoreService } from '../services/core.service';
import { Department } from '../model/department';
import { DepartmentService } from '../services/department.service';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss']
})
export class DepartmentsComponent implements OnInit {

  displayedColumns: string[] = ['sr-no', 'departments', 'count', 'action'];

  employees: any[] = [];
  departments: { name: string, count: number }[] = [];

  departmentsList: Department[] = [];

  constructor(
    private _departmentSharedService: DepartmentSharedService,
    private _employeeService: EmployeeService,
    private _employeeSharedService: EmployeeSharedService,
    private _departmentService: DepartmentService,
    private _coreService: CoreService
  ) { }

  ngOnInit(): void {
    this.fetchEmployeeList();

    // console.log(this.departmentsList);

    // After adding employee, container is automatically refreshed.
    this._employeeSharedService.employeeUpdated$.subscribe(() => {
      this.fetchEmployeeList();
    })

    this._departmentSharedService.departments$.subscribe((departments) => {
      this.departments = departments;
    });

    this.fetchDepartmentList();

  }

  ngOnChange(): void {
  
  }

  onDeleteDept(deptName: string) {
    console.log('delete dept button clicked.. for deptName: ', deptName);

    // Delete the department and assign an empty string to all employees with that department
    this.employees.forEach((employee: any) => {
      if (employee.department === deptName) {
        employee.department = '';
        this.updateEmployeeDetails(employee);
      }
    });

  }

  updateEmployeeDetails(employee: any) {
    // Call the service method to update the employee data on the server
    this._employeeService.updateEmployee(employee.id, employee).subscribe(
      () => {
        console.log('Departments deleted and employees details updated successfully.');
        this._coreService.openSnackBar('Departments deleted and employees details updated successfully.');
      },
      (error: any) => {
        console.error('Error updating employee data:', error);
      }
    );

    
  }

  // Gets the employee list from JSON Server.
  fetchEmployeeList() {
    this._employeeService.getEmployeeList().subscribe(
      (data: any) => {
        this.employees = data;
        // Call the method to initialize departments after fetching the employees
        // this.initializeDepartments();
      },
      (error: any) => {
        console.error('Error fetching employee list:', error);
      }
    );
  }

  fetchDepartmentList() {
    this._departmentService.getDepartmentList().subscribe(
      (data: any) => {
        this.departmentsList = data;
        // this.copyDepartmentCounts();
        // console.log(this.departmentsList);
      },
      (error: any) => {
        console.error('Error fetching employee department list:', error);
      }
    )
  }

  // copyDepartmentCounts(): void {
  //   this.departmentsList.forEach((department, index) => {
  //     department.count = this.departments[index].count;
  //   });
  // }

}
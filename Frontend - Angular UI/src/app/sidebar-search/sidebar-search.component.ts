import { Component, Input, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { EmployeeSharedService } from '../services/employee-shared.service';
import { EmpInfoDisplayComponent } from '../emp-info-display/emp-info-display.component';
import { Router } from '@angular/router';
import { DepartmentSharedService } from '../services/department-shared.service';
import { Subject } from 'rxjs';
import { Department } from '../model/department';
import { DepartmentService } from '../services/department.service';
import { OfficeLocation } from '../model/office-location';
import { JobTitle } from '../model/job-title';
import { JobTitleService } from '../services/job-title.service';
import { OfficeLocationService } from '../services/office-location.service';

@Component({
  selector: 'app-sidebar-search',
  templateUrl: './sidebar-search.component.html',
  styleUrls: ['./sidebar-search.component.scss']
})
export class SidebarSearchComponent implements OnInit {

  employees: any[] = [];
  filteredEmployeesList: any[] = [];

  // For ids & count of filters
  departments: { name: string, count: number }[] = [];
  officeLocations: { name: string, count: number }[] = [];
  jobTitles: { name: string, count: number }[] = [];

  // For filter labels in the UI.
  departmentList: Department[] = [];
  officeLocationList: OfficeLocation[] = [];
  jobTitleList: JobTitle[] = [];

  routePath: string = '';

  constructor(
    private _employeeService: EmployeeService,
    private _employeeSharedService: EmployeeSharedService,
    private _departmentSharedService: DepartmentSharedService,
    private _departmentService: DepartmentService,
    private _officeLocationService: OfficeLocationService,
    private _jobTitleService: JobTitleService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.fetchEmployeeList();
    this.fetchDepartmentList();
    this.fetchOfficeLocationList();
    this.fetchJobTitleList();

    // After adding employee, filter search container is automatically refreshed.
    this._employeeSharedService.employeeUpdated$.subscribe(() => {
      this.fetchEmployeeList();
      this.extractData();
    })
  }

  // Getting the employee list from JSON Server.
  fetchEmployeeList() {

    this._employeeService.getEmployeeList().subscribe(
      (data: any) => {
        this.employees = data;
        console.log(data);
        this.extractData();
      },
      (error: any) => {
        console.error('Error fetching employee list:', error);
      }
    );
  }

  private extractData() {
    this.departments = this.extractUniqueValues('departmentId');
    this.countDepartments();
    this.officeLocations = this.extractUniqueValues('officeLocationId');
    this.countOfficeLocations();
    this.jobTitles = this.extractUniqueValues('jobTitleId');
    this.countjobTitles();

    this._departmentSharedService.updateDepartments(this.departments);
  }

  private extractUniqueValues(property: string): { name: string, count: number }[] {
    const uniqueValues: { name: string, count: number }[] = [];

    for (const employee of this.employees) {
      const value = employee[property];
      if (value && !uniqueValues.some(item => item.name === value)) {
        uniqueValues.push({ name: value, count: 0 });
      }
    }

    return uniqueValues;
  }

  private countDepartments() {
    for (const department of this.departments) {
      department.count = this.employees.filter(employee => employee.departmentId === department.name).length;
      this.updateDepartmentCount(this.convertToNumber(department.name), department.count);
      // console.log(department.count);
    }
  }

  convertToNumber(value: string): number {
    return parseInt(value); // Use parseFloat for decimal numbers or parseInt for integer numbers
  }

  updateDepartmentCount(departmentId: number, count: number): void {
    // console.log(departmentId);
    // console.log(count);
    // Find the department in the department list by ID
    let department = this.departmentList.find((dept) => dept.id === departmentId);
    // console.log(department);
    if (department) {
      // Update the count property
      department.count = count;

      // Call the department service to update the department in the JSON Server
      this._departmentService.updateDepartment(departmentId, department).subscribe(
        () => {
          console.log(`Department count updated for department with ID ${departmentId}.`);
        },
        (error: any) => {
          console.error('Error updating department count:', error);
        }
      );
    }
  }

  private countOfficeLocations() {
    for (const officeLocation of this.officeLocations) {
      officeLocation.count = this.employees.filter(employee => employee.officeLocationId === officeLocation.name).length;
    }
  }

  private countjobTitles() {
    for (const jobTitle of this.jobTitles) {
      jobTitle.count = this.employees.filter(employee => employee.jobTitleId === jobTitle.name).length;
    }
  }

  onFilterClick(filterType: string, filterName: string) {

    let filteredEmployees: any[] = [];

    switch (filterType) {
      case 'department':
        let formattedDeptName = this.formatStringToSlug(this.getDepartmentName(filterName));
        this.routePath = `/employees/department/${formattedDeptName}`;
        filteredEmployees = this.employees.filter(employee => employee.departmentId === filterName);
        break;
      case 'officeLocation':
        let formattedOffLocName = this.formatStringToSlug(this.getOfficeLocationName(filterName));
        this.routePath = `/employees/office/${formattedOffLocName}`;
        filteredEmployees = this.employees.filter(employee => employee.officeLocationId === filterName);
        break;
      case 'jobTitle':
        let formattedJobTitleName = this.formatStringToSlug(this.getjobTitleName(filterName));
        this.routePath = `/employees/jobtitle/${formattedJobTitleName}`;
        filteredEmployees = this.employees.filter(employee => employee.jobTitleId === filterName);
        break;
      default:
        break;
    }

    this.router.navigateByUrl(this.routePath);
    // console.log(this.routePath);

    this.filteredEmployeesList = filteredEmployees;
    this._employeeSharedService.updateCharPageFilteredList(this.filteredEmployeesList);
  }

  // Formatting the filter names to snake-case for url.
  formatStringToSlug(input: string): string {
    return input.toLowerCase().replace(/\s+/g, '-');
  }

  // Fetching department data from JSON Server using Rest APIs.
  fetchDepartmentList() {
    this._departmentService.getDepartmentList().subscribe(
      (departments: Department[]) => {
        this.departmentList = departments;
        // console.log(this.departmentList);
        // console.log(departments);
      },
      (error: any) => {
        console.error('Error fetching department list:', error);
      }
    );
  }

  // Generating department name by passing department id.
  getDepartmentName(empDeptId: any): any {
    const deptFilter: Department | undefined = this.departmentList.find((dept: Department) => dept.id === empDeptId);
    if (deptFilter) {
      return deptFilter.name;
    }
    return '';
  }

  // Fetching office location data from JSON Server using Rest APIs.
  fetchOfficeLocationList() {
    this._officeLocationService.getOfficeLocationList().subscribe(
      (officeLocation: OfficeLocation[]) => {
        this.officeLocationList = officeLocation;
        // console.log(this.officeLocationList);
      },
      (error: any) => {
        console.error('Error fetching office location list:', error);
      }
    );
  }

  // Generating office location name by passing office location id.
  getOfficeLocationName(empOfficeLocId: any): any {
    const officeFilter: OfficeLocation | undefined = this.officeLocationList.find((officeLoc: Department) => officeLoc.id === empOfficeLocId);
    if (officeFilter) {
      return officeFilter.name;
    }
    return '';
  }

  // Fetching job title data from JSON Server using Rest APIs.
  fetchJobTitleList() {
    this._jobTitleService.getJobTitleList().subscribe(
      (jobTitle: JobTitle[]) => {
        this.jobTitleList = jobTitle;
        // console.log(this.jobTitleList);
      },
      (error: any) => {
        console.error('Error fetching office location list:', error);
      }
    );
  }

  // Generating job title name by passing job title id.
  getjobTitleName(jobTitleId: any): any {
    const jobTitleFilter: JobTitle | undefined = this.jobTitleList.find((jobTitle: JobTitle) => jobTitle.id === jobTitleId);
    if (jobTitleFilter) {
      return jobTitleFilter.name;
    }
    return '';
  }

}

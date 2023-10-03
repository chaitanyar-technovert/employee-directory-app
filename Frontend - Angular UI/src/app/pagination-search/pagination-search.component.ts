import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpAddEditComponent } from '../emp-add-edit/emp-add-edit.component';
import { EmployeeSharedService } from '../services/employee-shared.service';
import { EmployeeService } from '../services/employee.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-pagination-search',
  templateUrl: './pagination-search.component.html',
  styleUrls: ['./pagination-search.component.scss']
})
export class PaginationSearchComponent implements OnInit {

  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  fetchedEmployeeData: any[] = [];

  charPageFilteredList: any[] = [];

  isEmptyList: boolean = false;

  searchValue: string = '';

  selectedFilterBy: string = '';

  filterOptions = [
    { value: 'firstName', label: 'First Name' },
    { value: 'lastName', label: 'Last Name' },
    { value: 'email', label: 'Email' },
    { value: 'jobTitle', label: 'Job Title' },
    { value: 'officeLocation', label: 'Office Location' },
    { value: 'department', label: 'Department' },
    { value: 'phoneNumber', label: 'Phone Number' },
    { value: 'skypeId', label: 'Skype Id' }
  ];


  constructor(
    private _dialog: MatDialog,
    private _employeeService: EmployeeService,
    private _employeeSharedService: EmployeeSharedService,
    private router: Router

  ) { }

  ngOnInit(): void {

    // Fetching Employee Data and storing into fetchedEmployeeData array.
    this.fetchedEmpData();

    // Trigerring the Add Employee button from url to add employee details.
    this.router.events.subscribe((event) => {
      // console.log(event);
      if (event instanceof NavigationEnd) {
        const url = event.urlAfterRedirects;
        // console.log(url); // Check the URL in the console
        if (url === '/employees/create') {
          this.openAddEditEmpForm();
        }
      }
    });
    
  }

  // Open Add & Edit form in popup.
  openAddEditEmpForm() {
    // this.router.navigate(['/employees/add-edit-emp-details'])
    const dialogRef = this._dialog.open(EmpAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: val => {
        if (val) {
          this._employeeSharedService.notifyEmployeeUpdated();
        }
      },
    });
  }

  filterByCharacters(char: string) {
    // console.log(char);
    // console.log(this._employeeService.getEmployeeList());

    this.router.navigateByUrl('/employees')

    // Fetching Employee Data and storing into fetchedEmployeeData array.
    this.fetchedEmpData();

    this.charPageFilteredList = this.fetchedEmployeeData.filter(emp => {
      return (emp.firstName.toLowerCase().indexOf(char || '') === 0)
    })

    // console.log(this.charPageFilteredList);

    this._employeeSharedService.updateCharPageFilteredList(this.charPageFilteredList);
    if (this.charPageFilteredList.length === 0) {
      this.isEmptyList = true;
    } else {
      console.log('empty list');
    }
  }

  // Fetching Employee Data and storing into fetchedEmployeeData array.
  fetchedEmpData() {
    this._employeeService.getEmployeeList().subscribe((data: any) => {
      this.fetchedEmployeeData = data;
      // this.charPageFilteredList = data;
      // console.log(data);
      // console.log(this.fetchedEmployeeData);

    })
  }

  filterBySearchEvent(event: any) {
    this.searchValue = event.target.value;
    // console.log(this.searchValue);
    this.filterBySearch();
  }

  filterBySearch() {
    const inputTextFilteredEmps = this.fetchedEmployeeData.filter(emp => {
      let prop = emp[this.selectedFilterBy];
      if (typeof prop === 'number') {
        // prop = prop.toString();
        return prop.toString().toLowerCase().includes(this.searchValue.toLowerCase());
      }
      // return prop.toLowerCase().includes(this.searchValue.toLowerCase());
      // Checks if prop is truthy (i.e., not null, undefined, or an empty string) and then converts both prop and searchValue to lowercase.
      return prop && prop.toLowerCase().includes(this.searchValue.toLowerCase());
    });

    this.charPageFilteredList = inputTextFilteredEmps;
    this._employeeSharedService.updateCharPageFilteredList(this.charPageFilteredList);
  }

  clearFilters() {
    this.searchValue = '';
    this.filterBySearch();
  }

}

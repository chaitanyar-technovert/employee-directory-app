import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentSharedService {

  private departmentSubject = new BehaviorSubject<any[]>([]);
  departments$ = this.departmentSubject.asObservable();

  updateDepartments(departments: any[]) {
    this.departmentSubject.next(departments);
  }

  constructor() { }

  
}

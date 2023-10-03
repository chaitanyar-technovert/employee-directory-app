import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeSharedService {

  constructor() {}
  
  private employeeUpdatedSource = new Subject<void>();  // Create a subject for employee added.
  employeeUpdated$ = this.employeeUpdatedSource.asObservable(); // Expose it as an observable.  
  
  // When something changes with an employee, this function is called to notify all subscribers about the update.
  notifyEmployeeUpdated() {
    this.employeeUpdatedSource.next();
  }

  public charPageFilteredListSource = new BehaviorSubject<any[]>([]);
  
  updateCharPageFilteredList(charPageFilteredList: any[]) {
    this.charPageFilteredListSource.next(charPageFilteredList);
  }

}
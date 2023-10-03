import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  baseUrl: string = environment.baseApiUrl + "/api";

  constructor(
    private _http: HttpClient
  ) { }

  addEmployee(data: any): Observable<any> {
    return this._http.post(`${this.baseUrl}/employees`, data);
  }

  updateEmployee(id: number, data: any): Observable<any> {
    return this._http.put(`${this.baseUrl}/employees/${id}`, data);
  }
  
  getEmployeeList(): Observable<any> {
    return this._http.get(`${this.baseUrl}/employees`);
  }

  getEmployeeById(id: number): Observable<any> {
    return this._http.get(`${this.baseUrl}/employees/${id}`);
  }

  deleteEmployee(id: number): Observable<any> {
    return this._http.delete(`${this.baseUrl}/employees/${id}`);
  }

}

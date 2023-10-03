import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  baseUrl: string = environment.baseApiUrl + "/api";

  constructor(
    private _http: HttpClient
  ) { }

  addDepartment(data: any) {
    return this._http.post(`${this.baseUrl}/departments`, data);
  }

  updateDepartment(id: number, data: any) {
    return this._http.put(`${this.baseUrl}/departments/${id}`, data);
  }

  getDepartmentList(): Observable<any> {
    return this._http.get(`${this.baseUrl}/departments`);
  }

  deleteDepartment(id: number): Observable<any> {
    return this._http.delete(`${this.baseUrl}/departments/${id}`);
  }

}

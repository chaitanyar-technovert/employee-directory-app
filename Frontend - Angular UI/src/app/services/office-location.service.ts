import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OfficeLocationService {

  baseUrl: string = environment.baseApiUrl + "/api";

  constructor(
    private _http: HttpClient
  ) { }

  addOfficeLocation(data: any) {
    return this._http.post(`${this.baseUrl}/officeLocations`, data);
  }

  updateOfficeLocation(id: number, data: any) {
    return this._http.put(`${this.baseUrl}/officeLocations/${id}`, data);
  }

  getOfficeLocationList(): Observable<any> {
    return this._http.get(`${this.baseUrl}/officeLocations`);
  }

  deleteOfficeLocation(id: number): Observable<any> {
    return this._http.delete(`${this.baseUrl}/officeLocations/${id}`);
  }
}

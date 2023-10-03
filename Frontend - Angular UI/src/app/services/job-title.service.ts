import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobTitleService {

  baseUrl: string = environment.baseApiUrl + "/api";

  constructor(
    private _http: HttpClient
  ) { }

  addJobTitle(data: any) {
    return this._http.post(`${this.baseUrl}/jobTitles`, data);
  }

  updateJobTitle(id: number, data: any) {
    return this._http.put(`${this.baseUrl}/jobTitles/${id}`, data);
  }

  getJobTitleList(): Observable<any> {
    return this._http.get(`${this.baseUrl}/jobTitles`);
  }

  deleteJobTitle(id: number): Observable<any> {
    return this._http.delete(`${this.baseUrl}/jobTitles/${id}`);
  }
}

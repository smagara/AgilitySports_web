import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MLBAttendChartDTO, MLBAttendanceDto, MLBRosterDto } from './mlb';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MlbService {
  baseURL = environment.apiUrl;

  constructor(private http: HttpClient) { }

  GetRoster(): Observable<MLBRosterDto[]> {
    return this.http.get<MLBRosterDto[]>(this.baseURL + 'mlb/roster')
  }

  GetAttendance(): Observable<MLBAttendanceDto[]> {
      return this.http.get<MLBAttendanceDto[]>(this.baseURL + 'mlb/attendance')
  }

  GetAttendanceChart(yearFilter?: number): Observable<MLBAttendChartDTO[]> {
    var url: string = this.baseURL +
      'mlb/chart' + (yearFilter ? '?yearId=' + yearFilter : '');
    console.info("Url: " + url);
    return this.http.get<MLBAttendChartDTO[]>(url);
  }

  GetAttendanceDecades(beginYear?: number, endYear?: number): Observable<MLBAttendChartDTO[]> {
    var url: string = this.baseURL +
    'mlb/decades' + (beginYear ? '?beginDecade=' + beginYear : '1950') + (endYear ? '&endDecade=' + endYear : '1980');
    console.info("Url: " + url);
    return this.http.get<MLBAttendChartDTO[]>(url);
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MLBAttendanceDto, MLBRosterDto } from './mlb';

@Injectable({
  providedIn: 'root'
})
export class MlbService {
  baseURL = 'http://localhost:1106/api/'

  constructor(private http: HttpClient) { }

  GetRoster(): Observable<MLBRosterDto[]> {
    return this.http.get<MLBRosterDto[]>(this.baseURL + 'mlb/roster')
  }

  GetAttendance(): Observable<MLBAttendanceDto[]> {
      return this.http.get<MLBAttendanceDto[]>(this.baseURL + 'mlb/attendance')
  }
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MLBAttendChartDTO, MLBAttendanceDto, MLBRosterDto } from './mlb';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MlbService {
  baseURL = environment.apiUrl;

  constructor(private http: HttpClient) { }

  GetRoster(): Observable<MLBRosterDto[]> {
    return this.http.get<MLBRosterDto[]>(this.baseURL + 'mlb/roster')
  }

  SaveRoster(roster: MLBRosterDto): Observable<MLBRosterDto> {
    return this.http.put<MLBRosterDto>(this.baseURL + 'mlb/roster', roster).pipe(
      catchError((error) => {
        if (error.status === 500) {
          console.error('Server error', error);
        } else {
          console.error('An error occurred', error);
        }
        return throwError(() => error);
      })
    );
  }

  AddRoster(roster: MLBRosterDto): Observable<MLBRosterDto> {
    return this.http.post<MLBRosterDto>(this.baseURL + 'mlb/roster', roster).pipe(
      catchError((error) => {
        if (error.status === 500) {
          console.error('Server error', error);
        } else {
          console.error('An error occurred', error);
        }
        return throwError(() => error);
      })
    );
  }

  DeleteRoster(playerId: number): Observable<any> {
    return this.http.delete<any>(this.baseURL + 'mlb/roster/?playerId=' + playerId).pipe(
      catchError((error) => {
        if (error.status === 500) {
          console.error('Server error', error);
        } else {
          console.error('An error occurred', error);
        }
        return throwError(() => new Error('An error occurred deleting from the MLB roster.'));
      })
    );
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

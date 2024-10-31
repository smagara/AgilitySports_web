import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NBARosterDto } from './nba';
import { environment } from 'src/environments/environment';

import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NbaService {
  baseURL = environment.apiUrl;

  constructor(private http: HttpClient) { }

  GetRoster(): Observable<NBARosterDto[]> {
    return this.http.get<NBARosterDto[]>(this.baseURL + 'nba/roster')
  }

  SaveRoster(roster: NBARosterDto): Observable<NBARosterDto> {
    return this.http.put<NBARosterDto>(this.baseURL + 'nba/roster', roster).pipe(
      catchError((error) => {
        if (error.status === 500) {
          console.error('Server error', error);
        } else {
          console.error('An error occurred', error);
        }
        // Create a user-friendly error message and throw it
        return throwError(() => new Error('An error occured saving the roster change.'));
      })
    );
  }

  AddRoster(roster: NBARosterDto): Observable<NBARosterDto> {
    return this.http.post<NBARosterDto>(this.baseURL + 'NBA/roster', roster).pipe(
      catchError((error) => {
        if (error.status === 500) {
          console.error('Server error', error);
        } else {
          console.error('An error occurred', error);
        }
        // Create a user-friendly error message and throw it
        return throwError(() => new Error('An error occured adding to NBA roster.  Please try again later.'));
      })
    );
  }


  DeleteRoster(playerId: string): Observable<any> {
    return this.http.delete<any>(this.baseURL + 'NBA/roster/?playerId=' + playerId).pipe(
      catchError((error) => {
        if (error.status === 500) {
          console.error('Server error', error);
        } else {
          console.error('An error occurred', error);
        }
        // Create a user-friendly error message and throw it
        return throwError(() => new Error('An error occurred deleting from the roster.'));
      })
    );
  }
}

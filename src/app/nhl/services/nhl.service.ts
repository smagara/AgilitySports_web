import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NHLRosterDto } from './nhl';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NhlService {
  baseURL = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  GetRoster(): Observable<NHLRosterDto[]> {
    return this.http.get<NHLRosterDto[]>(this.baseURL + 'nhl/roster')
  }

  SaveRoster(roster: NHLRosterDto): Observable<NHLRosterDto> {
    return this.http.put<NHLRosterDto>(this.baseURL + 'nhl/roster', roster).pipe(
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

  AddRoster(roster: NHLRosterDto): Observable<NHLRosterDto> {
    return this.http.post<NHLRosterDto>(this.baseURL + 'nhl/roster', roster).pipe(
      catchError((error) => {
        if (error.status === 500) {
          console.error('Server error', error);
        } else {
          console.error('An error occurred', error);
        }
        // Create a user-friendly error message and throw it
        return throwError(() => new Error('An error occured adding to NHL roster.  Please try again later.'));
      })
    );
  }


  DeleteRoster(playerId: string): Observable<any> {
    return this.http.delete<any>(this.baseURL + 'nhl/roster/?playerId=' + playerId).pipe(
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

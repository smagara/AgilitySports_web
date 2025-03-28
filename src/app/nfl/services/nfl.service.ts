import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NFLRosterDto } from './nfl';

import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NflService {
  baseURL = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  GetRoster(): Observable<NFLRosterDto[]> {
    return this.http.get<NFLRosterDto[]>(this.baseURL + 'nfl/roster')
  }

  SaveRoster(roster: NFLRosterDto): Observable<NFLRosterDto> {
    return this.http.put<NFLRosterDto>(this.baseURL + 'nfl/roster', roster).pipe(
      catchError((error) => {
        if (error.status === 500) {
          console.error('Server error', error);
        } else {
          console.error('An error occurred', error);
        }
        // Create a user-friendly error message and throw it
        return throwError(() => new Error('An error occured saving the NFL roster change.'));
      })
    );
  }

  AddRoster(roster: NFLRosterDto): Observable<NFLRosterDto> {
    return this.http.post<NFLRosterDto>(this.baseURL + 'nfl/roster', roster).pipe(
      catchError((error) => {
        if (error.status === 500) {
          console.error('Server error', error);
        } else {
          console.error('An error occurred', error);
        }
        // Create a user-friendly error message and throw it
        return throwError(() => new Error('An error occured adding to NFL roster.  Please try again later.'));
      })
    );
  }


  DeleteRoster(playerId: string): Observable<any> {
    return this.http.delete<any>(this.baseURL + 'nfl/roster/?playerId=' + playerId).pipe(
      catchError((error) => {
        if (error.status === 500) {
          console.error('Server error', error);
        } else {
          console.error('An error occurred', error);
        }
        // Create a user-friendly error message and throw it
        return throwError(() => new Error('An error occurred deleting from the NFL roster.'));
      })
    );
  }  
}

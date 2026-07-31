import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { FIFRosterDto } from './fif';

@Injectable({
  providedIn: 'root'
})
export class FifService {
  baseURL = environment.apiUrl;

  constructor(private http: HttpClient) { }

  GetRoster(): Observable<FIFRosterDto[]> {
    return this.http.get<FIFRosterDto[]>(this.baseURL + 'fif/roster');
  }

  SaveRoster(roster: FIFRosterDto): Observable<FIFRosterDto> {
    return this.http.put<FIFRosterDto>(this.baseURL + 'fif/roster', roster).pipe(
      catchError((error) => {
        if (error.status === 500) {
          console.error('Server error', error);
        } else {
          console.error('An error occurred', error);
        }

        return throwError(() => new Error('An error occurred saving the FIF roster change.'));
      })
    );
  }

  AddRoster(roster: FIFRosterDto): Observable<FIFRosterDto> {
    return this.http.post<FIFRosterDto>(this.baseURL + 'fif/roster', roster).pipe(
      catchError((error) => {
        if (error.status === 500) {
          console.error('Server error', error);
        } else {
          console.error('An error occurred', error);
        }

        return throwError(() => new Error('An error occurred adding to FIF roster. Please try again later.'));
      })
    );
  }

  DeleteRoster(playerId: string): Observable<any> {
    return this.http.delete<any>(this.baseURL + 'fif/roster/?playerId=' + playerId).pipe(
      catchError((error) => {
        if (error.status === 500) {
          console.error('Server error', error);
        } else {
          console.error('An error occurred', error);
        }

        return throwError(() => new Error('An error occurred deleting from the FIF roster.'));
      })
    );
  }
}

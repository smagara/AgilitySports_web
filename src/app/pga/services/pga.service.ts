import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { PGARosterDto } from './pga';

@Injectable({
  providedIn: 'root'
})
export class PgaService {
  baseURL = environment.apiUrl;

  constructor(private http: HttpClient) { }

  GetRoster(): Observable<PGARosterDto[]> {
    return this.http.get<PGARosterDto[]>(this.baseURL + 'pga/roster');
  }

  SaveRoster(roster: PGARosterDto): Observable<PGARosterDto> {
    return this.http.put<PGARosterDto>(this.baseURL + 'pga/roster', roster).pipe(
      catchError((error) => {
        if (error.status === 500) {
          console.error('Server error', error);
        } else {
          console.error('An error occurred', error);
        }

        return throwError(() => new Error('An error occurred saving the PGA roster change.'));
      })
    );
  }

  AddRoster(roster: PGARosterDto): Observable<PGARosterDto> {
    return this.http.post<PGARosterDto>(this.baseURL + 'pga/roster', roster).pipe(
      catchError((error) => {
        if (error.status === 500) {
          console.error('Server error', error);
        } else {
          console.error('An error occurred', error);
        }

        return throwError(() => new Error('An error occurred adding to PGA roster. Please try again later.'));
      })
    );
  }

  DeleteRoster(playerId: string): Observable<any> {
    return this.http.delete<any>(this.baseURL + 'pga/roster/?playerId=' + playerId).pipe(
      catchError((error) => {
        if (error.status === 500) {
          console.error('Server error', error);
        } else {
          console.error('An error occurred', error);
        }

        return throwError(() => new Error('An error occurred deleting from the PGA roster.'));
      })
    );
  }
}

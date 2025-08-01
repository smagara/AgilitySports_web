import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { PositionCodesDTO } from './positioncodes';

@Injectable({
  providedIn: 'root'
})
export class StaticDataService {
  private baseURL = environment.apiUrl;

  // In-memory cache: key is sport code, value is the positions array
  private positionCache = new Map<string, PositionCodesDTO[]>();

  constructor(private http: HttpClient) {}

  GetPositionCodes(sport: string): Observable<PositionCodesDTO[]> {
    const cached = this.positionCache.get(sport);
    if (cached) {
      // Return cached value as observable, rather than calling the API again
      return of(cached);
    }

    // Fetch from API and "tap" into the observable chain to cache the result for this sport
    return this.http.get<PositionCodesDTO[]>(`${this.baseURL}staticdata/positions?sport=${sport}`)
      .pipe(
        tap(data => this.positionCache.set(sport, data))
      );
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PositionCodesDTO } from './positioncodes';

@Injectable({
  providedIn: 'root'
})
export class StaticDataService {
  baseURL = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  GetPositionCodes(sport: string): Observable<PositionCodesDTO[]> {
    return this.http.get<PositionCodesDTO[]>(this.baseURL + 'staticdata/positions?sport=' + sport);
  }
}

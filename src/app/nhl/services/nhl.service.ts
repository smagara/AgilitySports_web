import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NHLRosterDto } from './nhl';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NhlService {
  baseURL = 'http://localhost:1106/api/';

  constructor(
    private http: HttpClient
  ) { }

  GetRoster(): Observable<NHLRosterDto[]> {
    return this.http.get<NHLRosterDto[]>(this.baseURL + 'nhl/roster')
  }
}
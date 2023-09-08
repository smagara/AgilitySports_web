import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NFLRosterDto } from './nfl';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NflService {
  baseURL = 'http://localhost:1106/api/';

  constructor(
    private http: HttpClient
  ) { }

  GetRoster(): Observable<NFLRosterDto[]> {
    return this.http.get<NFLRosterDto[]>(this.baseURL + 'nfl/roster')
  }
}
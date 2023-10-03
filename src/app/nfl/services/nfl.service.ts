import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NFLRosterDto } from './nfl';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

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
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NHLRosterDto } from './nhl';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

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
}

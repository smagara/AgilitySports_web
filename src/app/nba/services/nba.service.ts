import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NBARosterDto } from './nba';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NbaService {
  baseURL = environment.apiUrl;

  constructor(private http: HttpClient) { }

  GetRoster(): Observable<NBARosterDto[]> {
    return this.http.get<NBARosterDto[]>(this.baseURL + 'nba/roster')
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NBARosterDto } from './nba';

@Injectable({
  providedIn: 'root'
})
export class NbaService {
  baseURL = 'http://localhost:1106/api/'

  constructor(private http: HttpClient) { }

  GetRoster(): Observable<NBARosterDto[]> {
    return this.http.get<NBARosterDto[]>(this.baseURL + 'nba/roster')
  }
}
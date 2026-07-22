import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { resolveLeagueValueForSport } from './league-helpers';
import { LeagueOptionDTO, TeamLeagueDTO } from './league';
import { PositionCodesDTO } from './positioncodes';

@Injectable({
  providedIn: 'root'
})
export class StaticDataService {
  private baseURL = environment.apiUrl;

  // In-memory cache: key is sport code, value is the positions array
  private positionCache = new Map<string, PositionCodesDTO[]>();
  private leagueCache = new Map<string, LeagueOptionDTO[]>();

  constructor(private http: HttpClient) {}

  private normalizeSportKey(sport: string): string {
    return (sport || '').trim().toLowerCase();
  }

  private normalizePositionCodeItem(item: any, fallbackSport: string): PositionCodesDTO {
    return {
      sport: String(item?.sport ?? item?.Sport ?? fallbackSport ?? ''),
      positionCode: String(item?.positionCode ?? item?.PositionCode ?? item?.code ?? item?.Code ?? ''),
      positionDesc: String(item?.positionDesc ?? item?.PositionDesc ?? item?.description ?? item?.Description ?? '')
    };
  }

  private normalizeTeamLeagueItem(item: any, fallbackSport: string): TeamLeagueDTO {
    const teamName = String(item?.teamName ?? item?.TeamName ?? item?.team ?? item?.Team ?? item?.name ?? item?.Name ?? '');
    const league = String(item?.league ?? item?.League ?? item?.lgID ?? item?.lgId ?? item?.leagueCode ?? item?.LeagueCode ?? '');
    return {
      sport: String(item?.sport ?? item?.Sport ?? fallbackSport ?? ''),
      teamName,
      league: resolveLeagueValueForSport(fallbackSport, teamName, league)
    };
  }

  private getLeagueFallbackOptions(sportKey: string): LeagueOptionDTO[] {
    if (sportKey === 'mlb') {
      return [
        { code: 'AL', label: 'AL' },
        { code: 'NL', label: 'NL' }
      ];
    }

    const league = resolveLeagueValueForSport(sportKey, '', '');
    return league ? [{ code: league, label: league }] : [];
  }

  GetLeagueCodes(sport: string): Observable<LeagueOptionDTO[]> {
    const sportKey = this.normalizeSportKey(sport);
    const cached = this.leagueCache.get(sportKey);
    if (cached) {
      return of(cached);
    }

    const teamsUrl = `${this.baseURL}staticdata/teams?sport=${encodeURIComponent(sportKey)}`;
    const rosterUrl = `${this.baseURL}${sportKey}/roster`;

    return this.http.get<any[]>(teamsUrl).pipe(
      catchError(() => this.http.get<any[]>(rosterUrl)),
      map((data: any[]) => (data || [])
        .map(item => this.normalizeTeamLeagueItem(item, sportKey))
        .map(item => item.league)
        .filter(code => code.length > 0)
      ),
      map((codes: string[]) => {
        const uniqueSortedCodes = Array.from(new Set(codes)).sort((a, b) => a.localeCompare(b));
        const options = uniqueSortedCodes.map(code => ({ code, label: code }));
        return options.length > 0 ? options : this.getLeagueFallbackOptions(sportKey);
      }),
      tap(options => this.leagueCache.set(sportKey, options))
    );
  }

  GetPositionCodes(sport: string): Observable<PositionCodesDTO[]> {
    const sportKey = this.normalizeSportKey(sport);
    const cached = this.positionCache.get(sportKey);
    if (cached) {
      // Return cached value as observable, rather than calling the API again
      return of(cached);
    }

    // Fetch from API and "tap" into the observable chain to cache the result for this sport
    return this.http.get<any[]>(`${this.baseURL}staticdata/positions?sport=${encodeURIComponent(sportKey)}`)
      .pipe(
        map((data: any[]) => (data || [])
          .map(item => this.normalizePositionCodeItem(item, sportKey))
          .filter(item => item.positionCode.length > 0)
        ),
        tap(data => this.positionCache.set(sportKey, data))
      );
  }
}

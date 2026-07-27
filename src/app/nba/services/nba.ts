export interface Nba {
}

export interface NBARosterDto {
  playerId: string | number;
  teamCode?: string;
  team: string;
  teamName?: string;
  league?: string;
  firstName: string;
  lastName: string;
  position: string;
  number: string;
  height: string;
  weight: string;
  dateOfBirth: Date | null;
  birthCountry: string;
  birthCityState: string;
  college: string;
  draftYear?: number | null;
  seasonYear?: number | null;
  pointsPerGame?: number | null;
  reboundsPerGame?: number | null;
  assistsPerGame?: number | null;
}


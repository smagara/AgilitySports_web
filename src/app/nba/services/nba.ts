export interface Nba {
}

export interface NBARosterDto {
  playerID: number;
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
  college: string;
  yearDrafted?: number | null;
}


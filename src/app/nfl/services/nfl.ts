export interface Nfl {
}

export interface NFLRosterDto {
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
    dateOfBirth?: Date | null;
    age?: number | null;
    college: string;
    yearDrafted?: number | null;
    draftYear?: number | null;
}
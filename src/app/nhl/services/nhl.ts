export interface Nhl {
}

export interface NHLRosterDto {
    playerID: number;
    name?: string;
    firstName?: string;
    lastName?: string;
    teamCode?: string;
    team?: string;
    teamName?: string;
    league?: string;
    number?: string;
    position?: string;
    height?: string;
    weight?: string;
    dateOfBirth?: Date | string | null;
    handed?: string;
    age?: number;
    drafted?: number;
    yearDrafted?: number;
    college?: string;
    birthPlace?: string;
    birthCountry?: string;
}


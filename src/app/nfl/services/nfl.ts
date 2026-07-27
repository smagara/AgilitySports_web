export interface Nfl {
}

export interface NFLRosterDto {
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
    dateOfBirth?: Date | null;
    age?: number | null;
    college: string;
    birthCityState?: string;
    birthCountry?: string;
    draftYear?: number | null;
    seasonYear?: number | null;
    sacks?: number | null;
    touchdowns?: number | null;
}
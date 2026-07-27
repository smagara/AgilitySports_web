export interface Nhl {
}

export interface NHLRosterDto {
    playerId: number;
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
    age?: number;
    draftYear?: number;
    seasonYear?: number;
    college?: string;
    birthCityState?: string;
    birthCountry?: string;
    handed?: string;
    goals?: number;
    penaltyMinutes?: number;
    points?: number;
    savePct?: number;
}


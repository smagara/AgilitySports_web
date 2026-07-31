export interface Fif {
}

export interface FIFRosterDto {
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
    totalGoals?: number | null;
    assists?: number | null;
    saves?: number | null;
}

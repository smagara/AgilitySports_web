export interface Pga {
}

export interface PGARosterDto {
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
    wins?: number | null;
    majors?: number | null;
    drivingDistance?: number | null;
    scoringAverage?: number | null;
    eventsPlayed?: number | null;
    cutsMade?: number | null;
}

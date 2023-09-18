export interface mlb {
}

export interface MLBRosterDto {
    playerID: string;
    teamName: string;
    firstName: string;
    lastName: string;
    league: string;
    position: string;
    height: string;
    weight: string;
    bats: string;
    throws: string;
    dateOfBirth: Date;
    birthCountry: string;
    birthPlace: string;
}

export interface MLBAttendanceDto {
    yearId: number;
    teamId: string;
    teamName: string;
    parkName: string;
    attendance: number;
}


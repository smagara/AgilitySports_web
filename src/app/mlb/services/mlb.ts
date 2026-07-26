export interface mlb {
}

export interface MLBRosterDto {
    playerId: string | number;
    teamCode?: string;
    teamName: string;
    firstName: string;
    lastName: string;
    league: string;
    position: string;
    number?: string;
    height: string;
    weight: string;
    dateOfBirth: Date | null;
    birthCountry: string;
    birthPlace: string;
    draftYear?: number | null;
    bats: string;
    throws: string;
    battingAverage?: number | null;
    homeRuns?: number | null;
    era?: number | null;
}

export interface MLBAttendanceDto {
    yearId: string;
    teamId: string;
    teamName: string;
    parkName: string;
    attendance: number;
}

// export interface Dataset
// {
//     label: string;
//     backgroundColor : string;
//     data: string[];
// }

// export interface MLBAttendChartDTO
// {
//     labels: string[];
//     datasets: {
//       [key: string] : Dataset
//     }
// }

export interface MLBAttendChartDTO {
  labels: string[]
  datasets: Dataset[]
}

export interface Dataset {
  label: string
  backgroundColor: any
  data: string[]
}


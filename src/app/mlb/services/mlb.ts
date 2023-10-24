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


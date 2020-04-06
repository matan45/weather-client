export class CoronaVirusModel {
  Countries: CountryData[] = [];
  Date: string = "";
  totalDeath: number = 0;
  totalReportedCases: number = 0;
}

export class CountryData {
  id: number = 0;
  Country: string;
  NewConfirmed: number;
  TotalConfirmed: number;
  NewDeaths: number;
  TotalDeaths: number;
  NewRecovered: number;
  TotalRecovered: number;
}

export class DaysForecasts {
  DailyForecasts: DailyDeatil[] = [];
  Headline:HeadLine = new HeadLine();
}

export class HeadLine{
  Text:string ="";
}

export class DailyDeatil {
  Date: string;
  DayofWeek: string;
  Temperature: {
    Minimum: {
      Value: number;
    };
    Maximum: {
      Value: number;
    };
  };
  Day: {
    Icon: string;
  };
  Night: {
    Icon: string;
  };
}

export class Citykey {
  Key: number;
  LocalizedName: string;
  Country: {
    LocalizedName: string;
  };
}

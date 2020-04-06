

export class CityWeather {
  static readonly type = "[location]CityWeather";
  constructor(public payload: string ) {}
}

export class CoronaData {
  static readonly type = "[location]Coronadata";
}


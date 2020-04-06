import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { DaysForecasts, Citykey } from "./DailyForecasts";
import { CoronaVirusModel } from './coronavirusmodel';

@Injectable({
  providedIn: "root"
})
export class WeatherService {

  private readonly coronaUrl = "https://matan-weatherapp-server.herokuapp.com/";

  constructor(private httpClient: HttpClient) {}

  getCityKey(cityname: string): Observable<Citykey[]> {
    const nopspcecityname = cityname.replace(" ", "%20");
    const citytUrl = `${this.coronaUrl}/citykey/${nopspcecityname}`;
    return this.httpClient.get<Citykey[]>(citytUrl).pipe(
      map(response => response)
    );
  }

  getCityWeather5days(citynumber: number): Observable<DaysForecasts> {
    const citytUrl = `${this.coronaUrl}/forecasts/${citynumber}`;
    return this.httpClient.get<DaysForecasts>(citytUrl).pipe(
      map(response => response)
    );
  }

  getCoronaVirusData(): Observable<CoronaVirusModel> {
    return this.httpClient.get<CoronaVirusModel>(`${this.coronaUrl}/coronavirus`).pipe(
      map(response => response)
    );
  }
}




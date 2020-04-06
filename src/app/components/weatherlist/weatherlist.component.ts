import { Component, OnInit } from "@angular/core";
import { LocationState } from "src/app/store/weather.state";
import { Select } from "@ngxs/store";
import { Observable } from "rxjs";
import { DaysForecasts } from "src/app/services/DailyForecasts";

@Component({
  selector: "app-weatherlist",
  templateUrl: "./weatherlist.component.html",
  styleUrls: ["./weatherlist.component.scss"],
})
export class WeatherlistComponent implements OnInit {
  @Select(LocationState.getLocationName) cityName: Observable<string>;
  @Select(LocationState.getLocationCountry) countryName: Observable<string>;
  @Select(LocationState.get5daysforecasts) cityforecasts: Observable<
    DaysForecasts
  >;
  @Select(LocationState.getError) error: Observable<string>;
  public temperature: boolean = false;

  constructor() {}

  ngOnInit(): void {
  }
}

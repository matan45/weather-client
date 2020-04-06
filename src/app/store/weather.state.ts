import { CityWeather, CoronaData } from "./weather.actions";
import { State, Selector, Action, StateContext } from "@ngxs/store";
import { WeatherService } from "../services/weather.service";
import { Injectable } from "@angular/core";
import { DaysForecasts } from "../services/DailyForecasts";
import { CoronaVirusModel } from '../services/coronavirusmodel';

export class LocationStateModel {
  name: string;
  country: string;
  daysforecasts: DaysForecasts;
  error: string;
  coronadata: CoronaVirusModel;
  spinner:boolean;
}

@State<LocationStateModel>({
  name: "location",
  defaults: {
    name: "not ready",
    country: "Israel",
    daysforecasts: new DaysForecasts(),
    error: "",
    coronadata: new CoronaVirusModel(),
    spinner:false
  }
})
@Injectable({
  providedIn: "root"
})
export class LocationState {

  constructor(private weatherservice: WeatherService) {}

  @Selector()
  static getLocationName(state: LocationStateModel) {
    return state.name;
  }

  @Selector()
  static getspinner(state: LocationStateModel) {
    return state.spinner;
  }

  @Selector()
  static getcoronadata(state: LocationStateModel) {
    return state.coronadata;
  }

  @Selector()
  static getLocationCountry(state: LocationStateModel) {
    return state.country;
  }

  @Selector()
  static getError(state: LocationStateModel) {
    return state.error;
  }

  @Selector()
  static get5daysforecasts(state: LocationStateModel) {
    for (let i = 0; i < state.daysforecasts.DailyForecasts.length; i++) {
      state.daysforecasts.DailyForecasts[i].DayofWeek = this.modifyday(
        new Date(state.daysforecasts.DailyForecasts[i].Date.substring(0, 10)).getDay().toString());

      state.daysforecasts.DailyForecasts[
        i
      ].Date = state.daysforecasts.DailyForecasts[i].Date.substring(0, 10).split("-").reverse().join("-");

      state.daysforecasts.DailyForecasts[i].Day.Icon = (
        "0" + state.daysforecasts.DailyForecasts[i].Day.Icon
      ).slice(-2);
      state.daysforecasts.DailyForecasts[i].Night.Icon = (
        "0" + state.daysforecasts.DailyForecasts[i].Night.Icon
      ).slice(-2);
    }
    return state.daysforecasts;
  }

  private static modifyday(numberday: string): string {
    switch (numberday) {
      case "0":
        return "Sunday";
      case "1":
        return "Monday";
      case "2":
        return "Tuesday";
      case "3":
        return "Wednesday";
      case "4":
        return "Thursday";
      case "5":
        return "Friday";
      case "6":
        return "Saturday";
      default:
        return "not a day of the week";
    }
  }

  @Action(CityWeather)
  cityKey(
    { getState, patchState }: StateContext<LocationStateModel>,
    { payload }: CityWeather
  ) {
    patchState({
      spinner:true
    });
    const state = getState();
    if (payload.length > 0) {

      this.weatherservice.getCityKey(payload).subscribe(res => {
        if (res.length > 0 && res[0].LocalizedName.toUpperCase() === payload.toUpperCase()) {
          patchState({
            country: res[0].Country.LocalizedName,
            name: payload
          });
          this.weatherservice.getCityWeather5days(res[0].Key).subscribe(data => {
              patchState({
                daysforecasts: data,
                error: "",
                spinner:false
              });
            });
        } else {
          patchState({
            country: state.country,
            name: payload,
            error: "Cant fined the city",
            spinner:false
          });
        }
      },error=>{
        patchState({
          country: state.country,
          name: payload,
          error: "500 Max max request is reached need to wait 24h for it to reset",
          spinner:false
        });
      });
    } else {
      patchState({
        name: state.name,
        country: state.country,
        error: "Empty Search",
        spinner:false
      });
    }
  }

  @Action(CoronaData)
  getcoronadata({ getState, patchState }: StateContext<LocationStateModel>) {
    const state = getState();
    patchState({
      spinner:true
    });
    this.weatherservice.getCoronaVirusData().subscribe(data => {
      patchState({
        coronadata: data,
        spinner:false
      });
    });
  }
}

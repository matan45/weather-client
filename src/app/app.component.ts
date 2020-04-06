import { Component, OnInit, OnChanges } from "@angular/core";
import { Store, Select } from '@ngxs/store';
import { CityWeather } from './store/weather.actions';
import { Router } from '@angular/router';


@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {

  public isCollapsed = false;
 
  constructor(private store:Store,private router:Router) {}

  ngOnInit(): void {
    this.store.dispatch(new CityWeather("tel aviv"));
  }

  doSearch(value: string) {
    this.store.dispatch(new CityWeather(value));
    this.router.navigate(['/']);
  }
  
}

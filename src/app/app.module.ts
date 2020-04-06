import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { Routes, RouterModule } from '@angular/router';

import { NgxsModule } from "@ngxs/store";

import { AppComponent } from "./app.component";
import { WeatherlistComponent } from "./components/weatherlist/weatherlist.component";
import { LocationState } from './store/weather.state';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { TemperatureConverterPipe } from './services/temperature-converter.pipe';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import {MatSlideToggleModule} from '@angular/material/slide-toggle';

import { CoronavirusComponent } from './components/coronavirus/coronavirus.component';
import { FormsModule } from '@angular/forms';
import { FillterPipe } from './services/fillter.pipe';

const routes: Routes = [
  { path: "", component: WeatherlistComponent },
  { path: "coronavirus", component: CoronavirusComponent },
  { path: "**", redirectTo: "" },
];

@NgModule({
  declarations: [AppComponent,FillterPipe,TemperatureConverterPipe,WeatherlistComponent, CoronavirusComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    NgxsModule.forRoot([
      LocationState
    ]),
    RouterModule.forRoot(routes),
    MatSlideToggleModule,
    NoopAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

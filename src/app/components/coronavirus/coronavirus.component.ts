import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { CountryData, CoronaVirusModel } from 'src/app/services/coronavirusmodel';
import { Observable } from 'rxjs';
import { LocationState } from 'src/app/store/weather.state';
import { CoronaData } from 'src/app/store/weather.actions';

@Component({
  selector: 'app-coronavirus',
  templateUrl: './coronavirus.component.html',
  styleUrls: ['./coronavirus.component.scss']
})
export class CoronavirusComponent implements OnInit {
  @Select(LocationState.getcoronadata) coronadata: Observable<CoronaVirusModel>;

  country: CountryData[] = [];

  public page = 1;
  public pageSize = 20;
  public collectionSize = 0;

  public filtername: string = "";

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(new CoronaData());
    this.coronadata.subscribe(data => {
      this.country = data.Countries;
      this.collectionSize = data.Countries.length;
    });
  }

  get countries(): CountryData[] {
    if (this.filtername.length === 0) {
      return this.country
        .map((country, i) => ({ id: i + 1, ...country }))
        .slice(
          (this.page - 1) * this.pageSize,
          (this.page - 1) * this.pageSize + this.pageSize
        );
    }
    return this.country.map((country, i) => ({ id: i + 1, ...country }));
  }
}

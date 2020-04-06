import { Pipe, PipeTransform } from "@angular/core";
import { CountryData } from "./coronavirusmodel";

@Pipe({
  name: "filter"
})
export class FillterPipe implements PipeTransform {
  transform(value: CountryData[], filter: string): CountryData[] {
    if(filter.length===0){
      return value;
    }
    const result: CountryData[] = [];
    for (const item of value) {
      if (item.Country.toUpperCase().includes(filter.toUpperCase())) {
        result.push(item);
      }
    }
    return result;
  }
}

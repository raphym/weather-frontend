import { Component, Input, OnInit } from '@angular/core';
import { CityDetails, Weather } from 'src/app/model/general';

@Component({
  selector: 'weather-current',
  templateUrl: './weather-current.component.html',
  styleUrls: ['./weather-current.component.scss']
})
export class WeatherCurrentComponent implements OnInit {

  // weather of the current city
  @Input() weather: Weather;
  // city details of the current city
  @Input() cityDetails: CityDetails;
  // city details of the favorites cities
  @Input() favList: CityDetails[];

  // ui variables
  public code: string;
  public temp: number;
  public degresType: string;
  public isFavorite: boolean;
  constructor() { }

  ngOnInit() {
    this.buildWeather();
  }

  // build the weather
  buildWeather() {
    this.code = this.weather.icon;
    this.temp = this.weather.temp;
    this.degresType = 'celsius';
  }

}

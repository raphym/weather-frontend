import { Component, Input, OnInit } from '@angular/core';
import { CityDetails, Weather, WeatherForecast } from 'src/app/model/general';

@Component({
  selector: 'home-weather',
  templateUrl: './home-weather.component.html',
  styleUrls: ['./home-weather.component.scss']
})
export class HomeWeatherComponent implements OnInit {
  // weather of the current city
  @Input() weather: Weather;
  // forecast of the current city
  @Input() forecast: WeatherForecast;
  // city details of the current city
  @Input() cityDetails: CityDetails;
  // city details of the favorites cities
  @Input() favList: CityDetails[];

  constructor() { }

  ngOnInit() {
  }

}

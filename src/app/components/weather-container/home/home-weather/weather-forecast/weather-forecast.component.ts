import { Component, OnInit, Input } from '@angular/core';
import { WeatherForecast, CityDetails, Weather } from 'src/app/model/general';
import * as moment from 'moment';
import { WeatherHelper } from 'src/app/utils/weather.helper';
import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';
@Component({
  selector: 'weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.scss']
})
export class WeatherForecastComponent implements OnInit {

  @Input() forecast: WeatherForecast;
  public t: any;
  public list: Weather[] = [];

  constructor() { }

  ngOnInit() {
  const forecastArr = Object.entries(this.forecast);
  if (forecastArr.length > 5) {
    forecastArr.splice(0, 1);
  }
  forecastArr.forEach( e => {
    const size = e[1].length;
    const place = Math.floor(size / 2);
    const element = e[1][place - 1] || e[1][place];
    this.list.push(element);
  });

  }

}

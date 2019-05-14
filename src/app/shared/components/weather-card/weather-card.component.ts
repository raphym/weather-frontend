import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CityDetails } from 'src/app/model/general';
import { FavoritesService } from 'src/app/services/favorites.service';
import { WeatherService } from 'src/app/services/weather.service';

const FAV_URL = '/favorites';

@Component({
  selector: 'weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.scss']
})
export class WeatherCardComponent implements OnInit, OnChanges {

  // city details of the current city
  @Input() cityDetails: CityDetails;
  @Input() code: string;
  @Input() temp: number;
  @Input() degresType = 'celsius';
  // city details of the favorites cities
  @Input() favList: CityDetails[];

  // event to show the clicked city
  @Output() showCityEvent = new EventEmitter<CityDetails>();

  // ui variables
  public description: string;
  public background: string;
  public picture: string;
  public symbol: string;
  public classFav: string;
  public isFav = false;
  public isShow = false;
  public isLink = false;
  constructor(
    private weatherService: WeatherService,
    private favoritesService: FavoritesService,
    private router: Router) { }

  ngOnInit() {
    this.checkIsFavorite();
    this.initCursor();
    this.symbol = this.degresType === 'celsius' ? '&#176;' : '&#8457;';
    this.setIm(this.code);
  }

  // check the url ==> if favorites page so the user can click
  // to show the city in details
  initCursor() {
    const url = this.router.url;
    if (url === FAV_URL) {
      this.isLink = true;
    }

  }

  ngOnChanges() {
    this.checkIsFavorite();
  }

  // function to check if the current city is in favorites
  checkIsFavorite(): void {
    if (this.favList.findIndex((curr) => (curr.name).toLowerCase() === (this.cityDetails.name.toLowerCase())) === -1) {
      this.isFav = false;
    } else {
      this.isFav = true;
    }
    this.classFav = this.isFav === true ? 'heart-red' : 'heart-grey';
  }

  // add/remove the city to the favorites
  setFavorite() {
    this.weatherService.setFavEvent.emit(this.isFav);
    this.favoritesService.setFavEvent.emit({ name: this.cityDetails.name, id: this.cityDetails.id });
  }

  // show the city weather in details
  showCity() {
    this.showCityEvent.emit(this.cityDetails);
  }

  // illustration of the weather
  setIm(code: string): void {
    switch (code) {
      case '01d': {
        this.description = 'Mostly sunny';
        this.background = 'card-sunny';
        this.picture = 'sunny';
        this.isShow = true;
        break;
      }
      case '01n': {
        this.description = 'clear sky';
        this.background = 'card-night';

        this.picture = 'night';
        this.isShow = true;
        break;
      }
      case '02d': {
        this.description = 'few clouds';
        this.background = 'card-sunny';
        this.picture = 'clouds';
        this.isShow = true;
        break;
      }
      case '02n': {
        this.description = 'few clouds';
        this.background = 'card-night';
        this.picture = 'clouds';
        this.isShow = true;
        break;
      }
      case '03d': {
        this.description = 'scattered clouds';
        this.background = 'card-snow';
        this.picture = 'clouds';
        this.isShow = true;
        break;
      }
      case '03n': {
        this.description = 'scattered clouds';
        this.background = 'card-night';
        this.picture = 'clouds2';
        this.isShow = true;
        break;
      }
      case '04d': {
        this.description = 'broken clouds';
        this.background = 'card-storm';
        this.picture = 'clouds3';
        this.isShow = true;
        break;
      }
      case '04n': {
        this.description = 'broken clouds';
        this.background = 'card-night';
        this.picture = 'clouds3';
        this.isShow = true;
        break;
      }
      case '09d': {
        this.description = 'shower rain';
        this.background = 'card-rain';
        this.picture = 'rain';
        this.isShow = true;
        break;
      }
      case '09n': {
        this.description = 'shower rain';
        this.background = 'card-night';
        this.picture = 'rain';
        this.isShow = true;
        break;
      }
      case '10d': {
        this.description = 'rain';
        this.background = 'card-storm';
        this.picture = 'rain';
        this.isShow = true;
        break;
      }
      case '10n': {
        this.description = 'rain';
        this.background = 'card-night';
        this.picture = 'rain';
        this.isShow = true;
        break;
      }
      case '11d': {
        this.description = 'thunderstorm';
        this.background = 'card-storm';
        this.picture = 'storm';
        this.isShow = true;
        break;
      }
      case '11n': {
        this.description = 'thunderstorm';
        this.background = 'card-night';
        this.picture = 'storm';
        this.isShow = true;
        break;
      }
      case '13d': {
        this.description = 'snow';
        this.background = 'card-snow';
        this.picture = 'snow';
        this.isShow = true;
        break;
      }
      case '13n': {
        this.description = 'snow';
        this.background = 'card-night';
        this.picture = 'snow';
        this.isShow = true;
        break;
      }
      case '50d': {
        this.description = 'snow';
        this.background = 'card-snow';
        this.picture = 'snow';
        this.isShow = true;
        break;
      }
      case '50n': {
        this.description = 'clear sky';
        this.background = 'card-night';
        this.picture = 'night';
        this.isShow = true;
        break;
      }
      default:
        break;
    }
  }

}

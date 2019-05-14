import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { CityDetails, Coordination, Weather, WeatherForecast } from 'src/app/model/general';
import { AppState } from 'src/app/redux/app.state';
import { FavoritesService } from 'src/app/services/favorites.service';
import { WeatherService } from 'src/app/services/weather.service';

import * as FavoritesActions from '../../../redux/favorites/favorites.actions';
import * as WeatherActions from '../../../redux/general/general.actions';

const CITY_QUERY = 'city';
const DEFAULT_CITY = 'Tel Aviv District';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(
    private store: Store<AppState>,
    private weatherService: WeatherService,
    private favoritesService: FavoritesService,
    private activatedRoute: ActivatedRoute
  ) { }

  // ui variables
  public isShown = false;
  public currentCity: CityDetails = null;
  public favList: CityDetails[] = [];
  public isLoading = true;
  public weather: Weather;
  public forecast: WeatherForecast;

  // Subscription
  public subscriptionIsShown: Subscription;
  public subscriptionIsLoading: Subscription;
  public subscriptionCurrentCity: Subscription;
  public subscriptionGeneralWeather: Subscription;
  public subscriptionGeneralForecast: Subscription;
  public subscriptionFavList: Subscription;
  public subscriptionFavEvent: Subscription;


  ngOnInit() {
    this.initSubscriptions();
    this.initQuery();
  }

  ngOnDestroy(): void {
    this.destroy();
  }

  // init all Subscriptions for the home page
  initSubscriptions() {

    this.subscriptionIsShown = this.weatherService.isShow$.subscribe(isShown => this.isShown = isShown);

    this.subscriptionIsLoading = this.weatherService.isLoading$.subscribe(isLoading => this.isLoading = isLoading);

    this.subscriptionCurrentCity = this.weatherService.currentCity$.subscribe(currentCity => this.currentCity = currentCity);

    this.subscriptionGeneralWeather = this.weatherService.generalWeather$.subscribe(generalWeather => this.weather = generalWeather);

    this.subscriptionGeneralForecast = this.weatherService.generalForecast$.subscribe(generalForecast => this.forecast = generalForecast);

    this.subscriptionFavList = this.favoritesService.favoritesList$.subscribe(favoritesList => this.favList = favoritesList);

    this.subscriptionFavEvent = this.weatherService.setFavEvent.subscribe(data => this.favoritesChange(data));

  }

  // catch the query param to show the weather on demand
  initQuery() {
    const params = this.activatedRoute.snapshot.queryParams;
    if (params[CITY_QUERY]) {
      this.cityChange(params[CITY_QUERY]);
    } else {
      this.cityChange(DEFAULT_CITY);
    }
  }

  // to search the weather for a city by name
  cityChange(cityName: string) {
    this.store.dispatch(new WeatherActions.LoadWeather(cityName));
  }

  // to search the weather for a city by geolocalization
  geoChange(coordination: Coordination) {
    this.store.dispatch(new WeatherActions.LoadGeoWeather(coordination));
  }

  // to add or remove a city to the favorites
  favoritesChange(isFavorite: boolean) {
    if (!isFavorite) {
      this.store.dispatch(new FavoritesActions.AddFavorite(this.currentCity));
    } else {
      this.store.dispatch(new FavoritesActions.RemoveFavorite(this.currentCity));
    }
  }

  destroy() {
    this.subscriptionIsShown.unsubscribe();
    this.subscriptionIsLoading.unsubscribe();
    this.subscriptionCurrentCity.unsubscribe();
    this.subscriptionGeneralWeather.unsubscribe();
    this.subscriptionGeneralForecast.unsubscribe();
    this.subscriptionFavList.unsubscribe();
    this.subscriptionFavEvent.unsubscribe();
  }
}

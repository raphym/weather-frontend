import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { CityDetails, Weather } from 'src/app/model/general';
import { AppState } from 'src/app/redux/app.state';
import * as FavoritesActions from '../../../redux/favorites/favorites.actions';
import { FavoritesService } from '../../../services/favorites.service';


@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit, OnDestroy {

  // ui variables
  public isShown: boolean;
  public isLoading: boolean;
  public citiesDetails: CityDetails[] = [];
  public favCitiesWeather: Weather[] = [];

  // Subscription for the variables
  public subscriptionIsShown: Subscription;
  public subscriptionIsLoading: Subscription;
  public subscriptionFavList: Subscription;
  public subscriptionFavCities: Subscription;
  public subscriptionFavEvent: Subscription;

  constructor(
    private store: Store<AppState>,
    private favoritesService: FavoritesService,
    private router: Router) { }

  ngOnInit() {
    this.initSubscriptions();
  }

  // init all Subscription for the favorites page
  initSubscriptions() {

    this.subscriptionIsShown = this.favoritesService.isShow$.subscribe(isShow => this.isShown = isShow);

    this.subscriptionIsLoading = this.favoritesService.isLoading$.subscribe(isLoading => this.isLoading = isLoading);

    this.subscriptionFavCities = this.favoritesService.favoritesCities$.subscribe(cities => this.favCitiesWeather = cities);

    this.subscriptionFavList = this.favoritesService.favoritesList$.subscribe(citiesDetails => {
      if (citiesDetails.length > 0) {
        this.citiesDetails = citiesDetails;
        this.store.dispatch(new FavoritesActions.LoadFavorites({ list: this.citiesDetails }));
      }
    });

    this.subscriptionFavEvent = this.favoritesService.setFavEvent.subscribe(data => this.favoritesChange(data));
  }

  // remove a city from the favorites
  favoritesChange(favItem: CityDetails) {
    this.store.dispatch(new FavoritesActions.RemoveFavorite({ id: favItem.id, name: favItem.name }));
  }

  // show the details weather of the selected city in the home page
  showCity(city: CityDetails) {
    this.router.navigateByUrl(`/?city=${city.name}`);
  }

  ngOnDestroy(): void {
    this.destroy();
  }

  destroy() {
    this.subscriptionIsShown.unsubscribe();
    this.subscriptionIsLoading.unsubscribe();
    this.subscriptionFavList.unsubscribe();
    this.subscriptionFavCities.unsubscribe();
    this.subscriptionFavEvent.unsubscribe();
  }
}

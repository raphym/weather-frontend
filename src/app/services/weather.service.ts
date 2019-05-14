import { EventEmitter, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from '../redux/app.state';
import {
    selectGeneralCurrentCity,
    selectGeneralForecast,
    selectGeneralIsLoading,
    selectGeneralIsShow,
    selectGeneralWeather,
} from '../redux/general/general.selector';

@Injectable({ providedIn: 'root' })
export class WeatherService {

    // Selectors

    // boolean to show/hide the screen
    public isShow$ = this.store.select(selectGeneralIsShow);
    // boolean to show the loading
    public isLoading$ = this.store.select(selectGeneralIsLoading);
    // current city chosen
    public currentCity$ = this.store.select(selectGeneralCurrentCity);
    // general weather of the chosen city
    public generalWeather$ = this.store.select(selectGeneralWeather);
    // forecast weather of the chosen city
    public generalForecast$ = this.store.select(selectGeneralForecast);

    // event to set the favorites
    public setFavEvent = new EventEmitter<boolean>();
    constructor(private store: Store<AppState>) {

    }

}



import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { concat, forkJoin, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { WeatherResponse } from 'src/app/model/weather_res';
import { ApiService } from 'src/app/services/api.service';
import { NotificationService } from 'src/app/services/notifications.service';
import { WeatherHelper } from '../../utils/weather.helper';
import * as FavoritesActions from './favorites.actions';

@Injectable()
export class FavoritesEffects {

    @Effect()
    loadFavorites$ = this.actions$
        .pipe(
            ofType(FavoritesActions.LOAD_FAVORITES),
            switchMap((action: FavoritesActions.LoadFavorites) => forkJoin(
                ...(action.payload.list).map(l => this.apiService.getWeather(l.name)))
                .pipe(switchMap(cities => {
                    cities = cities.map((city: WeatherResponse) => WeatherHelper.buildWeather(city));
                    return concat([
                        new FavoritesActions.UpdateFavorites(cities),
                        new FavoritesActions.SuccessLoadFavorites('success to load the weather')
                    ]);
                }),
                    catchError((error) => {
                        this.notifService.sendNotifEvent.emit({
                            message: 'Error to load the favorites',
                            status: 404,
                            type: 'error'
                        });
                        return of(
                            new FavoritesActions.ErrorLoadFavorites('error to load the favorites weather'));
                    })))
        );

    constructor(
        private actions$: Actions,
        private apiService: ApiService,
        private notifService: NotificationService
    ) { }
}

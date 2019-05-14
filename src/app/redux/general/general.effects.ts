import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { concat, forkJoin, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { NotificationService } from 'src/app/services/notifications.service';
import { ApiService } from '../../services/api.service';
import { WeatherHelper } from '../../utils/weather.helper';
import * as WeatherActions from './general.actions';

@Injectable()
export class GeneralEffects {
  @Effect()
  loadWeather$ = this.actions$
    .pipe(
      ofType(WeatherActions.LOAD_WEATHER),
      switchMap((action: WeatherActions.LoadWeather) => forkJoin(
        this.apiService.getWeather(action.payload),
        this.apiService.getForecast(action.payload))
        .pipe(
          switchMap(res => {
            const weather = WeatherHelper.buildWeather(res[0]);
            const forecast = WeatherHelper.buildForcastByDay(
              res[1].list, { name: res[1].city.name, id: res[1].city.id });
            return concat([
              new WeatherActions.UpdateWeather(weather),
              new WeatherActions.UpdateForecast(forecast),
              new WeatherActions.SuccessLoadWeather({
                status: 'success to load the weather',
                cityDetails: { name: res[0].name, id: res[0].id }
              })
            ]);
          }),
          catchError((error) => {
            this.notifService.sendNotifEvent.emit({
              message: 'City not found',
              status: 404,
              type: 'error'
            });
            return of(
              new WeatherActions.ErrorLoadWeather('error to load the weather'));
          })
        ))
    );

  @Effect()
  loadGeoWeather$ = this.actions$
    .pipe(
      ofType(WeatherActions.LOAD_GEO_WEATHER),
      switchMap((action: WeatherActions.LoadGeoWeather) => forkJoin(
        this.apiService.getWeatherGeo(action.payload.lon, action.payload.lat),
        this.apiService.getForecastGeo(action.payload.lon, action.payload.lat))
        .pipe(
          switchMap(res => {
            const weather = WeatherHelper.buildWeather(res[0]);
            const forecast = WeatherHelper.buildForcastByDay(
              res[1].list, { name: res[1].city.name, id: res[1].city.id });
            return concat([
              new WeatherActions.UpdateWeather(weather),
              new WeatherActions.UpdateForecast(forecast),
              new WeatherActions.SuccessLoadWeather({
                status: 'success to load the geo weather',
                cityDetails: { name: res[0].name, id: res[0].id }
              })
            ]);
          }),
          catchError((error) => {
            this.notifService.sendNotifEvent.emit({
              message: 'City not found',
              status: 404,
              type: 'error'
            });
            return of(
              new WeatherActions.ErrorLoadWeather('error to load the geo weather'));
          })
        ))
    );

  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private notifService: NotificationService
  ) { }
}

import { Action } from '@ngrx/store';
import { CityDetails, Weather, WeatherForecast } from 'src/app/model/general';

export const LOAD_WEATHER = '[WEATHER] Load';
export const LOAD_GEO_WEATHER = '[WEATHER] Load Geo';

export const SUCCESS_LOAD_WEATHER = '[WEATHER] Success';
export const ERROR_LOAD_WEATHER = '[WEATHER] Error';
export const UPDATE_WEATHER = '[WEATHER] Update';
export const UPDATE_FORECAST = '[FORECAST] Update';


// load the weather
export class LoadWeather implements Action {
    readonly type = LOAD_WEATHER;

    constructor(public payload: string) { }
}

// load the weather by geo
export class LoadGeoWeather implements Action {
    readonly type = LOAD_GEO_WEATHER;

    constructor(public payload: {
        lon: number,
        lat: number
    }) { }
}

// success to load the weather
export class SuccessLoadWeather implements Action {
    readonly type = SUCCESS_LOAD_WEATHER;

    constructor(public payload: { status: string, cityDetails: CityDetails }) { }
}

// error to load the weather
export class ErrorLoadWeather implements Action {
    readonly type = ERROR_LOAD_WEATHER;

    constructor(public payload: string) { }
}

// update the weather
export class UpdateWeather implements Action {
    readonly type = UPDATE_WEATHER;

    constructor(public payload: Weather) { }
}

// update the forecast weather
export class UpdateForecast implements Action {
    readonly type = UPDATE_FORECAST;

    constructor(public payload: WeatherForecast) { }
}

export type Actions =
    LoadWeather |
    LoadGeoWeather |
    SuccessLoadWeather |
    ErrorLoadWeather |
    SuccessLoadWeather |
    UpdateWeather |
    UpdateForecast;

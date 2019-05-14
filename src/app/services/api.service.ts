import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiConf } from '../conf/api';
import { Units } from '../model/general';
import { WeatherForecastResponse } from '../model/weather_forecast_res';
import { WeatherResponse } from '../model/weather_res';

@Injectable({ providedIn: 'root' })
export class ApiService {
    // urls of the openweather api
    private urls = {
        weather: `https://api.openweathermap.org/data/2.5/weather?appid=${ApiConf.key}`,
        forcast: `https://api.openweathermap.org/data/2.5/forecast?appid=${ApiConf.key}`
    };

    constructor(private http: HttpClient) { }

    /**
     * @description get the weather by city name
     * @param city
     * @param units
     */
    public getWeather(city: string, units?: Units): Observable<WeatherResponse> {
        if (!units) { units = 'metric'; }

        const url = `${this.urls.weather}&q=${city}&units=${units}`;
        return this.http.get(url) as Observable<WeatherResponse>;
    }

    /**
     * @description get the forecast weather by city name
     * @param city
     * @param units
     */
    public getForecast(city: string, units?: Units): Observable<WeatherForecastResponse> {
        if (!units) { units = 'metric'; }

        const url = `${this.urls.forcast}&q=${city}&units=${units}`;
        return this.http.get(url) as Observable<WeatherForecastResponse>;
    }

    /**
     * @description get the weather by geolocalization
     * @param lon
     * @param lat
     * @param units
     */
    public getWeatherGeo(lon: number, lat: number, units?: Units): Observable<WeatherResponse> {
        if (!units) { units = 'metric'; }

        const url = `${this.urls.weather}&lon=${lon}&lat=${lat}&units=${units}`;
        return this.http.get(url) as Observable<WeatherResponse>;
    }

    /**
     * @description get the forecast weather by geolocalization
     * @param lon
     * @param lat
     * @param units
     */
    public getForecastGeo(lon: number, lat: number, units?: Units): Observable<WeatherForecastResponse> {
        if (!units) { units = 'metric'; }

        const url = `${this.urls.forcast}&lon=${lon}&lat=${lat}&units=${units}`;
        return this.http.get(url) as Observable<WeatherForecastResponse>;
    }


}

import { flow as _flow_fp, groupBy as _groupBy_fp, map as _map_fp } from 'lodash/fp';
import * as moment from 'moment';
import { CityDetails, Weather, WeatherForecast } from '../model/general';
import { ItemWeather } from '../model/weather_forecast_res';
import { WeatherResponse } from '../model/weather_res';


export class WeatherHelper {
    constructor() {

    }
    /**
    *
    * @param weatherRes
    * @returns Weather
    * @description build the weather
    */
    public static buildWeather(item: WeatherResponse | ItemWeather, isForecast = false): Weather {
        let date: string;
        let hour: string;
        if (isForecast) {
            date = (item as ItemWeather).dt_txt.slice(0, 10);
            hour = (item as ItemWeather).dt_txt.slice(11);
        } else {
            date = this.convertDate(new Date(item.dt));
            hour = '';
        }
        return {
            id: item.id,
            cityName: item.name,
            humidity: item.main.humidity,
            pressure: item.main.pressure,
            sea_level: item.main.sea_level,
            temp: item.main.temp,
            temp_max: item.main.temp_max,
            temp_min: item.main.temp_min,
            date: date,
            hour: hour,
            description: item.weather[0].description,
            icon: item.weather[0].icon
        };
    }

    /**
     * @param weatherResponseList
     * @returns WeatherForecast
     * @description build the forecast weather
     */
    public static buildForcastByDay(weatherResponseList: ItemWeather[], currentCity: CityDetails): WeatherForecast {
        return _flow_fp([
            _map_fp((item: ItemWeather) => {
                item.id = currentCity.id;
                item.name = currentCity.name;
                return item;
            }),
            _map_fp((item: ItemWeather) => this.buildWeather(item, true)),
            _groupBy_fp(item => item.date)
        ])(weatherResponseList);
    }

    /**
     * @param date
     * @description date to string
    */
    private static convertDate(date: Date): string {
        const curr_date = date.getDate();
        const curr_month = date.getMonth() + 1;
        const curr_year = date.getFullYear();
        return `${curr_year}-${curr_month}-${curr_date}`;
    }

    /**
     *
     * @description compare date weathers
     * @param ItemWeather
     * @param ItemWeather
     */
    public static compareDate(a: ItemWeather, b: ItemWeather) {
        const dateA = moment(a.dt);
        const dateB = moment(b.dt);
        if (dateA.isBefore(dateB)) {
            return -1;
        }
        if (dateA.isAfter(dateB)) {
            return 1;
        }
        // a must be equal to b
        return 0;
    }

}

export type Units = 'fahrenheit' | 'metric';

export interface GeneralState {
    data: CityWeather;
    currentCity: CityDetails;
    isShown: boolean;
    isLoading: boolean;
    status?: string;
}

export interface CityDetails {
    name: string;
    id: number;
}

export interface Coordination {
    lat: number;
    lon: number;
}

export interface CityWeather {
    weather?: Weather;
    forecast?: WeatherForecast;
}

export interface Weather {
    // id added
    id: number;
    // cityName added
    cityName: string;
    humidity: number;
    pressure: number;
    sea_level: number;
    temp: number;
    temp_max: number;
    temp_min: number;
    date: string;
    hour: string;
    description: string;
    icon: string;
}

export interface WeatherForecast {
    [date: string]: Weather[];
}

export interface Notification {
    message: string;
    type: 'primary' | 'error';
    status?: number;
}

export const initialGeneralState: GeneralState = {
    data: {},
    currentCity: null,
    isShown: false,
    isLoading: false,
    status: ''
};




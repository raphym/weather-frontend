import { GeneralState } from '../../model/general';
import { initialState } from '../app.state';
import * as WeatherActions from './general.actions';


export function generalReducer(generalState: GeneralState = initialState.general, action: WeatherActions.Actions) {
    switch (action.type) {
        case WeatherActions.LOAD_WEATHER: {
            return {
                ...generalState,
                currentCity: { name: action.payload, id: -1 },
                isShown: false,
                isLoading: true
            };
        }
        case WeatherActions.LOAD_GEO_WEATHER: {
            return {
                ...generalState,
                currentCity: { name: action.payload, id: -1 },
                isShown: false,
                isLoading: true
            };
        }
        case WeatherActions.SUCCESS_LOAD_WEATHER: {
            return {
                ...generalState,
                currentCity: action.payload.cityDetails,
                isShown: true,
                isLoading: false,
                status: action.payload.status
            };
        }
        case WeatherActions.ERROR_LOAD_WEATHER: {
            return {
                ...generalState,
                currentCity: null,
                isShown: false,
                isLoading: false,
                status: action.payload
            };
        }
        case WeatherActions.UPDATE_WEATHER: {
            return {
                ...generalState,
                data: {
                    ...(generalState.data),
                    weather: action.payload
                }
            };
        }
        case WeatherActions.UPDATE_FORECAST: {
            return {
                ...generalState,
                data: {
                    ...(generalState.data),
                    forecast: action.payload
                }
            };
        }
        default:
            return generalState;
    }
}

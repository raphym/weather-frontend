import { createSelector } from '@ngrx/store';
import { GeneralState } from '../../model/general';
import { AppState } from '../app.state';


export const selectGeneral = (state: AppState) => state.general;

export const selectGeneralIsShow = createSelector(
    selectGeneral,
    (state: GeneralState) => state.isShown
);

export const selectGeneralIsLoading = createSelector(
    selectGeneral,
    (state: GeneralState) => state.isLoading
);

export const selectGeneralCurrentCity = createSelector(
    selectGeneral,
    (state: GeneralState) => state.currentCity
);

export const selectGeneralWeather = createSelector(
    selectGeneral,
    (state: GeneralState) => state.data.weather
);

export const selectGeneralForecast = createSelector(
    selectGeneral,
    (state: GeneralState) => state.data.forecast
);

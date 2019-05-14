import { createSelector } from '@ngrx/store';
import { FavoritesState } from '../../model/favorite';
import { AppState } from '../app.state';


export const selectFavorites = (state: AppState) => state.favorites;

export const selectFavoritesIsShow = createSelector(
    selectFavorites,
    (state: FavoritesState) => state.isShown
);

export const selectFavoritesIsLoading = createSelector(
    selectFavorites,
    (state: FavoritesState) => state.isLoading
);

export const selectFavoritesList = createSelector(
    selectFavorites,
    (state: FavoritesState) => state.data.list
);

export const selectFavoritesCities = createSelector(
    selectFavorites,
    (state: FavoritesState) => state.data.cities
);

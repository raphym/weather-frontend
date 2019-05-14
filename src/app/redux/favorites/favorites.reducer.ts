import { FavoritesState } from 'src/app/model/favorite';

import { initialState } from '../app.state';
import * as FavoritesActions from './favorites.actions';


export function favoritesReducer(favoritesState: FavoritesState = initialState.favorites, action: FavoritesActions.Actions) {
    switch (action.type) {
        case FavoritesActions.ADD_FAVORITE: {
            const index = (favoritesState.data).list.findIndex(city => city.id === action.payload.id);
            if (index === -1) {
                const newFavoritesList = [
                    ...(favoritesState.data).list,
                    {
                        id: action.payload.id,
                        name: (action.payload.name).toLowerCase()
                    }];
                return {
                    ...favoritesState,
                    data: {
                        ...(favoritesState.data),
                        list: newFavoritesList
                    }
                };
            }
            return favoritesState;
        }
        case FavoritesActions.SET_FAVORITES: {
            return {
                ...favoritesState,
                data: {
                    ...(favoritesState.data),
                    list: action.payload.list
                }
            };
        }
        case FavoritesActions.REMOVE_FAVORITE: {
            const indexFavItems = (favoritesState.data).list.findIndex(city => city.id === action.payload.id);
            if (indexFavItems > -1) {
                const newFavoritesListItems = [...(favoritesState.data).list];
                newFavoritesListItems.splice(indexFavItems, 1);

                const indexFavCities = (favoritesState.data).cities
                    .findIndex(city => city.id === action.payload.id);
                const newFavoritesListCities = [...(favoritesState.data).cities];
                if (indexFavCities > -1) {
                    newFavoritesListCities.splice(indexFavCities, 1);
                }
                return {
                    ...favoritesState,
                    data: {
                        cities: newFavoritesListCities,
                        list: newFavoritesListItems
                    }
                };
            }
            return favoritesState;
        }
        case FavoritesActions.LOAD_FAVORITES: {
            return {
                ...favoritesState,
                isShown: false,
                isLoading: true
            };
        }
        case FavoritesActions.SUCCESS_LOAD_FAVORITES: {
            return {
                ...favoritesState,
                isShown: true,
                status: action.payload,
                isLoading: false
            };
        }
        case FavoritesActions.ERROR_LOAD_FAVORITES: {
            return {
                ...favoritesState,
                isShown: false,
                status: action.payload,
                isLoading: false
            };
        }
        case FavoritesActions.UPDATE_FAVORITES: {
            return {
                ...favoritesState,
                data: {
                    ...(favoritesState.data),
                    cities: action.payload
                }
            };
        }
        default:
            return favoritesState;
    }
}

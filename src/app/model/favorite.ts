import { CityDetails, Weather } from './general';

export interface FavoritesState {
    data: Favorites;
    isShown: boolean;
    isLoading: boolean;
    status?: string;
}

export interface Favorites {
    list: CityDetails[];
    cities: Weather[];
}

export const initialFavoritesState: FavoritesState = {
    data: {
        list: [],
        cities: [],
    },
    isShown: false,
    isLoading: false,
    status: ''
};

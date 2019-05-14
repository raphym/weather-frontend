import { FavoritesState, initialFavoritesState } from '../model/favorite';
import { GeneralState, initialGeneralState } from '../model/general';

export const initialState: AppState = {
    general: initialGeneralState,
    favorites: initialFavoritesState
};

export interface AppState {
    general: GeneralState;
    favorites: FavoritesState;
}

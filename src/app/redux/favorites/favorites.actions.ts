import { Action } from '@ngrx/store';
import { Favorites } from 'src/app/model/favorite';
import { CityDetails } from 'src/app/model/general';

export const ADD_FAVORITE = '[FAVORITES] Add';
export const REMOVE_FAVORITE = '[FAVORITES] Remove';
export const SET_FAVORITES = '[FAVORITES] Set';

export const LOAD_FAVORITES = '[FAVORITES] Load';
export const SUCCESS_LOAD_FAVORITES = '[FAVORITES] Success';
export const ERROR_LOAD_FAVORITES = '[FAVORITES] Error';
export const UPDATE_FAVORITES = '[FAVORITES] Update';

// add a city to the favorite
export class AddFavorite implements Action {
    readonly type = ADD_FAVORITE;

    constructor(public payload: CityDetails) { }
}

// set all favorites
export class SetFavorites implements Action {
    readonly type = SET_FAVORITES;

    constructor(public payload: { list: CityDetails[] }) { }
}

// remove a city from the favorite
export class RemoveFavorite implements Action {
    readonly type = REMOVE_FAVORITE;

    constructor(public payload: CityDetails) { }
}

// load the favorites
export class LoadFavorites implements Action {
    readonly type = LOAD_FAVORITES;

    constructor(public payload: { list: CityDetails[] }) { }
}

// success to load the favorites
export class SuccessLoadFavorites implements Action {
    readonly type = SUCCESS_LOAD_FAVORITES;

    constructor(public payload: string) { }
}

// error to load the favorites
export class ErrorLoadFavorites implements Action {
    readonly type = ERROR_LOAD_FAVORITES;

    constructor(public payload: string) { }
}

// update the favorites
export class UpdateFavorites implements Action {
    readonly type = UPDATE_FAVORITES;

    constructor(public payload: Favorites['cities']) { }
}

export type Actions =
    AddFavorite |
    SetFavorites |
    RemoveFavorite |
    LoadFavorites |
    SuccessLoadFavorites |
    ErrorLoadFavorites |
    UpdateFavorites;

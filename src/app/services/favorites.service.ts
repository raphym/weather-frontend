import { EventEmitter, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { distinctUntilChanged, tap } from 'rxjs/operators';

import { CityDetails } from '../model/general';
import { AppState } from '../redux/app.state';
import {
    selectFavoritesCities,
    selectFavoritesIsLoading,
    selectFavoritesIsShow,
    selectFavoritesList,
} from '../redux/favorites/favorites.selectors';

@Injectable({ providedIn: 'root' })
export class FavoritesService {

    // Selectors

    // boolean to show/hide the screen
    public isShow$ = this.store.select(selectFavoritesIsShow);
    // boolean to show the loading
    public isLoading$ = this.store.select(selectFavoritesIsLoading);
    // favoritesList is about the cities details of the chosen favorites
    public favoritesList$ = this.store.select(selectFavoritesList);
    // favoritesCities is about the cities weather of the chosen favorites
    public favoritesCities$ = this.store.select(selectFavoritesCities);

    // event to set the favorites
    public setFavEvent = new EventEmitter<CityDetails>();

    constructor(private store: Store<AppState>) {
    }

    /**
     * update local storage
     */
    updateLocalStorage(): Observable<CityDetails[]> {
        return this.favoritesList$.pipe(
            distinctUntilChanged(),
            tap((cities: CityDetails[]) => {
                localStorage.setItem('fav-list', JSON.stringify(cities));
            })
        );
    }

}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Notification } from 'src/app/model/general';
import { AppState } from 'src/app/redux/app.state';
import { FavoritesService } from 'src/app/services/favorites.service';
import { NotificationService } from 'src/app/services/notifications.service';

import * as FavoritesActions from '../../redux/favorites/favorites.actions';

@Component({
  selector: 'weather-container',
  templateUrl: './weather-container.component.html',
  styleUrls: ['./weather-container.component.scss']
})
export class WeatherContainerComponent implements OnInit, OnDestroy {
  // notification ui variable
  public notif: Notification = null;
  // subscription for the local storage
  public subscriptionLocalStorage: Subscription;

  constructor(
    private store: Store<AppState>,
    private notifService: NotificationService,
    private favoritesService: FavoritesService
  ) { }

  ngOnInit() {
    this.initLocalStorage();
    this.initNotif();
  }

  // initialization for the local storage
  initLocalStorage() {
    const storage = localStorage.getItem('fav-list');
    if (storage) {
      const list = JSON.parse(storage);
      this.store.dispatch(new FavoritesActions.SetFavorites({ list }));
    }
    this.subscriptionLocalStorage = this.favoritesService.updateLocalStorage().subscribe();
  }

  // initialization for the notifications system
  initNotif() {
    this.notifService.sendNotifEvent.subscribe(
      (notif: Notification) => {
        this.notif = notif;
      }
    );
    this.notifService.closeEvent.subscribe(
      () => this.notif = null
    );
  }

  ngOnDestroy(): void {
    this.subscriptionLocalStorage.unsubscribe();
    this.notifService.sendNotifEvent.unsubscribe();
    this.notifService.closeEvent.unsubscribe();
  }

}

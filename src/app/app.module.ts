import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/core/header/header.component';
import { NotificationComponent } from './components/core/notification/notification.component';
import { FavoritesComponent } from './components/weather-container/favorites/favorites.component';
import { HomeWeatherComponent } from './components/weather-container/home/home-weather/home-weather.component';
import { WeatherCurrentComponent } from './components/weather-container/home/home-weather/weather-current/weather-current.component';
import {
  ForecastItemComponent
} from './components/weather-container/home/home-weather/weather-forecast/forecast-item/forecast-item.component';
import { WeatherForecastComponent } from './components/weather-container/home/home-weather/weather-forecast/weather-forecast.component';
import { HomeComponent } from './components/weather-container/home/home.component';
import { SearchComponent } from './components/weather-container/home/search/search.component';
import { WeatherContainerComponent } from './components/weather-container/weather-container.component';
import { FavoritesEffects } from './redux/favorites/favorites.effects';
import { favoritesReducer } from './redux/favorites/favorites.reducer';
import { GeneralEffects } from './redux/general/general.effects';
import { generalReducer as generalReducer } from './redux/general/general.reducer';
import { WeatherCardComponent } from './shared/components/weather-card/weather-card.component';
import { CapitalizeFirstPipe } from './shared/pipes/cityname.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    WeatherContainerComponent,
    HeaderComponent,
    HomeComponent,
    FavoritesComponent,
    WeatherCardComponent,
    HomeWeatherComponent,
    WeatherCurrentComponent,
    WeatherForecastComponent,
    CapitalizeFirstPipe,
    ForecastItemComponent,
    NotificationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    StoreModule.forRoot({
      general: generalReducer,
      favorites: favoritesReducer
    }),
    EffectsModule.forRoot([GeneralEffects, FavoritesEffects]),
    // Note that you must instrument after importing StoreModule
    StoreDevtoolsModule.instrument({
      maxAge: 20
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

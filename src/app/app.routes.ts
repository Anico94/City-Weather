import { Routes } from '@angular/router';
import { CitySearchComponent } from './components/weather-search/weather-search.component';
import { WeatherInfoComponent } from './components/weather-info/weather-info.component';

export const routes: Routes = [
  { path: '', component: CitySearchComponent },
  { path: 'weather', component: WeatherInfoComponent },
];

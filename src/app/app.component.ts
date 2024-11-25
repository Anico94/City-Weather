import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CitySearchComponent } from './weather-search/weather-search.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CitySearchComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'city-weather';
}

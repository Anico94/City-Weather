import { Component, Input } from '@angular/core';
import { CurrentDayWeather } from '../../interfaces/currentDayWeather';
import { mapIconCodeToImageURL } from '../../helper/weather-icon-mapper';

@Component({
  selector: 'app-current-weather',
  standalone: true,
  imports: [],
  templateUrl: './current-weather.component.html',
  styleUrl: './current-weather.component.scss',
})
export class CurrentWeatherComponent {
  @Input() currentWeather: CurrentDayWeather | undefined;
  public mapIconCodeToImageUrl = mapIconCodeToImageURL;
}

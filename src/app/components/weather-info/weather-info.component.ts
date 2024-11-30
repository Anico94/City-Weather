import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-weather-info',
  standalone: true,
  imports: [],
  templateUrl: './weather-info.component.html',
  styleUrl: './weather-info.component.scss',
})
export class WeatherInfoComponent {
  @Input() currentTemperature?: number;
  @Input() description?: string;
  @Input() currentTime?: string;
  @Input() city?: string;
}

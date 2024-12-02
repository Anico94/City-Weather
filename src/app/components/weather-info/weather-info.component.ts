import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WeatherApiService } from '../../services/weather-api.service';

@Component({
  selector: 'app-weather-info',
  standalone: true,
  imports: [],
  templateUrl: './weather-info.component.html',
  styleUrl: './weather-info.component.scss',
})
export class WeatherInfoComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private weatherService: WeatherApiService
  ) {}
  public city: string = '';
  public latitude: string = '';
  public longitude: string = '';
  public isDay: boolean = true;

  public ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.city = params['city'];
    });

    //TODO: chaining these calls? https://cosmincrisan.medium.com/angular-http-calls-chain-execution-with-rxjs-mergemap-eb2d7f25139

    this.weatherService.getLatitudeLongitude(this.city).subscribe((result) => {
      this.latitude = result.latitude;
      this.longitude = result.longitude;
    });

    this.weatherService
      .getCurrentWeather(this.latitude, this.longitude)
      .subscribe();

    this.weatherService.getFiveDayForcast(this.latitude, this.longitude);
  }
}

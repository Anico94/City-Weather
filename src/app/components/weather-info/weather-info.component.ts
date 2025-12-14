import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WeatherApiService } from '../../services/weather-api.service';
import { CurrentDayWeather } from '../../interfaces/currentDayWeather';
import { map } from 'rxjs';
import { ForecastWeather } from '../../interfaces/forecastWeather';

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
  public time?: Date;
  public currentWeather: CurrentDayWeather | undefined;
  public forecastWeather?: ForecastWeather[];

  public ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.city = params['city'];
    });

    //TODO: chaining these calls?
    //https://cosmincrisan.medium.com/angular-http-calls-chain-execution-with-rxjs-mergemap-eb2d7f25139

    this.weatherService.getLatitudeLongitude(this.city).subscribe((result) => {
      this.latitude = result.latitude;
      this.longitude = result.longitude;
    });

    this.weatherService
      .getCurrentWeather(this.latitude, this.longitude)
      .pipe(
        map((result) => {
          return this.mapResultToCurrentWeather(result);
        })
      )
      .subscribe({
        next: (value) => (this.currentWeather = value),
        error: () => new Error('Cannot get current weather'),
      });

    this.weatherService
      .getFiveDayForecast(this.latitude, this.longitude)
      .pipe(
        map((result) => {
          let forecastedWeather: ForecastWeather[] = [];
          for (let i = 0; i < result.list.length; i++) {
            forecastedWeather.push(
              this.mapResultToForecastWeather(result.list[i])
            );
          }
          return forecastedWeather;
        })
      )
      .subscribe({
        next: (value) => (this.forecastWeather = value),
        error: () => new Error('No forecasted weather found'),
      });
  }

  private mapResultToCurrentWeather(result: any): CurrentDayWeather {
    const currentWeather: CurrentDayWeather = {
      time: result.dt,
      temperature: result.main.temp,
      typeOfWeather: result.weather[0].main,
      icon: result.weather[0].icon,
    };
    return currentWeather;
  }

  private mapResultToForecastWeather(result: any): ForecastWeather {
    const forecastWeather: ForecastWeather = {
      temperature: result.list.main.temp,
      typeOfWeather: result.list.weather[0].main,
      icon: result.list.weather[0].icon,
    };
    return forecastWeather;
  }
}

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Coordinates } from '../interfaces/coordinates';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class WeatherApiService {
  constructor(private http: HttpClient) {}

  private geoLocationUrl = 'https://api.openweathermap.org/geo/1.0/direct';
  private currentWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather';
  private forecastWeatherUrl =
    'https://api.openweathermap.org/data/2.5/forecast';
  private apiKey = environment.openWeatherApiKey;

  //TODO: Error handling for to many requests

  public getLatitudeLongitude(
    city: string,
    searchLimit: number = 1
  ): Observable<Coordinates> {
    const params = new HttpParams()
      .set('q', city)
      .set('limit', searchLimit)
      .set('appid', this.apiKey);

    return this.http.get<any[]>(this.geoLocationUrl, { params }).pipe(
      map((data) => {
        if (data) {
          return { latitude: data[0].lat, longitude: data[0].lon };
        }
        throw new Error('No coordinates found for the specified city');
      })
    );
  }

  public getCurrentWeather(
    latitude: string,
    longitude: string
  ): Observable<any> {
    const params = new HttpParams()
      .set('lat', latitude)
      .set('lon', longitude)
      .set('appid', this.apiKey);

    return this.http.get<any>(this.currentWeatherUrl, { params });
  }

  public getFiveDayForecast(
    latitude: string,
    longitude: string
  ): Observable<any> {
    const params = new HttpParams()
      .set('lat', latitude)
      .set('lon', longitude)
      .set('appid', this.apiKey);

    return this.http.get<any[]>(this.forecastWeatherUrl, { params });
  }
}

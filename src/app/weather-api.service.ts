import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Coordinates } from './interfaces/coordinates';
import { map, Observable, of } from 'rxjs';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class WeatherApiService {
  constructor(private http: HttpClient) {}

  private baseUrl = 'http://api.openweathermap.org/';
  private apiKey = environment.openWeatherApiKey;
  // private apiKey = '123';

  public getLatitudeLongitude(city: string): Observable<Coordinates> {
    return this.http
      .get<any[]>(
        this.constructUrl(
          this.baseUrl,
          'geo/1.0/direct?q=',
          city,
          ',&limit=1&appid=',
          this.apiKey
        )
      )
      .pipe(
        map((data) => {
          if (data) {
            return { latitude: data[0].lat, longitude: data[0].lon };
          }
          throw new Error('No coordinates found for the specified city');
        })
      );
  }

  private constructUrl(...strings: string[]): string {
    const url = strings.join('');
    return url;
  }
}

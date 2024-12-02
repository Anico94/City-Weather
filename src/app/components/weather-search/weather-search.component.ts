import { Component, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { map, Observable, startWith } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { WeatherApiService } from '../../services/weather-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-city-search',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    FormsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    AsyncPipe,
  ],
  templateUrl: './weather-search.component.html',
  styleUrl: './weather-search.component.scss',
})
export class CitySearchComponent implements OnInit {
  constructor(private weatherApi: WeatherApiService, private router: Router) {}
  //Form controls
  public cityNameControl: FormControl = new FormControl('');
  public latitudeControl: FormControl = new FormControl('');
  public longitudeControl: FormControl = new FormControl('');

  //Form group --> passes in the controls above
  public citySearchForm: FormGroup = new FormGroup({
    cityName: this.cityNameControl,
    latitude: this.latitudeControl,
    longitude: this.longitudeControl,
  });

  public cities: string[] = ['Brisbane', 'London', 'Tokyo'];
  public filteredCities: Observable<string[]> | undefined;

  ngOnInit(): void {
    this.filteredCities = this.cityNameControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
  }

  //filter the autocomplete dropdown field
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.cities.filter((city) =>
      city.toLowerCase().includes(filterValue)
    );
  }

  public searchWeather(city: string): void {
    this.router.navigate(['/weather'], { queryParams: { city } });
  }
}

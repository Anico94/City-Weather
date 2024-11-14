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
  ],
  templateUrl: './city-search.component.html',
  styleUrl: './city-search.component.scss',
})
export class CitySearchComponent implements OnInit {
  //Form controls
  public cityNameControl: FormControl = new FormControl('');
  public latitudeControl: FormControl = new FormControl('');
  public longitudeControl: FormControl = new FormControl('');

  //Form group
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

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.cities.filter((city) =>
      city.toLowerCase().includes(filterValue)
    );
  }
}

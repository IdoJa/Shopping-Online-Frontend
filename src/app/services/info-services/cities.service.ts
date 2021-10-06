import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CityModel } from 'src/app/models/info-models/city.model';
import { citiesDownloadedAction } from 'src/app/redux/info-states/cities-state';
import store from 'src/app/redux/store/store';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {

  constructor(private httpClient: HttpClient) { }

  // Get all cities
  public async getAllCities(): Promise<CityModel[]> {
    if (store.getState().citiesState.cities.length === 0) {
      const cities = await this.httpClient.get<CityModel[]>(environment.citiesUrl).toPromise();
      store.dispatch(citiesDownloadedAction(cities));
    }
    return store.getState().citiesState.cities;
  }
}

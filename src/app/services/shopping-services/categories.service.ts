import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategoryModel } from 'src/app/models/product-models/category.model';
import { categoriesDownloadedAction } from 'src/app/redux/shopping-states/categories-state';
import store from 'src/app/redux/store/store';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private httpClient: HttpClient) { }

  // Get all categories
  public async getAllCategories(): Promise<CategoryModel[]> {
    if (store.getState().categoriesState.categories.length === 0) {
      const categories = await this.httpClient.get<CategoryModel[]>(environment.categoriesUrl).toPromise();
      store.dispatch(categoriesDownloadedAction(categories));
    }
    return store.getState().categoriesState.categories;
  }
}

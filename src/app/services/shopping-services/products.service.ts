import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductModel } from 'src/app/models/product-models/product.model';
import { productAddedAction, productsDownloadedAction, productUpdatedAction } from 'src/app/redux/shopping-states/products-state';
import store from 'src/app/redux/store/store';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private httpClient: HttpClient) { }

  // Get all products
  public async getAllProducts(): Promise<ProductModel[]> {
    if (store.getState().productsState.products.length === 0) {
      const products = await this.httpClient.get<ProductModel[]>(environment.productsUrl).toPromise();
      store.dispatch(productsDownloadedAction(products));
    }
    return store.getState().productsState.products;
  }

  // Get one product
  public async getOneProduct(productId: number): Promise<ProductModel> {
    const product = await this.httpClient.get<ProductModel>(environment.productsUrl + productId).toPromise();
    return product;
  }

  // Add product
  // addProduct(product: ProductModel)
  public async addProduct(productFormData: FormData): Promise<ProductModel> {
    const addedProduct = await this.httpClient.post<ProductModel>(environment.productsUrl, productFormData).toPromise();
    store.dispatch(productAddedAction(addedProduct));
    return addedProduct;
  }

  // Edit product
  public async editProduct(productFormData: FormData): Promise<ProductModel> {
    const productId = productFormData.get('productId');
    const updatedProduct = await this.httpClient.put<ProductModel>(environment.productsUrl + productId, productFormData).toPromise();
    store.dispatch(productUpdatedAction(updatedProduct));
    return updatedProduct;
  }
  
}

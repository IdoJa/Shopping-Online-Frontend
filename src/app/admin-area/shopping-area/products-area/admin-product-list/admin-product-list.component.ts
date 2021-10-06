import { Component, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/models/product-models/product.model';
import { NotificationService } from 'src/app/services/global-services/notification.service';
import { ProductsService } from 'src/app/services/shopping-services/products.service';
import store from 'src/app/redux/store/store';
import { Unsubscribe } from 'redux';


@Component({
  selector: 'app-admin-product-list',
  templateUrl: './admin-product-list.component.html',
  styleUrls: ['./admin-product-list.component.css']
})
export class AdminProductListComponent implements OnInit {

  public products: ProductModel[];
  public filteredProducts: ProductModel[];
  public selectedCategory: string;
  public searchedProduct: string;
  public unsubscribeStore: Unsubscribe;

  constructor(
    private productsService: ProductsService,
    private notificationService: NotificationService) { }

  public async ngOnInit() {
    try {
      this.products = await this.productsService.getAllProducts();
      this.filteredProducts = this.products;

      // check if is there any selected categories and searched products
      this.unsubscribeStore = store.subscribe(() => {
        this.selectedCategory = store.getState().categoriesState.selectedCategory;
        this.searchedProduct = store.getState().productsState.searchedProduct;

        // Handle category
        if (this.selectedCategory) {
          this.filteredProducts = this.products.filter(p => p.categoryId === +this.selectedCategory);
        }

        //Handle search
        if (this.searchedProduct) {
          this.filteredProducts = this.products.filter(p => p.productName.toLowerCase().includes(this.searchedProduct.toLowerCase()));
        }

      });

    }
    catch (err) {
      this.notificationService.error(err);
    }
  }

  public ngOnDestroy() {
    this.unsubscribeStore();
  }


}

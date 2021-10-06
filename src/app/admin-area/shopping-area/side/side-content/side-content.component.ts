import { Component, OnInit } from '@angular/core';
import store from 'src/app/redux/store/store';
import { Unsubscribe } from 'redux';
import { ProductModel } from 'src/app/models/product-models/product.model';
import { activateAdminProductSelection, deactivateAdminProductSelection } from 'src/app/redux/shopping-states/products-state';

@Component({
  selector: 'app-side-content',
  templateUrl: './side-content.component.html',
  styleUrls: ['./side-content.component.css']
})
export class SideContentComponent implements OnInit {

  public displayAddProduct: boolean = true;
  public displayEditProduct: boolean = false;

  public selectedProductDetails: ProductModel;
  public adminSelectedProduct: string;
  public unsubscribeStore: Unsubscribe;

  constructor() { }

  public async ngOnInit() {
    this.unsubscribeStore = store.subscribe(() => {
      this.adminSelectedProduct = store.getState().productsState.adminSelectedProduct;

      // if product selected - auto display edit mode and find product details
      if (this.adminSelectedProduct) {
        this.displayEditProduct = true;
        this.displayAddProduct = false;
        this.selectedProductDetails = store.getState().productsState.products.find(p => p.productId === +this.adminSelectedProduct);
      }
    });
  }

  // Handle display modes
  public applyAddProductDisplay() {
    this.displayAddProduct = true;
    this.displayEditProduct = false;
    store.dispatch(deactivateAdminProductSelection());
  }

  public applyEditProductDisplay() {
    this.displayEditProduct = true;
    this.displayAddProduct = false;

    // if button clicked as for a start targeting the first product to edit
    store.dispatch(activateAdminProductSelection(1));
  }

  public ngOnDestroy() {
    this.unsubscribeStore();
  }
  
}
import { Component, Input, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/models/product-models/product.model';
import { environment } from 'src/environments/environment';
import { Unsubscribe } from 'redux';
import store from 'src/app/redux/store/store';

@Component({
  selector: 'app-side-product-preview-card',
  templateUrl: './side-product-preview-card.component.html',
  styleUrls: ['./side-product-preview-card.component.css']
})
export class SideProductPreviewCardComponent implements OnInit {

  public imageUrl: string;
  public adminSelectedProduct: string;
  public unsubscribeStore: Unsubscribe;
  
  constructor() { }

  @Input()
  public selectedProductDetails: ProductModel;
  

  public ngOnInit(): void {
    this.imageUrl = environment.productsUrl + "images/" + this.selectedProductDetails.imageFileName;
    
    this.unsubscribeStore = store.subscribe(() => {
      this.adminSelectedProduct = store.getState().productsState.adminSelectedProduct;

      if (this.adminSelectedProduct) {
        this.selectedProductDetails = store.getState().productsState.products.find(p => p.productId === +this.adminSelectedProduct);
        this.imageUrl = environment.productsUrl + "images/" + this.selectedProductDetails.imageFileName;
      }
    });
  }

  public ngOnDestroy() {
    this.unsubscribeStore();
  }

}

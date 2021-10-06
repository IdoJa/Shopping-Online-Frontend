import { Component, Input, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/models/product-models/product.model';
import { activateAdminProductSelection } from 'src/app/redux/shopping-states/products-state';
import store from 'src/app/redux/store/store';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-admin-product-card',
  templateUrl: './admin-product-card.component.html',
  styleUrls: ['./admin-product-card.component.css']
})
export class AdminProductCardComponent implements OnInit {

  @Input()
  public product: ProductModel;

  public imageUrl: string;

  constructor() { }

  public ngOnInit(): void {
    this.imageUrl = environment.productsUrl + "images/" + this.product.imageFileName;
  }

  public getProductId(productId: number) {
    store.dispatch(activateAdminProductSelection(productId));
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { CartItemModel } from 'src/app/models/cart-models/cart-item.model';
import { ProductModel } from 'src/app/models/product-models/product.model';
import { environment } from 'src/environments/environment';
import { Unsubscribe } from 'redux';
import { ProductsService } from 'src/app/services/shopping-services/products.service';
import { NotificationService } from 'src/app/services/global-services/notification.service';
import { CartItemsService } from 'src/app/services/shopping-services/cart-items.service';
import store from 'src/app/redux/store/store';


@Component({
  selector: 'app-order-product-card',
  templateUrl: './order-product-card.component.html',
  styleUrls: ['./order-product-card.component.css']
})
export class OrderProductCardComponent implements OnInit {

  @Input()
  public cartItem: CartItemModel;

  public imageUrl: string;
  public products: ProductModel[];
  public searchedOrder: string;

  public product: ProductModel;
  public unsubscribeStore: Unsubscribe;

  public dynamicStyling = {
    background: "yellow"
  }

  constructor(
    private productsService: ProductsService,
    private cartItemService: CartItemsService,
    private notificationService: NotificationService) { }

  public async ngOnInit(): Promise<void> {
    try {
      this.product = await this.productsService.getOneProduct(this.cartItem.productId);
      this.imageUrl = environment.productsUrl + "images/" + this.product.imageFileName;

      this.unsubscribeStore = store.subscribe(() => {
        this.searchedOrder = store.getState().ordersState.searchedOrder;
      });
      
    }
    catch (err) {
      this.notificationService.error(err);
    }
  }

  public applyMarkings() {
    if (this.searchedOrder) {
      if (this.product.productName.toLowerCase().includes(this.searchedOrder.toLowerCase())) {
        return 'mark-yellow';
      } else {
        return 'mark-white';
      }
    }
    return 'mark-white';
  }

  public ngOnDestroy() {
    this.unsubscribeStore();
  }

}

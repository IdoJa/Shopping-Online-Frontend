import { Component, Input, OnInit } from '@angular/core';
import { CartItemModel } from 'src/app/models/cart-models/cart-item.model';
import { ProductModel } from 'src/app/models/product-models/product.model';
import { environment } from 'src/environments/environment';
import { Unsubscribe } from 'redux';
import { ProductsService } from 'src/app/services/shopping-services/products.service';
import { NotificationService } from 'src/app/services/global-services/notification.service';
import { CartItemsService } from 'src/app/services/shopping-services/cart-items.service';

@Component({
  selector: 'app-side-product-card',
  templateUrl: './side-product-card.component.html',
  styleUrls: ['./side-product-card.component.css']
})
export class SideProductCardComponent implements OnInit {

  @Input()
  public cartItem: CartItemModel;

  public imageUrl: string;
  public products: ProductModel[];

  public product: ProductModel;
  public unsubscribeStore: Unsubscribe;

  constructor(
    private productsService: ProductsService,
    private cartItemService: CartItemsService,
    private notificationService: NotificationService) { }

  public async ngOnInit(): Promise<void> {
    try {
      this.product = await this.productsService.getOneProduct(this.cartItem.productId);
      this.imageUrl = environment.productsUrl + "images/" + this.product.imageFileName;
      
    }
    catch (err) {
      this.notificationService.error(err);
    }
  }

  public async deleteCartItem() {
    try {
      await this.cartItemService.deleteCartItem(this.cartItem);
    }
    catch (err) {
      this.notificationService.error(err);
    }
  }

  public incrementItemQuantity() {
    this.cartItem.quantity++;
    this.cartItem.itemTotalPrice = +(this.product.productPrice * this.cartItem.quantity);
    this.cartItemService.updateCartItem(this.cartItem);
  }

  public decrementItemQuantity() {
    if (this.cartItem.quantity > 1) {
      this.cartItem.quantity--;
      this.cartItem.itemTotalPrice = +(this.product.productPrice * this.cartItem.quantity);
      this.cartItemService.updateCartItem(this.cartItem);
    }

    if (this.cartItem.quantity === 1) {
      this.cartItemService.deleteCartItem(this.cartItem);
    }
  }

}

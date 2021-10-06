import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CartItemModel } from 'src/app/models/cart-models/cart-item.model';
import { ProductModel } from 'src/app/models/product-models/product.model';
import store from 'src/app/redux/store/store';
import { NotificationService } from 'src/app/services/global-services/notification.service';
import { CartItemsService } from 'src/app/services/shopping-services/cart-items.service';

@Component({
  selector: 'app-product-card-dialog',
  templateUrl: './product-card-dialog.component.html',
  styleUrls: ['./product-card-dialog.component.css']
})
export class ProductCardDialogComponent implements OnInit {

  public product: ProductModel;
  public imageUrl: string;


  public newCartItem: CartItemModel = new CartItemModel();
  public selectedItemExist: boolean = false;
  public selectedItem: CartItemModel;

  constructor(
    private dialog: MatDialog,
    private cartItemService: CartItemsService,

    private notificationService: NotificationService) { }

  public ngOnInit(): void {

    this.newCartItem.productId = this.product.productId;
    this.newCartItem.quantity = 0;
    this.newCartItem.itemTotalPrice = 0;
    this.newCartItem.cartId = store.getState().userCartState.userCart.cartId;
    this.checkSelectedItemExistence();
  }

  // check if item already exists in cart
  public checkSelectedItemExistence() {
    this.selectedItem = store.getState().cartItemsState.cartItems.find(i => i.productId === this.product.productId ? i : null);

    // if exists load cartItem details to the dialog
    if (this.selectedItem) {
      this.selectedItemExist = true;
      this.newCartItem.quantity = this.selectedItem.quantity;
      this.newCartItem.itemTotalPrice = this.selectedItem.itemTotalPrice;
      this.newCartItem.cartItemId = this.selectedItem.cartItemId;
    }
  }

  public async addNewCartItem() {
    if (this.newCartItem.quantity !== 0) {
      try {
        await this.cartItemService.addCartItem(this.newCartItem);
        this.dialog.closeAll();
      }
      catch (err) {
        this.notificationService.error(err);
      }
    }
    else {
      this.dialog.closeAll();
    }
  }

  public async updateCartItem() {
    if (this.newCartItem.quantity >= 1 && this.newCartItem.quantity !== this.selectedItem.quantity) {
      try {
        await this.cartItemService.updateCartItem(this.newCartItem);
        this.dialog.closeAll();
      }
      catch (err) {
        this.notificationService.error(err);
      }
    } else if (this.newCartItem.quantity === 0) {
      try {
        await this.cartItemService.deleteCartItem(this.selectedItem);
        this.dialog.closeAll();
      }
      catch (err) {
        this.notificationService.error(err);
      }
      
    } else {
      this.dialog.closeAll();
    }
  }
  public incrementItemQuantity() {
    this.newCartItem.quantity++;
    this.newCartItem.itemTotalPrice = +(this.product.productPrice * this.newCartItem.quantity);
    
  }

  public decrementItemQuantity() {
    if (this.newCartItem.quantity > 0) {
      this.newCartItem.quantity--;
      this.newCartItem.itemTotalPrice = +(this.product.productPrice * this.newCartItem.quantity);
    }
  }

  public closeDialog() {
    this.dialog.closeAll();
  }

}

import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/auth-models/user.model';
import { CartItemModel } from 'src/app/models/cart-models/cart-item.model';
import { UserCartModel } from 'src/app/models/cart-models/user-cart.model';
import { NotificationService } from 'src/app/services/global-services/notification.service';
import { environment } from 'src/environments/environment';
import store from 'src/app/redux/store/store';
import { Unsubscribe } from 'redux';

@Component({
  selector: 'app-right-panel-c',
  templateUrl: './right-panel-c.component.html',
  styleUrls: ['./right-panel-c.component.css']
})
export class RightPanelCComponent implements OnInit {

  public user: UserModel;
  public userCart: UserCartModel;
  public cartItems: CartItemModel[];

  constructor() { }

  public unsubscribeStore: Unsubscribe;

  public ngOnInit(): void {
    this.user = store.getState().authState.user;;
    this.userCart = store.getState().userCartState.userCart;
    this.cartItems = store.getState().cartItemsState.cartItems;

    this.unsubscribeStore = store.subscribe(() => {
      this.user = store.getState().authState.user;
      this.userCart = store.getState().userCartState.userCart;
      this.cartItems = store.getState().cartItemsState.cartItems;
    });
  }

  public ngOnDestroy() {
    this.unsubscribeStore();
  }


}

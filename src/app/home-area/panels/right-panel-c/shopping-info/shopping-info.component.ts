import { HttpClient } from '@angular/common/http';
import { NotificationService } from 'src/app/services/global-services/notification.service';
import { environment } from 'src/environments/environment';
import { Component, Input, OnInit } from '@angular/core';
import { CartItemModel } from 'src/app/models/cart-models/cart-item.model';
import { UserModel } from 'src/app/models/auth-models/user.model';
import { UserCartModel } from 'src/app/models/cart-models/user-cart.model';
import { CartItemsService } from 'src/app/services/shopping-services/cart-items.service';
import store from 'src/app/redux/store/store';
import { Unsubscribe } from 'redux';
import { OrdersService } from 'src/app/services/shopping-services/orders.service';
import { OrderModel } from 'src/app/models/cart-models/order.model';

@Component({
  selector: 'app-shopping-info',
  templateUrl: './shopping-info.component.html',
  styleUrls: ['./shopping-info.component.css']
})
export class ShoppingInfoComponent implements OnInit {

  @Input()
  public user: UserModel;

  @Input()
  public userCart: UserCartModel;


  public productsCounter = 0;
  public ordersCounter = 0;

  public currentTotalPrice = 0;
  public currentTotalQuantity = 0;

  public lastOrder: OrderModel;

  public cartItems: CartItemModel[];
  public unsubscribeStore: Unsubscribe;

  constructor(
    private cartItemsService: CartItemsService,
    private ordersService: OrdersService,
    private httpClient: HttpClient,
    private notificationService: NotificationService) { }

  public async ngOnInit() {
    try {
      // Get products & orders counter
      this.productsCounter = await this.httpClient.get<number>(environment.productsUrl + "count").toPromise();
      this.ordersCounter = await this.httpClient.get<number>(environment.ordersUrl + "count").toPromise();


      if (store.getState().authState.user && this.userCart?.isFinished === 1) {
        this.lastOrder = await this.ordersService.getLastUserOrderByUuid(this.user.uuid);
      }

      // Get cart items -- if cart is still open
      if (store.getState().authState.user && this.userCart?.isFinished === 0) {
        this.currentTotalPrice = this.cartItemsService.getCurrentTotalPrice();
        this.currentTotalQuantity = this.cartItemsService.getCurrentTotalQuantity();
      }

      this.unsubscribeStore = store.subscribe(async () => {
        this.userCart = store.getState().userCartState.userCart; // this.userCart - instead store
        this.currentTotalPrice = this.cartItemsService.getCurrentTotalPrice();
        this.currentTotalQuantity = this.cartItemsService.getCurrentTotalQuantity();

        if (store.getState().authState.user && this.userCart?.isFinished === 1) {
          this.lastOrder = await this.ordersService.getLastUserOrderByUuid(this.user.uuid);
        }

        if (store.getState().authState.user && this.userCart?.isFinished === 0) {
          this.currentTotalPrice = this.cartItemsService.getCurrentTotalPrice();
          this.currentTotalQuantity = this.cartItemsService.getCurrentTotalQuantity();
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

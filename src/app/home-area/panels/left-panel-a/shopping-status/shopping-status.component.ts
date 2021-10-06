import { Component, Input, OnInit } from '@angular/core';
import { Unsubscribe } from 'redux';
import { UserModel } from 'src/app/models/auth-models/user.model';
import { UserCartModel } from 'src/app/models/cart-models/user-cart.model';
import store from 'src/app/redux/store/store';
import { NotificationService } from 'src/app/services/global-services/notification.service';
import { UserCartService } from 'src/app/services/shopping-services/user-cart.service';

@Component({
  selector: 'app-shopping-status',
  templateUrl: './shopping-status.component.html',
  styleUrls: ['./shopping-status.component.css']
})
export class ShoppingStatusComponent implements OnInit {

  @Input()
  public user: UserModel;

  public userCart: UserCartModel;

  constructor(
    private userCartService: UserCartService,
    private notificationService: NotificationService) { }

  public async ngOnInit() {
    try {
      if (this.user && this.user.isAdmin === 0) {
        this.userCart = await this.userCartService.getUserCart();
      }
    }
    catch (err) {
      this.notificationService.error(err);
    }
  }

  public async addUserCart() {
    if (this.user && store.getState().userCartState.userCart === null || store.getState().userCartState.userCart.isFinished === 1) {
      try {
        this.userCart = await this.userCartService.addUserCart();
      }
      catch (err) {
        this.notificationService.error(err);
      }
    }
  }
}

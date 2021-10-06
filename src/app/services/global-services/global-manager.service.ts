import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { userLoggedOutAction } from 'src/app/redux/global-states/auth-state';
import { cartItemsClearAction } from 'src/app/redux/shopping-states/cart-items-state';
import { userCartClearAction } from 'src/app/redux/shopping-states/user-cart-state';
import store from 'src/app/redux/store/store';
import { NotificationService } from 'src/app/services/global-services/notification.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalManagerService {

  constructor(
    private router: Router) { }

  public handleError(err: any) {
    // Forbidden and token
    if (err.status === 403) {
      this.logout();
    }
  }

  public logout() {
    store.dispatch(userLoggedOutAction());
    store.dispatch(cartItemsClearAction());
    store.dispatch(userCartClearAction());
    this.router.navigateByUrl("/home");
  }


}

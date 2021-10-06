import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { NotificationService } from 'src/app/services/global-services/notification.service';
import store from 'src/app/redux/store/store';


@Injectable({
  providedIn: 'root'
})
export class OrderGuard implements CanActivate {
  public constructor(
    private notificationService: NotificationService,
    private router: Router) { }

  public canActivate(): boolean {
    const cartItems = store.getState().cartItemsState.cartItems;
    const userCart = store.getState().userCartState.userCart;
    
    if (!userCart || !cartItems || !cartItems.length) {
      this.notificationService.error("Cannot access this page!");
      this.router.navigateByUrl("/home");
      return false;
    }
    return true; 
  }
  
}

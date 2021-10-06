import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import store from 'src/app/redux/store/store';
import { NotificationService } from 'src/app/services/global-services/notification.service';


@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  public constructor(
    private notificationService: NotificationService,
    private router: Router) { }

  public canActivate(): boolean {
    const user = store.getState().authState.user;

    if (user && user.isAdmin === 1) {
      return true; // You can enter the target route
    } 
     else {
      this.notificationService.error("Cannot access this page");
    }

    this.router.navigateByUrl("/home");

    return false; // You can't enter the target router.

  }
  
}

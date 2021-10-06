import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import store from 'src/app/redux/store/store';
import { NotificationService } from 'src/app/services/global-services/notification.service';


@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
 
  public constructor(
    private notificationService: NotificationService,
    private router: Router) { }

  public canActivate(): boolean {
    const user = store.getState().authState.user;

    if (user && user.isAdmin === 0) {
      return true; // You can enter the target route
    }
    
    if (!user) {
      this.notificationService.error("You are not logged in!");
    }

    this.router.navigateByUrl("/home");

    return false; // You can't enter th target router.

  }
  
}

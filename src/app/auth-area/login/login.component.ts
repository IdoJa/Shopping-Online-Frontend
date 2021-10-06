import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CredentialsModel } from 'src/app/models/auth-models/credentials.model';
import { AuthService } from 'src/app/services/global-services/auth.service';
import { NotificationService } from 'src/app/services/global-services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {



  public credentials = new CredentialsModel();

  constructor(
    private authService: AuthService,
    private notificationService: NotificationService,
    private router: Router) { }
  
  public async login(loginFormInfo: NgForm) {
    // validation check
    if (!loginFormInfo.valid) {
      this.notificationService.error("Please make sure all fields are filled and correct");
      return;
    }

    if (this.credentials.password.trim().length === 0) {
      this.notificationService.error("Password cannot contain only spaces");
      return;
    }


    try {
      const loggedInUser = await this.authService.login(this.credentials);
      this.notificationService.success("Hello " + loggedInUser.firstName + "<br> You are now logged in!");
    }
    catch (err) {
      this.notificationService.error(err);
    }
  }

  public goToRegister() {
    this.router.navigateByUrl("/register");
  }

}

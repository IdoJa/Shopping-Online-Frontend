import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/auth-models/user.model';
import { CityModel } from 'src/app/models/info-models/city.model';
import { AuthService } from 'src/app/services/global-services/auth.service';
import { NotificationService } from 'src/app/services/global-services/notification.service';
import { CitiesService } from 'src/app/services/info-services/cities.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public cities: CityModel[];
  public newUser: UserModel = new UserModel();

  formGroup1: FormGroup;
  formGroup2: FormGroup;
  isEditable = false;

  constructor(
    private _formBuilder: FormBuilder,
    private authService: AuthService,
    private citiesService: CitiesService,
    private router: Router,
    private notificationService: NotificationService) { }

  public async ngOnInit() {
    this.formGroup1 = this._formBuilder.group({
      userId: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
      email: ['', [Validators.required, Validators.pattern(/^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,3})(\.[a-z]{2,3})?$/)]],
      pass: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/^[A-za-z\S\d]+$/)]],
      confirmPass: ['', Validators.required]
    }, {
      asyncValidator: [async () => await this.mustMatchAsync() ,async () => await this.checkUserIdAsync(), async () => await this.checkUserNameAsync()]
    });
    this.formGroup2 = this._formBuilder.group({
      city: ['', Validators.required],
      street: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^(([A-Za-z]){2,10}((\ )|(-))?([A-Za-z]){2,10}) ([1-9])(\d){0,3}$/)]],
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^([A-Za-z]+)$/)]],
      lastName: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^([A-Za-z]+)$/)]]
    });

    // Get cities - for formGroup2 city selection
    try {
      this.cities = await this.citiesService.getAllCities();
    }
    catch (err) {
      this.notificationService.error(err);
    }
  }

  public async mustMatchAsync(): Promise<void> {
    try {
      const control = this.formGroup1.get("confirmPass");
      if (this.formGroup1.get('pass').value !== control.value) {
        control.setErrors({ mustMatch: true });
      } else {
        control.setErrors(null);
      }
    }
    catch (err) {
      this.notificationService.error(err);
    }
  }

  public async checkUserIdAsync(): Promise<void>{
    try {
      const control = this.formGroup1.get("userId");
      const userId = this.formGroup1.get("userId").value
      const isUserIdExist = await this.authService.checkUserId(userId);
      if (isUserIdExist) {
        control.setErrors({ userIdExist: true });
      }
      else {
        control.setErrors(null);
      }
    }
    catch (err) {
      this.notificationService.error(err);
    }

  }

  public async checkUserNameAsync(): Promise<void> {
    try {
      const control = this.formGroup1.get("email");
      const username = this.formGroup1.get("email").value;
      const isUsernameExist = await this.authService.checkUsername(username);
      if (isUsernameExist) {
        control.setErrors({ usernameExist: true });
      }
      else {
        control.setErrors(null);
      }
    }
    catch (err) {
      this.notificationService.error(err);
    }
  }

  public async register() {

    if (!this.formGroup2.valid) {
      this.notificationService.error("Please make sure all fields are filled and correct");
      return;
    }

    // Set values to send
    this.newUser.userId = this.formGroup1.get('userId').value;
    this.newUser.username = this.formGroup1.get('email').value;
    this.newUser.password = this.formGroup1.get('pass').value;
    this.newUser.cityId = this.formGroup2.get('city').value;
    this.newUser.street = this.formGroup2.get('street').value;
    this.newUser.firstName = this.formGroup2.get('firstName').value;
    this.newUser.lastName = this.formGroup2.get('lastName').value;
    try {
      await this.authService.register(this.newUser);
      this.notificationService.success("You are now Registered!");
      this.router.navigateByUrl("/home");
    }
    catch (err) {
      this.notificationService.error(err);
    }

  }

}

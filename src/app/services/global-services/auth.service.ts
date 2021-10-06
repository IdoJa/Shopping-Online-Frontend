import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CredentialsModel } from './../../models/auth-models/credentials.model';
import { UserModel } from './../../models/auth-models/user.model';
import store from 'src/app/redux/store/store';
import { userLoggedInAction, userLoggedOutAction, userRegisteredAction } from 'src/app/redux/global-states/auth-state';
import { cartItemsClearAction } from 'src/app/redux/shopping-states/cart-items-state';
import { userCartClearAction } from 'src/app/redux/shopping-states/user-cart-state';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  public async register(user: UserModel): Promise<UserModel> {
    // if there is already user logged in clear and then register.
    if (store.getState().authState.user) {
      store.dispatch(userLoggedOutAction());
      store.dispatch(cartItemsClearAction());
      store.dispatch(userCartClearAction());
    }

    const registeredUser = await this.httpClient.post<UserModel>(environment.registerUrl, user).toPromise();
    store.dispatch(userRegisteredAction(registeredUser));
    return registeredUser;
  }

  public async checkUserId(userId: string): Promise<boolean> {
    const isUserIdExist = await this.httpClient.get<UserModel>(environment.userCheckUrl + "userId/" + userId).toPromise();
    return isUserIdExist !== null ? true : false;
  }

  public async checkUsername(username: string): Promise<boolean> {
    const isUsernameExist = await this.httpClient.get<UserModel>(environment.userCheckUrl + "username/" + username).toPromise();
    return isUsernameExist !== null ? true : false;
  }

  public async login(credentials: CredentialsModel): Promise<UserModel> {
    const loggedInUser = await this.httpClient.post<UserModel>(environment.loginUrl, credentials).toPromise();
    store.dispatch(userLoggedInAction(loggedInUser));
    return loggedInUser;
  }

  public logout(): void {
    store.dispatch(userLoggedOutAction());
  }

}

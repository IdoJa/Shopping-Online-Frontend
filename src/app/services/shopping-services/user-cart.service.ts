import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserCartModel } from 'src/app/models/cart-models/user-cart.model';
import { cartItemsClearAction } from 'src/app/redux/shopping-states/cart-items-state';
import { userCartAddedAction, userCartDownloadedAction, userCartUpdatedAction } from 'src/app/redux/shopping-states/user-cart-state';
import store from 'src/app/redux/store/store';
import { environment } from 'src/environments/environment';
import { CartItemsService } from './cart-items.service';

@Injectable({
  providedIn: 'root'
})
export class UserCartService {

  constructor(private httpClient: HttpClient, private cartItemsService: CartItemsService) { }

  public async getUserCart(): Promise<UserCartModel> {
    if (store.getState().userCartState.userCart === null) {
      const userUuid = store.getState().authState.user.uuid;
      const userCart = await this.httpClient.get<UserCartModel>(environment.userCartUrl + userUuid).toPromise();
      store.dispatch(userCartDownloadedAction(userCart));

      // if there is cart get also cart items
      if (userCart) {
        const cartId = store.getState().userCartState.userCart.cartId;
        this.cartItemsService.getAllCartItemsByCartId(cartId);
      }
    }
    return store.getState().userCartState.userCart;
  }

  public async addUserCart(): Promise<UserCartModel> {
    const userUuid = store.getState().authState.user.uuid;
    const userUuidObj = { "uuid": userUuid };
    const addedUserCart = await this.httpClient.post<UserCartModel>(environment.userCartUrl, userUuidObj).toPromise();
    store.dispatch(cartItemsClearAction());
    store.dispatch(userCartAddedAction(addedUserCart));
    return store.getState().userCartState.userCart;
  }

  public async updateUserCartIsFinished(userCartId: number) {
    const userCartIdObj = { "cartId": userCartId };
    const updatedUserCart = await this.httpClient.put<UserCartModel>(environment.userCartUrl + "finish/", userCartIdObj).toPromise();
    store.dispatch(userCartUpdatedAction(updatedUserCart));
  }
}

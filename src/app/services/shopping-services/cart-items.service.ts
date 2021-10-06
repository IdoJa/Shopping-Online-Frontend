import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CartItemModel } from 'src/app/models/cart-models/cart-item.model';
import { cartItemAddedAction, cartItemDeletedAction, cartItemsClearAction, cartItemsDownloadedAction, cartItemUpdatedAction } from 'src/app/redux/shopping-states/cart-items-state';
import store from 'src/app/redux/store/store';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CartItemsService {

  constructor(private httpClient: HttpClient) { }

  // Get current total price
  public getCurrentTotalPrice(): number {
    let currentTotalPrice = 0;
    store.getState().cartItemsState.cartItems.map(i => currentTotalPrice += i.itemTotalPrice);
    return currentTotalPrice;
  }

  // Get quantity
  public getCurrentTotalQuantity(): number {
    let currentTotalQuantity = 0;
    store.getState().cartItemsState.cartItems.map(i => currentTotalQuantity += i.quantity);
    return currentTotalQuantity;
  }

  // Get all cart items by cart id
  public async getAllCartItemsByCartId(cartId : number): Promise<CartItemModel[]> {
    if (store.getState().userCartState.userCart !== null) {
      const cartItems = await this.httpClient.get<CartItemModel[]>(environment.cartItemsUrl + cartId).toPromise();
      store.dispatch(cartItemsDownloadedAction(cartItems));
    }
    return store.getState().cartItemsState.cartItems;
  }

  // Add
  public async addCartItem(cartItem: CartItemModel): Promise<CartItemModel> {
    const addedCartItem = await this.httpClient.post<CartItemModel>(environment.cartItemsUrl, cartItem).toPromise();
    store.dispatch(cartItemAddedAction(addedCartItem));
    return addedCartItem;
  }

  // Update
  public async updateCartItem(cartItem: CartItemModel): Promise<CartItemModel> {
    const updatedCartItem = await this.httpClient.put<CartItemModel>(environment.cartItemsUrl, cartItem).toPromise();
    store.dispatch(cartItemUpdatedAction(updatedCartItem));
    return updatedCartItem;
  }
  
  // Delete one cart item
  public async deleteCartItem(cartItem: CartItemModel): Promise<void> {
    await this.httpClient.delete<CartItemModel>(environment.cartItemsUrl + cartItem.cartItemId).toPromise();
    store.dispatch(cartItemDeletedAction(cartItem.cartItemId));
  }

  // Delete all cart items by cart Id
  public async deleteAllCartItems(cartId: number): Promise<void> {
    await this.httpClient.delete<CartItemModel>(environment.cartItemsUrl + "deleteAll/" + cartId).toPromise();
    store.dispatch(cartItemsClearAction());
  }
}

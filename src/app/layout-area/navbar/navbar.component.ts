import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/auth-models/user.model';
import { userLoggedOutAction } from 'src/app/redux/global-states/auth-state';
import { cartItemsClearAction } from 'src/app/redux/shopping-states/cart-items-state';
import { userCartClearAction } from 'src/app/redux/shopping-states/user-cart-state';
import { Unsubscribe } from 'redux';
import store from 'src/app/redux/store/store';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public user: UserModel;
  public unsubscribeStore: Unsubscribe;

  
  constructor() { }

  ngOnInit(): void {
    this.user = store.getState().authState.user;

    this.unsubscribeStore = store.subscribe(() => {
      this.user = store.getState().authState.user;
    });

  }

  public applyLogout() {
    store.dispatch(userLoggedOutAction());
    store.dispatch(cartItemsClearAction());
    store.dispatch(userCartClearAction());
  }

  public ngOnDestroy() {
    this.unsubscribeStore();
  }

}

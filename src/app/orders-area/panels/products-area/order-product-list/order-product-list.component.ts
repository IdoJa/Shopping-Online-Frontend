import { Component, OnInit } from '@angular/core';
import { Unsubscribe } from 'redux';
import { CartItemModel } from 'src/app/models/cart-models/cart-item.model';
import store from 'src/app/redux/store/store';
import { CartItemsService } from 'src/app/services/shopping-services/cart-items.service';


@Component({
  selector: 'app-order-product-list',
  templateUrl: './order-product-list.component.html',
  styleUrls: ['./order-product-list.component.css']
})
export class OrderProductListComponent implements OnInit {

  public cartItems: CartItemModel[] = store.getState().cartItemsState.cartItems;
  public unsubscribeStore: Unsubscribe;


  constructor(private cartItemService: CartItemsService) { }

  public ngOnInit(): void {
    this.cartItems = store.getState().cartItemsState.cartItems;
   
  }

}

import { Component, OnInit } from '@angular/core';
import { Unsubscribe } from 'redux';
import { CartItemModel } from 'src/app/models/cart-models/cart-item.model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import store from 'src/app/redux/store/store';
import { CartItemsService } from 'src/app/services/shopping-services/cart-items.service';
import { NotificationService } from 'src/app/services/global-services/notification.service';
import { DeleteAllItemsDialogComponent } from '../../dialogs/delete-all-items-dialog/delete-all-items-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-product-list',
  templateUrl: './side-product-list.component.html',
  styleUrls: ['./side-product-list.component.css']
})
export class SideProductListComponent implements OnInit {

  public cartTotalPrice: number = 0;
  public cartTotalQuantity: number = 0;

  public cartItems: CartItemModel[] = store.getState().cartItemsState.cartItems;
  public unsubscribeStore: Unsubscribe;

  constructor(
    private dialog: MatDialog,
    private cartItemService: CartItemsService,
    private router: Router,
    private notificationService: NotificationService) { }

  public ngOnInit(): void {
    // For calculating bottom order-container details
    // sum cartItems totalPrice
    this.cartTotalPrice = this.cartItemService.getCurrentTotalPrice();

    // count cartItems
    this.cartTotalQuantity = this.cartItemService.getCurrentTotalQuantity();

    
    this.unsubscribeStore = store.subscribe(() => {
      this.cartItems = store.getState().cartItemsState.cartItems;
      
        // sum cartItems totalPrice
        this.cartTotalPrice = this.cartItemService.getCurrentTotalPrice();

        // count cartItems
        this.cartTotalQuantity = this.cartItemService.getCurrentTotalQuantity();

      
    });
  }

  public checkItemsExistence() {
    if (this.cartItems.length === 0) {
      this.notificationService.error("Please choose a product first to proceed for order");
      return;
    } else {
      this.router.navigateByUrl("/order");
    }
  }

  public openDeleteAllDialog() {
    let config = new MatDialogConfig();
    config.height = '180px';
    config.width = '600px';
    this.dialog.open(DeleteAllItemsDialogComponent, config);
  }

  public ngOnDestroy() {
    this.unsubscribeStore();
  }

}

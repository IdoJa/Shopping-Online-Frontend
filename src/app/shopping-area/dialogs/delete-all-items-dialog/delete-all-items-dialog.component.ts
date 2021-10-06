import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import store from 'src/app/redux/store/store';
import { NotificationService } from 'src/app/services/global-services/notification.service';
import { CartItemsService } from 'src/app/services/shopping-services/cart-items.service';

@Component({
  selector: 'app-delete-all-items-dialog',
  templateUrl: './delete-all-items-dialog.component.html',
  styleUrls: ['./delete-all-items-dialog.component.css']
})
export class DeleteAllItemsDialogComponent implements OnInit {

  public isCartEmpty = false;
  public cartId: number;

  constructor(
    private dialog: MatDialog,
    private cartItemService: CartItemsService,
    private notificationService: NotificationService) { }

  public ngOnInit(): void {
    this.checkCartItems();
  }

  public checkCartItems() {
    this.isCartEmpty = store.getState().cartItemsState.cartItems.length === 0 ? true : false;

    // if cart contain item/s, get cartId from the first cartItem.
    if (!this.isCartEmpty) {
      this.cartId = store.getState().cartItemsState.cartItems[0].cartId;
    }
    
  }

  public async deleteAllItems() {
    // after user clicked yes
    try {
      await this.cartItemService.deleteAllCartItems(this.cartId);
    }
    catch (err) {
      this.notificationService.error(err);
    }
    this.dialog.closeAll();
  }

  public closeDialog() {
    // after user clicked no
    this.dialog.closeAll();
  }

}

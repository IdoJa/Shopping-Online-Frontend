import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InvoiceDirective } from 'src/app/directives/invoice-directive/invoice.directive';
import { UserModel } from 'src/app/models/auth-models/user.model';
import { CartItemModel } from 'src/app/models/cart-models/cart-item.model';
import { OrderModel } from 'src/app/models/cart-models/order.model';
import { ProductModel } from 'src/app/models/product-models/product.model';
import { NotificationService } from 'src/app/services/global-services/notification.service';
import store from 'src/app/redux/store/store';
import { InvoiceModel } from 'src/app/models/info-models/invoice.model';
import { InvoiceService } from 'src/app/services/info-services/invoice.service';
import { Router } from '@angular/router';




@Component({
  selector: 'app-invoice-preview-dialog',
  templateUrl: './invoice-preview-dialog.component.html',
  styleUrls: ['./invoice-preview-dialog.component.css']
})
export class InvoicePreviewDialogComponent implements OnInit {

  public todayDate = new Date();
  public userOrder: OrderModel;
  public cartItems: CartItemModel[] = store.getState().cartItemsState.cartItems; 
  public userDetails: UserModel = store.getState().authState.user;
  public products: ProductModel[] = store.getState().productsState.products;
  public userCartId = store.getState().userCartState.userCart.cartId;

  public orderPayout: number;
  public userCombinedDetails: any = [];
  public invoiceItemDetails: InvoiceModel[];

  // Get directive reference
  @ViewChild(InvoiceDirective) appInvoice: any;

  constructor(
    private dialog: MatDialog,
    private invoiceService: InvoiceService,
    private router: Router,
    private notificationService: NotificationService) { }

  public async ngOnInit() {
    try {
      this.invoiceItemDetails = await this.invoiceService.getInvoiceDetailsByCartId(this.userCartId);
    }
    catch (err) {
      this.notificationService.error(err);
    }
  }

  public closeDialog() {
    this.dialog.closeAll();
    this.router.navigateByUrl("/home");
  }

  public downloadInvoice() {
    this.appInvoice.createInvoice();
  }

}

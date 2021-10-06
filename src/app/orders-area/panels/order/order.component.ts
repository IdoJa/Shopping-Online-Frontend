import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { OrderModel } from 'src/app/models/cart-models/order.model';
import { CityModel } from 'src/app/models/info-models/city.model';
import { NotificationService } from 'src/app/services/global-services/notification.service';
import { CitiesService } from 'src/app/services/info-services/cities.service';
import store from 'src/app/redux/store/store';
import { CartItemsService } from 'src/app/services/shopping-services/cart-items.service';
import { OrdersService } from 'src/app/services/shopping-services/orders.service';
import { DateFilterFn } from '@angular/material/datepicker';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { InvoicePreviewDialogComponent } from '../../dialogs/invoice-preview-dialog/invoice-preview-dialog.component';
import { OrderUserInfo } from 'src/app/models/info-models/order-user-info.model';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  // Settings for date picker
  public todayDate = new Date();
  public toDate = new Date( this.todayDate.getFullYear(),
                            this.todayDate.getMonth() + 2,
                            this.todayDate.getDay());

  public filterOrderShippingDates: DateFilterFn<Date>;

  public cities: CityModel[];
  public selectedCity: CityModel = new CityModel;
  public allOrders: OrderModel[];
  public userOrder: OrderModel = new OrderModel();
  public orderShippingDates: string[];
  public orderPayout: number;
  public orderUserInfo: OrderUserInfo;

  // Get form reference
  @ViewChild('orderFormInfo') orderFormInfo: NgForm;

  constructor(
    private citiesService: CitiesService,
    private ordersService: OrdersService,
    private cartItemService: CartItemsService,
    private dialog: MatDialog,
    private notificationService: NotificationService) { }

  public async ngOnInit() {
    try {
      this.cities = await this.citiesService.getAllCities();
      this.orderUserInfo = await this.ordersService.getOrderUserInfo();
      this.orderShippingDates = await this.getOrderShippingDates();
      this.orderPayout = this.cartItemService.getCurrentTotalPrice();
      
      // Filter - prevent 3 times shippingDate to be picked
      this.filterOrderShippingDates = (d: Date | null): boolean => {
        let counter = 0;
        const day = (d || new Date()).toLocaleDateString();
        this.orderShippingDates.forEach(d => d === day ? counter++ : counter);
        return counter < 3;
      }
    }
    catch (err) {
      this.notificationService.error(err);
    }
  }

  public async getOrderShippingDates(): Promise<string[]> {
    try {
      const orderShippingDatesArray: string[] = [];
      this.allOrders = await this.ordersService.getAllOrders();
      this.allOrders.map(o => orderShippingDatesArray.push(new Date(o.shippingDate).toLocaleDateString()));
      return orderShippingDatesArray;
    }
    catch (err) {
      this.notificationService.error(err);
    }
    return [];
  }


  public async order(): Promise<void> {
    // validation check before sending
    if (!this.orderFormInfo.valid) {
      this.notificationService.error("Please make sure all fields are filled and correct");
      return;
    }
    // set known order details to send
    this.userOrder.uuid = store.getState().authState.user.uuid;
    this.userOrder.cartId = store.getState().userCartState.userCart.cartId;
    this.userOrder.orderPayout = this.orderPayout;
    this.userOrder.lastCreditDigits = this.userOrder.lastCreditDigits.slice(-4); 

    try {
      await this.ordersService.addOrder(this.userOrder);
      this.notificationService.success("New Order Made !<br> Thank you for purchasing!");
      this.openInvoicePreviewDialog();
    }
    catch (err) {
      this.notificationService.error(err);
    }
  }

  public openInvoicePreviewDialog() {
    let config = new MatDialogConfig();
    config.height = '600px';
    config.width = '600px';
    config.disableClose = true;
    let dialogRef = this.dialog.open(InvoicePreviewDialogComponent, config);
    dialogRef.componentInstance.userOrder = this.userOrder;
    dialogRef.componentInstance.orderPayout = this.orderPayout;
  }

  public setDefaults(orderFormInfo: NgForm) {
    orderFormInfo.controls['shippingCity'].setValue(this.orderUserInfo.cityName);
    orderFormInfo.controls['shippingStreet'].setValue(this.orderUserInfo.street);
  }
}

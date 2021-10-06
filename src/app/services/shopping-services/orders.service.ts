import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderModel } from 'src/app/models/cart-models/order.model';
import { OrderUserInfo } from 'src/app/models/info-models/order-user-info.model';
import { NotificationService } from 'src/app/services/global-services/notification.service';
import { environment } from 'src/environments/environment';
import { UserCartService } from 'src/app/services/shopping-services/user-cart.service';
import store from 'src/app/redux/store/store';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(
    private httpClient: HttpClient,
    private userCartService: UserCartService,
    private notificationService: NotificationService) { }

  // Get last user order
  public async getLastUserOrderByUuid(uuid: string): Promise<OrderModel> {
    return await this.httpClient.get<OrderModel>(environment.ordersUrl + "lastorder/" + uuid).toPromise();
  }

  // Get All Orders
  public async getAllOrders(): Promise<OrderModel[]> {
    return await this.httpClient.get<OrderModel[]>(environment.ordersUrl).toPromise();
  }

  // Get All Dates
  public async getAllOrderDates(): Promise<OrderModel[]> {
    return await this.httpClient.get<OrderModel[]>(environment.ordersUrl + "orderdates/").toPromise();
  }

  // Get Order User Info
  public async getOrderUserInfo(): Promise<OrderUserInfo> {
    const userUuid = store.getState().authState.user.uuid;
    const orderUserInfo = await this.httpClient.get<OrderUserInfo>(environment.ordersUrl + "order/" + "userinfo/" + userUuid).toPromise();
    return orderUserInfo;
  }

  // Add Order
  public async addOrder(userOrder: OrderModel): Promise<OrderModel> {
    const addedOrder = await this.httpClient.post<OrderModel>(environment.ordersUrl, userOrder).toPromise();
    try {
      await this.userCartService.updateUserCartIsFinished(userOrder.cartId);
    } 
    catch (err) {
      this.notificationService.error(err);
    }

    return addedOrder;
  }
}

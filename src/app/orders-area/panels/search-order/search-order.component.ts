import { Component, OnInit } from '@angular/core';
import { activateOrderSearchAction, deactivateOrderSearchAction } from 'src/app/redux/shopping-states/order-state';
import store from 'src/app/redux/store/store';

@Component({
  selector: 'app-search-order',
  templateUrl: './search-order.component.html',
  styleUrls: ['./search-order.component.css']
})
export class SearchOrderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public searchedOrder(event: KeyboardEvent): void {
    let searchedOrder = ((event.target as HTMLInputElement).value);
    if (searchedOrder) {
      store.dispatch(activateOrderSearchAction(searchedOrder));
    }

    if (!searchedOrder) {
      store.dispatch(deactivateOrderSearchAction());
    }
  }

}

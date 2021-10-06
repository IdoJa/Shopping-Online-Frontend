// Order state for search
export class OrdersState {
    public searchedOrder = '';

    public constructor() { }
}

// Order action types
export enum OrdersActionType {
    ActivateOrderSearch = "ActivateOrderSearch",
    DeactivateOrderSearch = "DeactivateOrderSearch"
}

// Orders Action
export interface OrdersAction {
    type: OrdersActionType;
    payload?: any;
}

export function activateOrderSearchAction(searchedOrder: string): OrdersAction {
    return { type: OrdersActionType.ActivateOrderSearch, payload: searchedOrder };
}

export function deactivateOrderSearchAction(): OrdersAction {
    return { type: OrdersActionType.DeactivateOrderSearch };
}

// Orders Reducer
export function ordersReducer(
    currentState: OrdersState = new OrdersState(),
    action: OrdersAction): OrdersState {

    const newState = { ...currentState };
    
    switch (action.type) {
        case OrdersActionType.ActivateOrderSearch:
            newState.searchedOrder = action.payload;
            sessionStorage.setItem("searchedOrder", JSON.stringify(newState));
            break;
        
        case OrdersActionType.DeactivateOrderSearch:
            newState.searchedOrder = '';
            sessionStorage.setItem("searchedOrder", JSON.stringify(newState));
            break;
    }

    return newState;
}
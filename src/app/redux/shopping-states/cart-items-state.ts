import { CartItemModel } from "../../models/cart-models/cart-item.model";

export class CartItemsState {
    public cartItems: CartItemModel[] = [];
    public constructor() {
        const cartItems = JSON.parse(sessionStorage.getItem("cartItems"));
        if (cartItems) {
            this.cartItems = cartItems;
        }
    }
}

// Cart Items Action Types:
export enum CartItemsActionType {
    CartItemsDownloaded = "CartItemsDownloaded",
    CartItemAdded = "CartItemAdded",
    CartItemUpdated = "CartItemUpdated",
    CartItemDeleted = "CartItemDeleted",
    CartItemsClear = "CartItemsClear"
}

// Cart Items Action:
export interface CartItemsAction {
    type: CartItemsActionType;
    payload?: any;
}

export function cartItemsDownloadedAction(cartItems: CartItemModel[]): CartItemsAction {
    return { type: CartItemsActionType.CartItemsDownloaded, payload: cartItems };
}

export function cartItemAddedAction(cartItem: CartItemModel): CartItemsAction {
    return { type: CartItemsActionType.CartItemAdded, payload: cartItem };
}

export function cartItemUpdatedAction(cartItem: CartItemModel): CartItemsAction {
    return { type: CartItemsActionType.CartItemUpdated, payload: cartItem };
}

export function cartItemDeletedAction(cartItemId: number): CartItemsAction {
    return { type: CartItemsActionType.CartItemDeleted, payload: cartItemId };
}

export function cartItemsClearAction(): CartItemsAction {
    return { type: CartItemsActionType.CartItemsClear };
}

// Cart Items Reducer
export function cartItemsReducer(
    currentState: CartItemsState = new CartItemsState(),
    action: CartItemsAction): CartItemsState {
     
    const newState = { ...currentState };
    switch (action.type) {

        case CartItemsActionType.CartItemsDownloaded:
            newState.cartItems = action.payload;
            sessionStorage.setItem("cartItems", JSON.stringify(newState.cartItems));
            break;
        
        case CartItemsActionType.CartItemAdded:
            newState.cartItems.push(action.payload);
            sessionStorage.setItem("cartItems", JSON.stringify(newState.cartItems));
            break;
        
        case CartItemsActionType.CartItemUpdated:
            const indexToUpdate = newState.cartItems.findIndex(i => i.cartItemId === action.payload.cartItemId);
            newState.cartItems[indexToUpdate] = action.payload; // payload = the received cart item to update
            sessionStorage.setItem("cartItems", JSON.stringify(newState.cartItems));
            break;
        
        case CartItemsActionType.CartItemDeleted:
            const indexToDelete = newState.cartItems.findIndex(i => i.cartItemId === action.payload);
            newState.cartItems.splice(indexToDelete, 1); // payload = the received cart item id to delete
            sessionStorage.setItem("cartItems", JSON.stringify(newState.cartItems));
            break;
        
        case CartItemsActionType.CartItemsClear:
            newState.cartItems = [];
            sessionStorage.setItem("cartItems", JSON.stringify(newState.cartItems));
            break;
    }

    return newState;
}

import { UserCartModel } from '../../models/cart-models/user-cart.model';

// User Cart State:
export class UserCartState {
    public userCart: UserCartModel = null;
    public constructor() {
        const userCart = JSON.parse(sessionStorage.getItem("userCart"));
        if (userCart) {
            this.userCart = userCart;
        }
    }
}

// User Cart Action Type:
export enum UserCartActionType {
    UserCartDownloaded = "UserCartDownloaded",
    UserCartAdded = "UserCartAdded",
    UserCartUpdated = "UserCartUpdated",
    UserCartClear = "UserCartClear"
}

export interface UserCartAction {
    type: UserCartActionType;
    payload?: any;
}

export function userCartDownloadedAction(userCart: UserCartModel): UserCartAction {
    return { type: UserCartActionType.UserCartDownloaded, payload: userCart };
}

export function userCartAddedAction(userCart: UserCartModel): UserCartAction {
    return { type: UserCartActionType.UserCartAdded, payload: userCart };
}

export function userCartUpdatedAction(userCart: UserCartModel): UserCartAction {
    return { type: UserCartActionType.UserCartUpdated, payload: userCart };
}

export function userCartClearAction(): UserCartAction {
    return { type: UserCartActionType.UserCartClear };
}


// User Cart Reducer
export function userCartReducer(
    currentState: UserCartState = new UserCartState(),
    action: UserCartAction): UserCartState {
    
    const newState = { ...currentState };
    switch (action.type) {
        case UserCartActionType.UserCartDownloaded:
        case UserCartActionType.UserCartAdded:
        case UserCartActionType.UserCartUpdated:
            newState.userCart = action.payload;
            sessionStorage.setItem("userCart", JSON.stringify(newState.userCart));
            break;
        
        case UserCartActionType.UserCartClear:
            newState.userCart = null;
            break;
    }

    
    return newState;
}
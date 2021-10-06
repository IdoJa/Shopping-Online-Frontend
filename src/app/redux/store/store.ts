import { combineReducers, createStore } from "redux";
import { authReducer } from ".././global-states/auth-state";
import { userCartReducer } from "../shopping-states/user-cart-state";
import { cartItemsReducer } from "../shopping-states/cart-items-state";
import { productsReducer } from "../shopping-states/products-state";
import { categoriesReducer } from "../shopping-states/categories-state";
import { ordersReducer } from "../shopping-states/order-state";
import { citiesReducer } from "../info-states/cities-state";


const reducers = combineReducers({
    authState: authReducer,
    userCartState: userCartReducer,
    cartItemsState: cartItemsReducer,
    productsState: productsReducer,
    categoriesState: categoriesReducer,
    ordersState: ordersReducer,
    citiesState: citiesReducer
});
const store = createStore(reducers);

export default store;

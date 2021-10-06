import { ProductModel } from "../../models/product-models/product.model";

// Products State:
export class ProductsState {
    public products: ProductModel[] = [];
    public searchedProduct = '';
    public adminSelectedProduct = ''; // admin usage only

    // On page refresh - load saved products back to state: 
    public constructor() {
        const products = JSON.parse(sessionStorage.getItem("products"));
        if (products) {
            this.products = products;
        }
    }
}

// Products Action Types: 
export enum ProductsActionType {
    ProductsDownloaded = "ProductsDownloaded",
    ProductAdded = "ProductAdded",
    ProductUpdated = "ProductUpdated",
    ProductDeleted = "ProductDeleted",
    ProductsClear = "ProductsClear",
    ActivateProductSearch = "ActivateProductSearch",
    DeactivateProductSearch = "DeactivateProductSearch",
    ActivateAdminProductSelection = "ActivateAdminProductSelection",
    DeactivateAdminProductSelection = "DeactivateAdminProductSelection"
}

// Products Action: 
export interface ProductsAction {
    type: ProductsActionType; 
    payload?: any; 
}

export function productsDownloadedAction(products: ProductModel[]): ProductsAction {
    return { type: ProductsActionType.ProductsDownloaded, payload: products };
}

export function productAddedAction(product: ProductModel): ProductsAction {
    return { type: ProductsActionType.ProductAdded, payload: product };
}

export function productUpdatedAction(product: ProductModel): ProductsAction {
    return { type: ProductsActionType.ProductUpdated, payload: product };
}

export function productDeletedAction(productId: number): ProductsAction {
    return { type: ProductsActionType.ProductDeleted, payload: productId };
}

export function productClearAction(): ProductsAction {
    return { type: ProductsActionType.ProductsClear };
}

// Handle Product Search Actions
export function activateProductSearchAction(searchedProduct: string): ProductsAction {
    return { type: ProductsActionType.ActivateProductSearch, payload: searchedProduct };
}

export function deactivateProductSearchAction(): ProductsAction {
    return { type: ProductsActionType.DeactivateProductSearch };
}

// Handle Admin Selection
export function activateAdminProductSelection(adminSelectedProduct: number): ProductsAction {
    return { type: ProductsActionType.ActivateAdminProductSelection, payload: adminSelectedProduct };
}

export function deactivateAdminProductSelection(): ProductsAction {
    return { type: ProductsActionType.DeactivateAdminProductSelection };
}


// Products Reducer: 
export function productsReducer(
    currentState: ProductsState = new ProductsState(),
    action: ProductsAction): ProductsState {

    const newState = { ...currentState }; // Duplicate currentState into a newState.

    switch (action.type) {
        case ProductsActionType.ProductsDownloaded:
            newState.products = action.payload; // payload = all products
            sessionStorage.setItem("products", JSON.stringify(newState.products));
            break;

        case ProductsActionType.ProductAdded:
            newState.products.push(action.payload); // payload = the added product
            sessionStorage.setItem("products", JSON.stringify(newState.products));
            break;

        case ProductsActionType.ProductUpdated:
            const indexToUpdate = newState.products.findIndex(p => p.productId == action.payload.productId);
            newState.products[indexToUpdate] = action.payload; // payload = the updated product
            sessionStorage.setItem("products", JSON.stringify(newState.products));
            break;

        case ProductsActionType.ProductDeleted:
            const indexToDelete = newState.products.findIndex(p => p.productId == action.payload); // payload = the deleted product's id
            newState.products.splice(indexToDelete, 1);
            sessionStorage.setItem("products", JSON.stringify(newState.products));
            break;
        
        case ProductsActionType.ProductsClear:
            newState.products = [];
            break;
        
        case ProductsActionType.ActivateProductSearch:
            newState.searchedProduct = action.payload;
            sessionStorage.setItem("searchedProduct", JSON.stringify(newState));
            break;
        
        case ProductsActionType.DeactivateProductSearch:
            newState.searchedProduct = '';
            sessionStorage.setItem("searchedProduct", JSON.stringify(newState));
            break;
        
        case ProductsActionType.ActivateAdminProductSelection:
            newState.adminSelectedProduct = action.payload;
            sessionStorage.setItem("adminSelectedProduct", JSON.stringify(newState));
            break;
        
        case ProductsActionType.DeactivateAdminProductSelection:
            newState.adminSelectedProduct = '';
            sessionStorage.setItem("adminSelectedProduct", JSON.stringify(newState));
            break;
    }


    return newState; // Return the newState.
}



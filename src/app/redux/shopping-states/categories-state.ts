import { CategoryModel } from '../../models/product-models/category.model';

// Category State:
export class CategoriesState {
    public categories: CategoryModel[] = [];
    public selectedCategory = '';

    // On page refresh - load saved categories back to state:
    public constructor() {
        const categories = JSON.parse(sessionStorage.getItem("categories"));
        if (categories) {
            this.categories = categories;
        }
    }
}

// Categories Action Types:
export enum CategoriesActionType {
    CategoriesDownloaded = "CategoriesDownloaded",
    CategorySelected = "CategorySelected",
    CategorySelectedNone = "CategorySelectedNone"
}

// Categories Action:
export interface CategoriesAction {
    type: CategoriesActionType;
    payload?: any;
}

export function categoriesDownloadedAction(categories: CategoryModel[]): CategoriesAction {
    return { type: CategoriesActionType.CategoriesDownloaded, payload: categories };
}

export function categorySelectedAction(categoryId: number): CategoriesAction {
    return { type: CategoriesActionType.CategorySelected, payload: categoryId };
}

export function categorySelectedNoneAction(): CategoriesAction {
    return { type: CategoriesActionType.CategorySelectedNone };
}

// Categories Reducer:
export function categoriesReducer(
    currentState: CategoriesState = new CategoriesState(),
    action: CategoriesAction): CategoriesState {
    
    const newState = { ...currentState };

    switch (action.type) {
        case CategoriesActionType.CategoriesDownloaded:
            newState.categories = action.payload;
            sessionStorage.setItem("categories", JSON.stringify(newState.categories));
            break;
        
        case CategoriesActionType.CategorySelected:
            newState.selectedCategory = action.payload;
            sessionStorage.setItem("selectedCategory", JSON.stringify(newState));
            break;
        
        case CategoriesActionType.CategorySelectedNone:
            newState.selectedCategory = '';
            sessionStorage.setItem("selectedCategory", JSON.stringify(newState));
            break;
    }

    return newState;
}
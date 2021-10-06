import { Component, ElementRef, OnInit, ViewChild, Renderer2} from '@angular/core';
import { SearchDirective } from 'src/app/directives/search-directive/search.directive';
import { CategoryModel } from 'src/app/models/product-models/category.model';
import { categorySelectedAction, categorySelectedNoneAction } from 'src/app/redux/shopping-states/categories-state';
import { activateProductSearchAction, deactivateProductSearchAction } from 'src/app/redux/shopping-states/products-state';
import store from 'src/app/redux/store/store';
import { NotificationService } from 'src/app/services/global-services/notification.service';
import { CategoriesService } from 'src/app/services/shopping-services/categories.service';

@Component({
  selector: 'app-category-navbar',
  templateUrl: './category-navbar.component.html',
  styleUrls: ['./category-navbar.component.css']
})
export class CategoryNavbarComponent implements OnInit {

  public categories: CategoryModel[];
  
  // Set search input element reference for the directive
  @ViewChild(SearchDirective) appSearch: any;

  public renderer: Renderer2;


  constructor(
    private categoriesService: CategoriesService,
    private notificationService: NotificationService) { }

  
  public async ngOnInit() {
    try {
      this.categories = await this.categoriesService.getAllCategories();
    }
    catch (err) {
      this.notificationService.error(err);
    }
  }

  public selectedCategory(categoryId: number) {
    // Handle filters - if there is already searched product and then trying to select category, deactivate product search
    if (store.getState().productsState.searchedProduct !== '') {
      store.dispatch(deactivateProductSearchAction());

      // clear via directive method
      this.appSearch.clearSearch();
    }

    store.dispatch(categorySelectedAction(categoryId));

    
  }

  public selectAll() {
    store.dispatch(categorySelectedNoneAction());
  }

  public searchedProduct(event: KeyboardEvent): void {
    let searchedProduct = ((event.target as HTMLInputElement).value);
    if (searchedProduct) {
      // Handle filters - if there is already category selected and then trying to search, deactivate category filter
      if (store.getState().categoriesState.selectedCategory !== '') {
        store.dispatch(categorySelectedNoneAction());
      }
      store.dispatch(activateProductSearchAction(searchedProduct));
    }
    
    if (!searchedProduct) {
      store.dispatch(deactivateProductSearchAction());
    }
  }

}

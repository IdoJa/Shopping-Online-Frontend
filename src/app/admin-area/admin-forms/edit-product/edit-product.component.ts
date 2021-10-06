import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CategoryModel } from 'src/app/models/product-models/category.model';
import { ProductModel } from 'src/app/models/product-models/product.model';
import { NotificationService } from 'src/app/services/global-services/notification.service';
import { CategoriesService } from 'src/app/services/shopping-services/categories.service';
import { ProductsService } from 'src/app/services/shopping-services/products.service';
import store from 'src/app/redux/store/store';
import { deactivateAdminProductSelection } from 'src/app/redux/shopping-states/products-state';
import { Unsubscribe } from 'redux';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  public categories: CategoryModel[];
  public newProduct: ProductModel = new ProductModel();;
  public preview: string; // Image preview

  public adminSelectedProduct: string;
  public unsubscribeStore: Unsubscribe;

  // Get form reference
  @ViewChild('editProductFormInfo') editProductFormInfo: NgForm;

  @Input()
  public selectedProductDetails: ProductModel;

  constructor(
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
    private notificationService: NotificationService) { }

  public async ngOnInit() {
    try {
      this.categories = await this.categoriesService.getAllCategories();

      this.unsubscribeStore = store.subscribe(() => {
        this.adminSelectedProduct = store.getState().productsState.adminSelectedProduct;

        if (this.adminSelectedProduct) {
          this.clearForm(this.editProductFormInfo);
        }
      });
    }
    catch (err) {
      this.notificationService.error(err);
    }
  }

  public handleImage(image: Event) {
    this.newProduct.image = (image.target as HTMLInputElement).files[0];
    const myFileReader = new FileReader(); // JavaScript object which can read files from the user computer
    myFileReader.onload = args => this.preview = args.target.result.toString(); // When complete reading - set the image in.
    myFileReader.readAsDataURL(this.newProduct.image); // Start reading.
  }
  
  // Option to set defaults
  public setDefaults(editProductFormInfo: NgForm) {
    editProductFormInfo.controls['categoryId'].setValue(this.selectedProductDetails.categoryId);
    editProductFormInfo.controls['productName'].setValue(this.selectedProductDetails.productName);
    editProductFormInfo.controls['productPrice'].setValue(this.selectedProductDetails.productPrice);
  }

  public clearForm(editProductFormInfo: NgForm) {
    editProductFormInfo.resetForm();
    this.preview = '';
  }

 
  public async editProduct(editProductFormInfo: NgForm) {
    // validation check before sending
    try {
      if (!editProductFormInfo.valid) {
        this.notificationService.error("Please make sure all fields are filled and correct");
        return;
      }

      if (this.newProduct.productName.trim().length === 0) {
        this.notificationService.error("Product name cannot contain only spaces");
        return;
      }

      if (!this.newProduct.image) {
        this.notificationService.error("Please make sure you have selected an image");
        return;
      }

      // arranging values to FormData
      const formData = new FormData();
      this.newProduct.productId = this.selectedProductDetails.productId; // set
      formData.append("productId", this.newProduct.productId.toString());
      formData.append("categoryId", this.newProduct.categoryId.toString());
      formData.append("productName", this.newProduct.productName);
      formData.append("productPrice", this.newProduct.productPrice.toString());
      formData.append("image", this.newProduct.image);
      formData.append("imageFileName", this.newProduct.image.name);
    
      await this.productsService.editProduct(formData);
      this.notificationService.success("Product Edited !");
      this.clearForm(editProductFormInfo);
      store.dispatch(deactivateAdminProductSelection());
    }
    catch (err) {
      this.notificationService.error(err);
    }

    

  }

  public ngOnDestroy() {
    this.unsubscribeStore();
  }

}

//import { CurrencyPipe } from "@angular/common";
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CategoryModel } from 'src/app/models/product-models/category.model';
import { ProductModel } from 'src/app/models/product-models/product.model';
import { NotificationService } from 'src/app/services/global-services/notification.service';
import { CategoriesService } from 'src/app/services/shopping-services/categories.service';
import { ProductsService } from 'src/app/services/shopping-services/products.service';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  public categories: CategoryModel[];

  public newProduct: ProductModel = new ProductModel();
  public preview: string; // Image preview


  constructor(
    private productsService: ProductsService,
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

  public handleImage(image: Event) {
    this.newProduct.image = (image.target as HTMLInputElement).files[0];
    const myFileReader = new FileReader(); // JavaScript object which can read files from the user computer
    myFileReader.onload = args => this.preview = args.target.result.toString(); // When complete reading - set the image in.
    myFileReader.readAsDataURL(this.newProduct.image); // Start reading.
  }

  public clearForm(addProductFormInfo: NgForm) {
    addProductFormInfo.resetForm();
    this.preview = '';
  }

  public async addProduct(addProductFormInfo: NgForm) {
    // validation check before sending
    try {
      if (!addProductFormInfo.valid) {
        this.notificationService.error("Please make sure all fields are filled");
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

      // Set values to formData
      const formData = new FormData();
      formData.append("categoryId", this.newProduct.categoryId.toString());
      formData.append("productName", this.newProduct.productName);
      formData.append("productPrice", this.newProduct.productPrice.toString());
      formData.append("image", this.newProduct.image);
      formData.append("imageFileName", this.newProduct.image.name);

      const addedProduct = await this.productsService.addProduct(formData);
      this.notificationService.success("New Product Added ! <br>" + addedProduct.productName);
      this.clearForm(addProductFormInfo);
    }
    catch (err) {
      this.notificationService.error(err);
    }
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductModel } from 'src/app/models/product-models/product.model';
import { environment } from 'src/environments/environment';
import { ProductCardDialogComponent } from '../../dialogs/product-card-dialog/product-card-dialog.component';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  @Input()
  public product: ProductModel;

  public imageUrl: string;

  constructor(private dialog: MatDialog) { }

  public ngOnInit(): void {
    this.imageUrl = environment.productsUrl + "images/" + this.product.imageFileName;
  }

  public openDialog() {
    let config = new MatDialogConfig();
    config.height = '500px';
    config.width = '400px';
    let dialogRef = this.dialog.open(ProductCardDialogComponent, config);
    dialogRef.componentInstance.product = this.product;
    dialogRef.componentInstance.imageUrl = this.imageUrl;
  }

}

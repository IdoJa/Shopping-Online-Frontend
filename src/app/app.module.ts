import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { LayoutComponent } from './layout-area/layout/layout.component';
import { NavbarComponent } from './layout-area/navbar/navbar.component';



import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

// Material UI Imports
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { LoginComponent } from './auth-area/login/login.component';
import { HomeComponent } from './home-area/home/home.component';
import { Page404Component } from './shared-area/pages/page404/page404.component';
import { LeftPanelAComponent } from './home-area/panels/left-panel-a/left-panel-a.component';
import { MiddlePanelBComponent } from './home-area/panels/middle-panel-b/middle-panel-b.component';
import { RightPanelCComponent } from './home-area/panels/right-panel-c/right-panel-c.component';
import { ShoppingStatusComponent } from './home-area/panels/left-panel-a/shopping-status/shopping-status.component';
import { ShoppingInfoComponent } from './home-area/panels/right-panel-c/shopping-info/shopping-info.component';
import { JwtInterceptor } from './services/global-services/jwt.interceptor';
import { RegisterComponent } from './auth-area/register/register.component';
import { MainShoppingAreaComponent } from './shopping-area/main/main-shopping-area/main-shopping-area.component';
import { ProductListComponent } from './shopping-area/products-area/product-list/product-list.component';
import { ProductCardComponent } from './shopping-area/products-area/product-card/product-card.component';
import { SideProductListComponent } from './shopping-area/side/side-product-list/side-product-list.component';
import { SideProductCardComponent } from './shopping-area/side/side-product-card/side-product-card.component';
import { CategoryNavbarComponent } from './shared-area/navbars/category-navbar/category-navbar.component';
import { ProductCardDialogComponent } from './shopping-area/dialogs/product-card-dialog/product-card-dialog.component';
import { DeleteAllItemsDialogComponent } from './shopping-area/dialogs/delete-all-items-dialog/delete-all-items-dialog.component';
import { MainOrdersAreaComponent } from './orders-area/main/main-orders-area/main-orders-area.component';
import { SearchOrderComponent } from './orders-area/panels/search-order/search-order.component';
import { OrderComponent } from './orders-area/panels/order/order.component';
import { OrderProductListComponent } from './orders-area/panels/products-area/order-product-list/order-product-list.component';
import { OrderProductCardComponent } from './orders-area/panels/products-area/order-product-card/order-product-card.component';
import { SearchDirective } from './directives/search-directive/search.directive';
import { MainAdminShoppingAreaComponent } from './admin-area/shopping-area/main/main-admin-shopping-area/main-admin-shopping-area.component';
import { AdminProductCardComponent } from './admin-area/shopping-area/products-area/admin-product-card/admin-product-card.component';
import { AdminProductListComponent } from './admin-area/shopping-area/products-area/admin-product-list/admin-product-list.component';
import { SideContentComponent } from './admin-area/shopping-area/side/side-content/side-content.component';
import { AddProductComponent } from './admin-area/admin-forms/add-product/add-product.component';
import { EditProductComponent } from './admin-area/admin-forms/edit-product/edit-product.component';
import { SideProductPreviewCardComponent } from './admin-area/shopping-area/side/side-product-preview-card/side-product-preview-card.component';
import { InvoicePreviewDialogComponent } from './orders-area/dialogs/invoice-preview-dialog/invoice-preview-dialog.component';
import { InvoiceDirective } from './directives/invoice-directive/invoice.directive';

@NgModule({
  declarations: [
    LayoutComponent,
    NavbarComponent,
    LoginComponent,
    HomeComponent,
    Page404Component,
    LeftPanelAComponent,
    MiddlePanelBComponent,
    RightPanelCComponent,
    ShoppingStatusComponent,
    ShoppingInfoComponent,
    RegisterComponent,
    MainShoppingAreaComponent,
    ProductListComponent,
    ProductCardComponent,
    SideProductListComponent,
    SideProductCardComponent,
    CategoryNavbarComponent,
    ProductCardDialogComponent,
    DeleteAllItemsDialogComponent,
    MainOrdersAreaComponent,
    SearchOrderComponent,
    OrderComponent,
    OrderProductListComponent,
    OrderProductCardComponent,
    SearchDirective,
    MainAdminShoppingAreaComponent,
    AdminProductCardComponent,
    AdminProductListComponent,
    SideContentComponent,
    AddProductComponent,
    EditProductComponent,
    SideProductPreviewCardComponent,
    InvoicePreviewDialogComponent,
    InvoiceDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatStepperModule,
    MatSidenavModule,
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: JwtInterceptor,
    multi: true
  }],
  bootstrap: [LayoutComponent]
})
export class AppModule { }

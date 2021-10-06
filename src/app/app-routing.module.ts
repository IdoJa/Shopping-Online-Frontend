import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainAdminShoppingAreaComponent } from './admin-area/shopping-area/main/main-admin-shopping-area/main-admin-shopping-area.component';
import { RegisterComponent } from './auth-area/register/register.component';
import { HomeComponent } from './home-area/home/home.component';
import { MainOrdersAreaComponent } from './orders-area/main/main-orders-area/main-orders-area.component';
import { AdminGuard } from './services/guards/auth/admin.guard';
import { LoginGuard } from './services/guards/auth/login.guard';
import { OrderGuard } from './services/guards/shopping/order.guard';
import { Page404Component } from './shared-area/pages/page404/page404.component';
import { MainShoppingAreaComponent } from './shopping-area/main/main-shopping-area/main-shopping-area.component';

const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "register", component: RegisterComponent },
  { path: "shopping", canActivate: [LoginGuard], component: MainShoppingAreaComponent },
  { path: "admin-shopping", canActivate: [AdminGuard], component: MainAdminShoppingAreaComponent },
  { path: "order", canActivate: [LoginGuard, OrderGuard], component: MainOrdersAreaComponent },
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "**", component: Page404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

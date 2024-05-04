import { Routes } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { SignInComponent } from "./components/sign-in/sign-in.component";
import { HomeComponent } from "./components/home/home.component";
import { RouteErrorComponent } from "./components/route-error/route-error.component";
import { authGuard } from "./auth.guard";
import { ResetPasswordComponent } from "./components/reset-password/reset-password.component";
import { AdminProductsComponent } from "./components/admin-products/admin-products.component";
import { AllProductsComponent } from "./components/all-products/all-products.component";
import { EditProductComponent } from "./components/edit-product/edit-product.component";
import { AddProductComponent } from "./components/add-product/add-product.component";
import { PreviewProductComponent } from "./components/preview-product/preview-product.component";

export const routes: Routes = [
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "sign-up",
    component: SignInComponent,
  },
  {
    path: "reset",
    component: ResetPasswordComponent,
  },
  {
    path: "home",
    component: HomeComponent,
    canActivate: [authGuard],
    children: [
      {
        path: "admin-products",
        component: AdminProductsComponent,
      },
      {
        path: "edit-product/:product-id",
        component: EditProductComponent,
      },
      {
        path: "add-product",
        component: AddProductComponent,
      },
      {
        path: "all-products",
        component: AllProductsComponent,
      },
      {
        path: "preview-product/:product-id",
        component: PreviewProductComponent,
      },
    ],
  },
  {
    path: "",
    redirectTo: "home/admin-products",
    pathMatch: "full",
  },
  {
    path: "**",
    component: RouteErrorComponent,
  },
];

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
    loadComponent: () =>
      import("./components/login/login.component").then(
        (m) => m.LoginComponent
      ),
  },
  {
    path: "sign-up",
    loadComponent: () =>
      import("./components/sign-in/sign-in.component").then(
        (m) => m.SignInComponent
      ),
  },
  {
    path: "reset",
    loadComponent: () =>
      import("./components/reset-password/reset-password.component").then(
        (m) => m.ResetPasswordComponent
      ),
  },
  {
    path: "home",
    loadComponent: () =>
      import("./components/home/home.component").then((m) => m.HomeComponent),
    canActivate: [authGuard],
    children: [
      {
        path: "admin-products",
        loadComponent: () =>
          import("./components/admin-products/admin-products.component").then(
            (m) => m.AdminProductsComponent
          ),
      },
      {
        path: "edit-product/:product-id",
        loadComponent: () =>
          import("./components/edit-product/edit-product.component").then(
            (m) => m.EditProductComponent
          ),
      },
      {
        path: "add-product",
        loadComponent: () =>
          import("./components/add-product/add-product.component").then(
            (m) => m.AddProductComponent
          ),
      },
      {
        path: "all-products",
        loadComponent: () =>
          import("./components/all-products/all-products.component").then(
            (m) => m.AllProductsComponent
          ),
      },
      {
        path: "preview-product/:product-id",
        loadComponent: () =>
          import("./components/preview-product/preview-product.component").then(
            (m) => m.PreviewProductComponent
          ),
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
    loadComponent: () =>
      import("./components/route-error/route-error.component").then(
        (m) => m.RouteErrorComponent
      ),
  },
];

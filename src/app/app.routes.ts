import { Routes } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { SignInComponent } from "./components/sign-in/sign-in.component";
import { HomeComponent } from "./components/home/home.component";
import { RouteErrorComponent } from "./components/route-error/route-error.component";
import { authGuard } from "./auth.guard";

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
    path: "home",
    component: HomeComponent,
    canActivate: [authGuard],
  },
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full",
  },
  {
    path: "**",
    component: RouteErrorComponent,
  },
];

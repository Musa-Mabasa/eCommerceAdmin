import { CanActivateFn, Router } from "@angular/router";
import { inject } from "@angular/core";
import { Auth } from "@angular/fire/auth";
import { getCookie } from "./utils/utils";

export const authGuard: CanActivateFn = (route, state) => {
  if (getCookie("userId") != "") return true;

  const router = inject(Router);
  return router.parseUrl("login");
};

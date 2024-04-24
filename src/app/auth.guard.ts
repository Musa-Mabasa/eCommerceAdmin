import { CanActivateFn, Router } from "@angular/router";
import { inject } from "@angular/core";
import { Auth } from "@angular/fire/auth";

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(Auth);
  const user = auth.currentUser;

  if (user) {
    return true;
  }
  return true;
  const router = inject(Router);
  return router.parseUrl("login");
};

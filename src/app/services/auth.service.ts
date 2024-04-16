import { Injectable, inject } from "@angular/core";
import {
  Auth,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail,
  confirmPasswordReset,
  browserLocalPersistence,
} from "@angular/fire/auth";
import { setPersistence } from "firebase/auth";
import { Router } from "@angular/router";
import { NzNotificationService } from "ng-zorro-antd/notification";
import { BehaviorSubject } from "rxjs";
import { Store } from "@ngrx/store";
import { AdminState } from "../adminStore/reducer";
import {
  setIsAuthLoading,
  setIsAuthLoadingComplete,
} from "../adminStore/actions";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private _auth = inject(Auth);
  private _router = inject(Router);
  private notification = inject(NzNotificationService);
  store = inject(Store<AdminState>);

  byGoogle() {
    signInWithPopup(this._auth, new GoogleAuthProvider())
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);

        if (!credential) {
          throw new Error("Credential Error");
        }
        setPersistence(this._auth, browserLocalPersistence);
        this._router.navigate(["/home"]);
      })
      .catch((err) => console.error(err));
  }

  signup(email: string, password: string) {
    this.store.dispatch(setIsAuthLoading());
    createUserWithEmailAndPassword(this._auth, email.trim(), password.trim())
      .then((result) => {
        this._router.navigate(["/home"]);
      })
      .catch((err) => {
        this.notification.create("error", "Sign In failed", err.message);
      })
      .finally(() => this.store.dispatch(setIsAuthLoadingComplete()));
  }

  login(email: string, password: string) {
    this.store.dispatch(setIsAuthLoading());
    signInWithEmailAndPassword(this._auth, email.trim(), password.trim())
      .then((result) => {
        this._router.navigate(["/home"]);
      })
      .catch((err) => {
        this.notification.create(
          "error",
          "Login failed",
          "Incorrect Email or password"
        );
      })
      .finally(() => this.store.dispatch(setIsAuthLoadingComplete()));
  }

  resetPassword(email: string) {
    this.store.dispatch(setIsAuthLoading());
    sendPasswordResetEmail(this._auth, email.trim())
      .then(() => {
        this.notification.create(
          "success",
          "Email Sent",
          "Check emails and reset your password."
        );
        this._router.navigate(["/login"]);
      })
      .catch((err) =>
        this.notification.create("error", "Email failed to send", err.message)
      )
      .finally(() => this.store.dispatch(setIsAuthLoadingComplete()));
  }
}

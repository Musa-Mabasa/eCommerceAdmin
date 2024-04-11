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

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private _auth = inject(Auth);
  private _router = inject(Router);

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
    createUserWithEmailAndPassword(
      this._auth,
      email.trim(),
      password.trim()
    ).then((result) => {
      this._router.navigate(["/home"]);
    });
  }

  login(email: string, password: string) {
    signInWithEmailAndPassword(this._auth, email.trim(), password.trim()).then(
      (result) => {
        this._router.navigate(["/home"]);
      }
    );
  }

  constructor() {}
}

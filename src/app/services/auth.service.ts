import { Injectable, inject } from "@angular/core";
import {
  Auth,
  GoogleAuthProvider,
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "@angular/fire/auth";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private _auth = inject(Auth);

  byGoogle(){
    signInWithPopup(this._auth, new GoogleAuthProvider()).then(
      (result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        console.log(result.user);
        
        if (!credential) {
          throw new Error("Credential Error");
        }
        const token = credential.accessToken;
        const user = result.user;
      }
    ).catch(err => console.error(err));
  }

  signup(email: string, password: string): Promise<UserCredential> {
    return createUserWithEmailAndPassword(
      this._auth,
      email.trim(),
      password.trim()
    );
  }

  login(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(
        this._auth,
        email.trim(),
        password.trim()
      );
    }

  constructor() {}
}

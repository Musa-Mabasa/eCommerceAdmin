import { Component, OnInit, inject } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { NgIconComponent, provideIcons } from "@ng-icons/core";
import { RouterLink } from "@angular/router";
import {
  matEmailOutline,
  matLockOutline,
} from "@ng-icons/material-icons/outline";
import { faEye, faEyeSlash } from "@ng-icons/font-awesome/regular";
import { AsyncPipe, NgIf } from "@angular/common";
import { Store } from "@ngrx/store";
import { AdminState } from "../../adminStore/reducer";
import { selectIsAuthLoading } from "../../adminStore/selectors";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [NgIconComponent, ReactiveFormsModule, RouterLink, NgIf, AsyncPipe],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.scss",
  viewProviders: [
    provideIcons({ matEmailOutline, matLockOutline, faEye, faEyeSlash }),
  ],
})
export class LoginComponent implements OnInit {
  private _service = inject(AuthService);
  store = inject(Store<AdminState>);
  signInForm: FormGroup | undefined;
  hidePassword = true;
  isLoading$ = this.store.select(selectIsAuthLoading);

  ngOnInit(): void {
    this.signInForm = new FormGroup({
      email: new FormControl("", {
        updateOn: "change",
        validators: [Validators.email, Validators.required],
      }),
      password: new FormControl("", {
        updateOn: "submit",
        validators: [Validators.required],
      }),
    });
  }

  get email() {
    return this.signInForm?.get("email");
  }

  get password() {
    return this.signInForm?.get("password");
  }

  byGoogle() {
    this._service.byGoogle();
  }

  byForm() {
    if (this.signInForm?.invalid) {
      return;
    }
    const { email, password } = this.signInForm?.value;
    if (email && password) this._service.login(email, password);
  }
}

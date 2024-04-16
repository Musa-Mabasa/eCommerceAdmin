import { Component, OnInit, inject } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from "@angular/forms";
import { NgIconComponent, provideIcons } from "@ng-icons/core";
import {
  matEmailOutline,
  matLockOutline,
} from "@ng-icons/material-icons/outline";
import { faEye, faEyeSlash } from "@ng-icons/font-awesome/regular";
import { RouterLink } from "@angular/router";
import { AsyncPipe, NgIf } from "@angular/common";
import { AdminState } from "../../adminStore/reducer";
import { Store } from "@ngrx/store";
import { selectIsAuthLoading } from "../../adminStore/selectors";

@Component({
  selector: "app-sign-in",
  standalone: true,
  imports: [NgIconComponent, ReactiveFormsModule, RouterLink, NgIf, AsyncPipe],
  templateUrl: "./sign-in.component.html",
  styleUrl: "./sign-in.component.scss",
  viewProviders: [
    provideIcons({ matEmailOutline, matLockOutline, faEye, faEyeSlash }),
  ],
})
export class SignInComponent implements OnInit {
  private _service = inject(AuthService);
  store = inject(Store<AdminState>);
  signUpForm: FormGroup | undefined;
  hidePassword = true;
  hideConfirmPassword = true;
  isLoading$ = this.store.select(selectIsAuthLoading);

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      email: new FormControl("", {
        updateOn: "change",
        validators: [Validators.email, Validators.required],
      }),
      password: new FormControl("", {
        updateOn: "blur",
        validators: [
          Validators.pattern(
            /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/
          ),
          Validators.required,
        ],
      }),
      confirmPassword: new FormControl("", {
        updateOn: "blur",
        validators: [
          Validators.pattern(
            /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/
          ),
          Validators.required,
          this.passwordsMatchValidator(),
        ],
      }),
    });
  }

  get email() {
    return this.signUpForm?.get("email");
  }

  get password() {
    return this.signUpForm?.get("password");
  }

  get confirmPassword() {
    return this.signUpForm?.get("confirmPassword");
  }

  passwordsMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (this.signUpForm?.get("password")?.value === control.value) {
        return null;
      }

      return { passwordsMatch: true };
    };
  }

  byGoogle(): void {
    this._service.byGoogle();
  }

  byForm(): void {
    if (this.signUpForm?.invalid) {
      return;
    }

    const { email, password } = this.signUpForm?.value;
    if (email) this._service.signup(email, password!);
  }
}

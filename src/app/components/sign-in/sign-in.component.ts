import { Component, inject } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { NgIconComponent, provideIcons } from "@ng-icons/core";
import {
  matEmailOutline,
  matLockOutline,
} from "@ng-icons/material-icons/outline";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-sign-in",
  standalone: true,
  imports: [NgIconComponent, ReactiveFormsModule, RouterLink],
  templateUrl: "./sign-in.component.html",
  styleUrl: "./sign-in.component.scss",
  viewProviders: [provideIcons({ matEmailOutline, matLockOutline })],
})
export class SignInComponent {
  private _service = inject(AuthService);

  signUpForm = new FormGroup({
    email: new FormControl(""),
    password: new FormControl(""),
    confirmPassword: new FormControl(""),
  });

  byGoogle(): void {
    this._service.byGoogle();
  }

  byForm(): void {
    const { email, password } = this.signUpForm.value;
    if (email) this._service.signup(email, password!);
  }
}

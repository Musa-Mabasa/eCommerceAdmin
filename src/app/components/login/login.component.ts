import { Component, inject } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { FormGroup, FormControl, ReactiveFormsModule } from "@angular/forms";
import { NgIconComponent, provideIcons } from "@ng-icons/core";
import { RouterLink } from "@angular/router";
import {
  matEmailOutline,
  matLockOutline,
} from "@ng-icons/material-icons/outline";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [NgIconComponent, ReactiveFormsModule, RouterLink],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.scss",
  viewProviders: [provideIcons({ matEmailOutline, matLockOutline })],
})
export class LoginComponent {
  private _service = inject(AuthService);

  signInForm = new FormGroup({
    email: new FormControl(""),
    password: new FormControl(""),
  });

  byGoogle() {
    this._service.byGoogle();
  }

  byForm() {
    const { email, password } = this.signInForm.value;
    if (email && password) this._service.login(email, password);
  }
}

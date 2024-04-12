import { Component, inject } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { matEmailOutline } from "@ng-icons/material-icons/outline";
import { NgIconComponent, provideIcons } from "@ng-icons/core";
import { NgIf } from "@angular/common";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-reset-password",
  standalone: true,
  imports: [NgIconComponent, NgIf, ReactiveFormsModule, RouterLink],
  templateUrl: "./reset-password.component.html",
  styleUrl: "./reset-password.component.scss",
  viewProviders: [provideIcons({ matEmailOutline })],
})
export class ResetPasswordComponent {
  private _service = inject(AuthService);
  resetForm!: FormGroup;

  ngOnInit(): void {
    this.resetForm = new FormGroup({
      email: new FormControl("", {
        updateOn: "change",
        validators: [Validators.email, Validators.required],
      }),
    });
  }

  get email() {
    return this.resetForm.get("email");
  }

  reset() {
    if (this.resetForm?.invalid) {
      return;
    }

    this._service.resetPassword(this.resetForm?.value?.email);
  }
}

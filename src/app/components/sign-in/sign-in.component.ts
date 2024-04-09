import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {
  private _service = inject(AuthService);
  
  signInForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  })
  
  byGoogle(): void {
    this._service
      .byGoogle()
  }

  byForm(): void {
    const { email, password } = this.signInForm.value;
    this._service
      .signup(email!, password!)
  }
}

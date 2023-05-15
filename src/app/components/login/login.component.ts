import { Component } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  title = 'Login';
  validateForm!: UntypedFormGroup;
  invalidLogin: boolean = false;
  invalidLoginMessage: string = '';

  errorMessage = {
    email: [
      { type: 'required', message: 'Please input your email' },
      { type: 'email', message: 'Email is invalid' },
    ],
    password: [{ type: 'required', message: 'Please input your email' }],
  };

  constructor(
    private fb: UntypedFormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  async submitForm() {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);

      (
        await this.auth.login(
          this.validateForm.value.email,
          this.validateForm.value.password
        )
      ).subscribe(
        (res: any) => {
          this.router.navigate(['/dashboard']);
          this.invalidLogin = false;
        },
        (err: any) => {
          this.invalidLogin = true;
          this.invalidLoginMessage = err.message;
          setTimeout(() => {
            this.invalidLogin = false;
          }, 5000);
        }
      );
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true],
    });
  }
}

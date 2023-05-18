import { NzMessageService } from 'ng-zorro-antd/message';
import { Component } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
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
    private formBuilder: UntypedFormBuilder,
    public auth: AuthService,
    private router: Router,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.validateForm = this.formBuilder.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [false],
    });
  }

  async submitForm() {
    if (this.validateForm.valid) {
      this.auth
        .login(this.validateForm.value.email, this.validateForm.value.password)
        .subscribe({
          next: (data) => {
            if (!data.user.emailVerified) {
              this.auth.sendEmailVerification();
            }
            this.router.navigate(['/dashboard']);
          },
          error: (err) => {
            this.invalidLogin = true;
            this.invalidLoginMessage = err.message;
            setTimeout(() => (this.invalidLogin = false), 5000);
          },
        });
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  loginWithGoogle() {
    this.auth.socialLogin('google');
  }

  loginWithFacebook() {
    this.auth.socialLogin('facebook');
  }

  loginWithTwitter() {
    this.auth.socialLogin('twitter');
  }
}

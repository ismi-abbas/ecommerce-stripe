import { Component } from '@angular/core';
import {
  UntypedFormGroup,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  title = 'Register';
  validateForm!: UntypedFormGroup;

  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  constructor(
    private fb: UntypedFormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
      name: [null, [Validators.required]],
      remember: [true],
    });
  }

  register() {
    console.log('register', this.validateForm.value);
    this.authService
      .register(this.validateForm.value.email, this.validateForm.value.password)
      .then((res) => {})
      .catch((err) => {
        alert(err.message);
      });
  }
}

import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressBarModule
  ]
})
export class AuthComponent {
  isLoginMode = true;
  loading = false;
  error: string | null = null;
  authForm;

  constructor(fb: FormBuilder) {
    this.authForm = fb.nonNullable.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  switchMode(): void {
    this.isLoginMode = !this.isLoginMode;
    this.authForm.reset();
    this.error = null;
  }

  // Explicitly get services only where needed
  submit(): void {
    if (this.authForm.invalid) return;
    this.loading = true;
    this.error = null;

    // Lazy load the services to avoid injection in constructor
    const auth = window['ng'].injector.get(AuthService);
    const router = window['ng'].injector.get(Router);

    const authFn = this.isLoginMode
      ? auth.login(this.authForm.value.email!, this.authForm.value.password!)
      : auth.signUp(this.authForm.value.email!, this.authForm.value.password!);

    authFn.subscribe({
      next: (res: any) => {
        this.loading = false;
        if (res.error) {
          this.error = res.error.message;
        } else {
          router.navigateByUrl('/');
        }
      },
      error: (err: any) => {
        this.loading = false;
        this.error = err.error_description || err.message || 'Unknown error';
      }
    });
  }
}

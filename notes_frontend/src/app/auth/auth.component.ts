import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

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

  constructor(fb: FormBuilder, private auth: AuthService, private router: Router) {
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

  submit(): void {
    if (this.authForm.invalid) return;
    this.loading = true;
    this.error = null;
    const authFn = this.isLoginMode
      ? this.auth.login(this.authForm.value.email!, this.authForm.value.password!)
      : this.auth.signUp(this.authForm.value.email!, this.authForm.value.password!);

    authFn.subscribe({
      next: (res: any) => {
        this.loading = false;
        if (res.error) {
          this.error = res.error.message;
        } else {
          this.router.navigateByUrl('/');
        }
      },
      error: (err: any) => {
        this.loading = false;
        this.error = err.error_description || err.message || 'Unknown error';
      }
    });
  }
}

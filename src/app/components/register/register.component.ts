import { Component } from '@angular/core';
import { SharedMaterialModule } from '../../modules/shared-material.module';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../model/user.data.model';

@Component({
  selector: 'app-register',
  imports: [SharedMaterialModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  errorMessage = '';
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public router: Router,
    public authService: AuthService
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      username: ['', [Validators.required]],
      role: ['', Validators.required],
    });
  }

  register() {
    if (this.registerForm.invalid) return;

    const userform: User = {
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      username: this.registerForm.value.username,
      role: this.registerForm.value.role,
    };
    this.authService.register(userform).subscribe({
      next: () => this.router.navigate(['']),
      error: (err) => {
        this.errorMessage = err.error.message;
      },
    });
  }
}

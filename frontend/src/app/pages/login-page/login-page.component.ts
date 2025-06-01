import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, RouterModule } from "@angular/router";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-login-page",
  standalone: true,
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.css"],
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
})
export class LoginPageComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.login(email || '', password || '');
    } else {
      this.loginForm.markAllAsTouched(); // Show validation errors
      console.log('Form is invalid');
    }
  }

  login(email: string, password: string) {
    this.errorMessage = ''; // Clear any previous error messages
    this.isLoading = true; // Start loading
    
    this.authService.login(email, password)
      .subscribe({
        next: (response) => {
          console.log('Login response:', response); // Debug log
          
          // Check for accessToken instead of token (matching backend response)
          if (!response || !response.accessToken) {
            this.errorMessage = 'Invalid response from server';
            return;
          }
          
          // Store the tokens and user info
          localStorage.setItem('accessToken', response.accessToken);
          if (response.refreshToken) {
            localStorage.setItem('refreshToken', response.refreshToken);
          }
          if (response.role) {
            localStorage.setItem('role', response.role);
          }
          if (response.username) {
            localStorage.setItem('username', response.username);
          }
          if (response.acc_id) {
            localStorage.setItem('accountId', response.acc_id);
          }

          // Navigate to the appropriate route based on user role
          const defaultRoute = this.authService.getDefaultRoute();
          this.router.navigate([defaultRoute]);
        },
        error: (error) => {
          console.error('Login failed', error);
          if (error.status === 0) {
            this.errorMessage = 'Unable to connect to the server. Please make sure the backend is running.';
          } else if (error.status === 401) {
            this.errorMessage = 'Invalid email or password.';
          } else if (error.status === 404) {
            this.errorMessage = 'User not found.';
          } else {
            this.errorMessage = error.error?.message || 'An error occurred during login. Please try again.';
          }
        },
        complete: () => {
          this.isLoading = false; // Stop loading regardless of outcome
        }
      });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
}

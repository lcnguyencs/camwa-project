import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-login-page",
  standalone: true,
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.css"],
})
export class LoginPageComponent {
  email: string = "";
  password: string = "";

  constructor(private router: Router) {}

  onSubmit() {
    // TODO: Implement login logic here
    console.log("Login attempted with:", this.email, this.password);
    // After successful login, navigate to the appropriate page
    // this.router.navigate(['/dashboard']);
  }
}

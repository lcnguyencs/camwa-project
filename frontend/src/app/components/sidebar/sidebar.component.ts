import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { TokenService } from "../../services/token.service";
import { AuthService } from "../../services/auth.service";

interface User {
  roles: string[];
  email: string;
  username: string;
}

@Component({
  standalone: true,
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrl: "./sidebar.component.css",
  imports: [CommonModule, RouterModule],
})
export class SidebarComponent implements OnInit {
  loggedIn: boolean = true;
  user: User = {
    roles: [],
    email: '',
    username: ''
  };

  constructor(
    private tokenService: TokenService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const decodedToken = this.tokenService.getDecodedToken();
    if (decodedToken) {
      this.user = {
        roles: [decodedToken.role],
        email: decodedToken.email,
        username: decodedToken.username || 'User'
      };
    }
  }

  handleLogout() {
    const userId = this.tokenService.getDecodedToken()?.uid;
    if (userId) {
      this.authService.logout(userId).subscribe({
        next: () => {
          localStorage.removeItem('token');
          localStorage.removeItem('role');
          window.location.reload();
        }
      });
    }
  }
}

import { Component } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";

import { RouterModule, Router, NavigationEnd } from "@angular/router";

import { SidebarComponent } from "./components/sidebar/sidebar.component";

@Component({
  selector: "app-root",
  standalone: true,
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  imports: [SidebarComponent, RouterModule],
})
export class AppComponent {
  isLoginPage: boolean = false;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isLoginPage = event.url === "/login";
      }
    });
  }
}

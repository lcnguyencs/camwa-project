import { Component } from "@angular/core";

import { RouterModule, Router, NavigationEnd } from "@angular/router";

import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-root",
  standalone: true,
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  imports: [SidebarComponent, RouterModule, CommonModule],
})
export class AppComponent {
  showSidebar: boolean = true;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showSidebar = event.url !== "/login";
      }
    });
  }
}

import { Component } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";

import { RouterModule } from "@angular/router";

import { SidebarComponent } from "./components/sidebar/sidebar.component";

@Component({
  selector: "app-root",
  standalone: true,
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  imports: [SidebarComponent, RouterModule],
})
export class AppComponent {}

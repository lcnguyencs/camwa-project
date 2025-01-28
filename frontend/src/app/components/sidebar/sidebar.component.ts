import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
@Component({
  standalone: true,
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrl: "./sidebar.component.css",
  imports: [CommonModule, RouterModule],
})
export class SidebarComponent {
  loggedIn: boolean = true;
}

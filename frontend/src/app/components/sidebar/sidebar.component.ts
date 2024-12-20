import { Component } from "@angular/core";

@Component({
  standalone: true,
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrl: "./sidebar.component.css",
})
export class SidebarComponent {
  loggedIn: boolean = false; // Set to `true` when the user is logged in
  username: string = "Ngoc Tran Hong"; // Change dynamically when logged in
}

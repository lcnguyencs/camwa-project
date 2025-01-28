import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import "bootstrap";

type TabType = "classSchedule" | "classMembers" | "moduleReport";
@Component({
  selector: "profile-page",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./profile-page.component.html",
  styleUrl: "./profile-page.component.css",
})
export class ProfilePageComponent {
  activeTab: TabType = "classSchedule"; // Default active tab

  showInviteModal: boolean = false;
  showRemoveModal: boolean = false;

  // ... other existing code ...
}

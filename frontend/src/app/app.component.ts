import { Component } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";

import { RouterModule } from "@angular/router";

import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { LecturerModuleViewComponent } from "./pages/lecturer-module-view/lecturer-module-view.component";
import { LecturerClassViewComponent } from "./pages/lecturer-class-view/lecturer-class-view.component";
import { FacultyAssistantModuleViewComponent } from "./pages/faculty-assistant-module-view/faculty-assistant-module-view.component";

@Component({
  selector: "app-root",
  standalone: true,
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  imports: [
    SidebarComponent,
    // LecturerModuleViewComponent,
    // LecturerClassViewComponent,
    // FacultyAssistantModuleViewComponent,
    RouterModule,
  ],
})
export class AppComponent {}

import { Routes } from "@angular/router";
import { SidebarComponent } from "./app/components/sidebar/sidebar.component";
import { LecturerModuleViewComponent } from "./app/pages/lecturer-module-view/lecturer-module-view.component";
import { LecturerClassViewComponent } from "./app/pages/lecturer-class-view/lecturer-class-view.component";
import { FacultyAssistantModuleViewComponent } from "./app/pages/faculty-assistant-module-view/faculty-assistant-module-view.component";

const routeConfig: Routes = [
  {
    path: "",
    component: SidebarComponent,
    title: "Sidebar",
  },
  {
    path: "lecturer",
    component: LecturerModuleViewComponent,
    title: "Lecturer Module View",
  },

  {
    path: "faculty-assistant",
    component: FacultyAssistantModuleViewComponent,
    title: "Faculty Module View",
  },
];

export default routeConfig;

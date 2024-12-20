import { from } from "rxjs";
import { Routes } from "@angular/router";
import { SidebarAdminComponent } from "./app/components/sidebar-admin/sidebar-admin.component";
import { SidebarComponent } from "./app/components/sidebar/sidebar.component";
import { LecturerModuleViewComponent } from "./app/pages/lecturer-module-view/lecturer-module-view.component";
import { LecturerClassViewComponent } from "./app/pages/lecturer-class-view/lecturer-class-view.component";
import { FacultyAssistantModuleViewComponent } from "./app/pages/faculty-assistant-module-view/faculty-assistant-module-view.component";
import { FacultyAssistantClassViewComponent } from "./app/pages/faculty-assistant-class-view/faculty-assistant-class-view.component";

import { LoginPageComponent } from "./app/pages/login-page/login-page.component";
import { ClassDetailsViewComponent } from "./app/pages/class-details-view/class-details-view.component";
import { RequestAdminComponent } from "./app/pages/request-admin/request-admin.component";
import { AccountAdminComponent } from "./app/pages/account-admin/account-admin.component";
import { AccountDetailAdminComponent } from "./app/pages/account-admin/account-detail-admin/account-detail-admin.component";
import { ModuleAdminComponent } from "./app/pages/module-admin/module-admin.component";
import { ModuleDetailAdminComponent } from "./app/pages/module-admin/module-detail-admin/module-detail-admin.component";
import { ModuleStudentComponent } from "./app/pages/module-student/module-student.component";
import { ModuleDetailStudentComponent } from "./app/pages/module-student/module-detail-student/module-detail-student.component";



const routeConfig: Routes = [
  {
    path: "login",
    component: LoginPageComponent,
    title: "Login",
  },
  {
    path: "lecturer-module-view",
    component: LecturerModuleViewComponent,
    title: "Lecturer Module View",
  },
  {
    path: "lecturer-class-view",
    component: LecturerClassViewComponent,
    title: "Lecturer Class View",
  },

  {
    path: "faculty-assistant-class-view",
    component: FacultyAssistantClassViewComponent,
    title: "Faculty Assistant Class View",
  },
  {
    path: "faculty-assistant-module-view",
    component: FacultyAssistantModuleViewComponent,
    title: "Faculty Assistant Module View",
  },
  
];

export default routeConfig;

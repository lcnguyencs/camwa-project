// src/app/app-routing.module.ts
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FacultyAssistantModuleViewComponent } from "./pages/faculty-assistant-module-view/faculty-assistant-module-view.component";
import { LecturerModuleViewComponent } from "./pages/lecturer-module-view/lecturer-module-view.component";

const routes: Routes = [
  {
    path: "faculty-assistant",
    component: FacultyAssistantModuleViewComponent,
  },
  { path: "lecturer", component: LecturerModuleViewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

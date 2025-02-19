import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";


const routes: Routes = [
  // {
  //   path: "faculty-assistant",
  //   component: FacultyAssistantModuleViewComponent,
  // },
  // { path: "lecturer", component: LecturerModuleViewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

//We dont use this one

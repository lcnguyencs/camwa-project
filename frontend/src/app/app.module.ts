import { NgModule, ModuleWithProviders } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { CommonModule } from "@angular/common";
import { HttpClient } from "@angular/common/http";

import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireAnalyticsModule } from "@angular/fire/compat/analytics";
import { environment } from "../environments/environment";

import { ActionTableComponent } from "./components/action-table/action-table.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { LecturerModuleViewComponent } from "./pages/lecturer-module-view/lecturer-module-view.component";
import { FacultyAssistantModuleViewComponent } from "./pages/faculty-assistant-module-view/faculty-assistant-module-view.component";

import { LoginPageComponent } from "./pages/login-page/login-page.component";

@NgModule({
  declarations: [
    AppComponent,
    // ActionTableComponent,
    // SidebarComponent,
    // LecturerModuleViewComponent,
    // FacultyAssistantModuleViewComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClient,
    ActionTableComponent,
    SidebarComponent,
    LecturerModuleViewComponent,
    FacultyAssistantModuleViewComponent,
    AngularFireModule.initializeApp(
      environment.firebaseConfig
    ) as ModuleWithProviders<any>,
    AngularFireAnalyticsModule,
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}

import { NgModule, ModuleWithProviders } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";

import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireAnalyticsModule } from "@angular/fire/compat/analytics";
import { environment } from "../environments/environment";
import { CommonModule } from "@angular/common";
import { AppRoutingModule } from "./app-routing.module"; // Import your routing module

import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { LecturerModuleViewComponent } from "./pages/lecturer-module-view/lecturer-module-view.component";
import { FacultyAssistantModuleViewComponent } from "./pages/faculty-assistant-module-view/faculty-assistant-module-view.component";
import { LoginPageComponent } from "./pages/login-page/login-page.component";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    SidebarComponent,
    // LecturerModuleViewComponent,
    // FacultyAssistantModuleViewComponent,
    // LoginPageComponent,
    AngularFireModule.initializeApp(
      environment.firebaseConfig
    ) as ModuleWithProviders<any>,
    AngularFireAnalyticsModule,
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}

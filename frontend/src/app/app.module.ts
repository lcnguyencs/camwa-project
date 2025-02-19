import { NgModule, ModuleWithProviders } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { CommonModule } from "@angular/common";
import { HttpClient, provideHttpClient } from "@angular/common/http";

import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireAnalyticsModule } from "@angular/fire/compat/analytics";
import { environment } from "../environments/environment";

import { ActionTableComponent } from "./components/action-table/action-table.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";

@NgModule({
  providers: [
    provideHttpClient(),
  ],
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
    AngularFireModule.initializeApp(
      environment.firebaseConfig
    ) as ModuleWithProviders<any>,
    AngularFireAnalyticsModule,
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}

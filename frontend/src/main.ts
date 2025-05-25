import { bootstrapApplication } from "@angular/platform-browser";
import { AppComponent } from "./app/app.component";
import { provideRouter } from "@angular/router";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { AuthInterceptor } from "./app/interceptors/auth.interceptor";
import routeConfig from "./routes";

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routeConfig),
    provideHttpClient(withInterceptors([AuthInterceptor]))
  ],
}).catch((err) => console.error(err));

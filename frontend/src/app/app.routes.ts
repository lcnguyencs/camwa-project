import { Routes } from '@angular/router';
import { ModuleDetailModifyComponent } from './pages/module-detail-modify/module-detail-modify.component';
import { ModuleDetailCreateComponent } from './pages/module-detail-create/module-detail-create.component';
import { ModuleViewAdminComponent } from './pages/module-view-admin/module-view-admin.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { AuthRoute } from './services/auth.route.service';
import { ModuleDetailComponent } from './pages/module-detail/module-detail.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },
  { path: 'module-view-admin', component: ModuleViewAdminComponent, canActivate: [AuthRoute] },
  { path: 'module-detail-create', component: ModuleDetailCreateComponent, canActivate: [AuthRoute] },
  { path: 'module-detail-view/:id', component: ModuleDetailComponent, canActivate: [AuthRoute] },
  { path: 'module-detail-modify/:id', component: ModuleDetailModifyComponent, canActivate: [AuthRoute] }
]; 
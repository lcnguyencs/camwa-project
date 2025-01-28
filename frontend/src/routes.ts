import { Routes } from "@angular/router";

import { LoginPageComponent } from "./app/pages/login-page/login-page.component";
import { ProfilePageComponent } from "./app/pages/profile-page/profile-page.component";
import { ModuleViewAdminComponent } from "./app/pages/module-view-admin/module-view-admin.component";
import { ModuleDetailCreateAdminComponent } from "./app/pages/module-view-admin/module-detail-create-admin/module-detail-create-admin.component";
import { ModuleDetailModifyAdminComponent } from "./app/pages/module-view-admin/module-detail-modify-admin/module-detail-modify-admin.component";
import { ModuleDetailComponent } from "./app/pages/module-view-admin/module-detail/module-detail.component";
import { RequestViewAdminComponent } from "./app/pages/request-view-admin/request-view-admin.component";
import { RequestDetailAdminComponent } from "./app/pages/request-view-admin/request-detail-admin/request-detail-admin.component";
import { AccountViewAdminComponent } from "./app/pages/account-view-admin/account-view-admin.component";
import { AccountDetailCreateAdminComponent } from "./app/pages/account-view-admin/account-detail-create-admin/account-detail-create-admin.component";
import { AccountDetailModifyAdminComponent } from "./app/pages/account-view-admin/account-detail-modify-admin/account-detail-modify-admin.component";

const routeConfig: Routes = [
  {
    path: "login",
    component: LoginPageComponent,
    title: "Login",
  },
  {
    path: "profile",
    component: ProfilePageComponent,
    title: "Profile",
  },
  
  {
    path: "module-view-admin",
    component: ModuleViewAdminComponent,
    title: "Admin Module View",
  },
  {
    path: "module-view-admin/module-detail-create-admin",
    component: ModuleDetailCreateAdminComponent,
    title: "Admin Module Detail Create View",
  },
  {
    path: "module-view-admin/module-detail-modify-admin",
    component: ModuleDetailModifyAdminComponent,
    title: "Admin Module Detail Modify View",
  },
  {
    path: "module-view-admin/module-detail-view",
    component: ModuleDetailComponent,
    title: "Module Detail View",
  },

  {
    path: "request-view-admin",
    component: RequestViewAdminComponent,
    title: "Request View",
  },
  {
    path: "request-view-admin/request-detail-admin",
    component: RequestDetailAdminComponent,
    title: "Request Detail",
  },

  {
    path: "account-view-admin",
    component: AccountViewAdminComponent,
    title: "Accounts View",
  },
  {
    path: "account-view-admin/account-detail-create-admin",
    component: AccountDetailCreateAdminComponent,
    title: "Admin Account Detail Create View",
  },
  {
    path: "account-view-admin/account-detail-modify-admin",
    component: AccountDetailModifyAdminComponent,
    title: "Admin Account Detail Modify View",
  },
];

export default routeConfig;

import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { AuthComponent } from "./auth.component";
import { LoginComponent } from "./login/login.component";
import { LogoutComponent } from "./login/logout.component";

const routes: Routes = [{
  path: '',
  component: AuthComponent,
  data: { pageTitle: 'Auth Component' },
  children: [
    {
      path: '', redirectTo: 'auth', pathMatch: 'full'
    },
    {
      path: 'auth',
      component: LoginComponent,
      data: { pageTitle: 'Login form' }
    },
    {
      path: 'logout',
      component: LogoutComponent,
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class AuthRoutingModule { }

import { NgModule } from "@angular/core";
import { AuthRoutingModule } from "./auth.routing";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { AuthComponent } from "./auth.component";
import { LoginComponent } from "./login/login.component";
import { LogoutComponent } from "./login/logout.component";

@NgModule({
  imports: [
    AuthRoutingModule,
    CommonModule,
    FormsModule
  ],
  declarations: [AuthComponent, LoginComponent, LogoutComponent],
  providers: [],
})
export class AuthModule {

}

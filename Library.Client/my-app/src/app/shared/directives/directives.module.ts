import { NgModule, OnInit } from "@angular/core";
import { CheckPrivilegesDirective } from "./checkPriviliges";
import { AuthService } from "../../core/services/auth.service";
import { BlurForwarderDirective } from "./blur-forwarder";

@NgModule({
  declarations: [CheckPrivilegesDirective, BlurForwarderDirective],
  exports: [CheckPrivilegesDirective, BlurForwarderDirective],
})
export class DirectiveModule  {

}

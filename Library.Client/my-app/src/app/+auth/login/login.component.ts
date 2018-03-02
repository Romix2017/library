import { OnInit, Component } from "@angular/core";
import { Credentials } from "../../core/models/credentials";
import { AuthService } from "../../core/services/auth.service";
import { IAuthService } from "../../core/interfaces/interface.auth.service";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";



@Component({
  selector: 'login-widget',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

  authModel: Credentials = new Credentials();
  isShowError: boolean = false;
  errorText: string = "";
  private _authService: AuthService;
  constructor(authService: AuthService, private router: Router) {
    this._authService = authService;
  }



  ngOnInit() {
  }


  clickAction() {

    this.isShowError = false;
    this.errorText = "";

  }

  onSubmit(form: NgForm) {

    this._authService.login(this.authModel)
      .subscribe(res => {
        this._authService.setToken(res.access_token)
        this.router.navigateByUrl('dashboard');
      }, err => {
        this.errorText = err.error_description;
        this.isShowError = true;
      })
  }
}

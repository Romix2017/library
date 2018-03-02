
import { Observable } from 'rxjs/Observable';
import { SERVER } from '../settings/settings';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Credentials } from '../models/credentials';
import { JwtHelper } from 'angular2-jwt';
import { Router } from '@angular/router';
import { Auth } from '../models/auth';
//import { Http, URLSearchParams, Headers, RequestOptionsArgs } from '@angular/http'
interface AuthErrorData {
  error: string
  error_description: string
}

const errorInvalidGrant = "invalid_grant"
const API = "connect/token"
const localStorageTokenKey = 'access_token'
@Injectable()
export class AuthService  {


  jwtHelper: JwtHelper = new JwtHelper();

  constructor(private http: HttpClient, private router: Router) {

   
  }

  private showLoginForm() {
    this.router.navigateByUrl('auth');
  }

  //private isToken(data: JWT | AuthErrorData): data is JWT {
  //  return !!(<JWT>data).access_token
  //}

  public login(authCredentials: Credentials): Observable<any> {

    //var headers = new HttpHeaders();
    //headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let requestBody: HttpParams = this.createUrlParams(authCredentials.userName, authCredentials.password);

    console.log(requestBody);

    return this.http.post(SERVER + API, requestBody);//.map(res => res.json());

  }

  createUrlParams(username: string, password: string): HttpParams {
    let params = new HttpParams()
    .append('client_id', 'web_dashboard')
    .append('grant_type', 'password')
    .append('username', '' + username)
    .append('password', '' + password);
    return params;
  }


  public logout() {
    this.resetToken();
  }

  public ensureLoggedIn() {
    return this.isValidTokenPresent() ?
      this.showViewState() :
      this.showLoginForm()
  }





  private showViewState() {
    this.router.navigateByUrl("dashboard");
  }



  public isValidTokenPresent(): boolean {
    const token = this.getToken();
    return !!token && !this.jwtHelper.isTokenExpired(token)
  }

  public setToken(token: string) {
    localStorage.setItem(localStorageTokenKey, token)
  }

  public resetToken() {
    localStorage.removeItem(localStorageTokenKey)
  }

  public getToken() {
    return localStorage.getItem(localStorageTokenKey)
  }

  getAuth(): Auth {
    const token = this.jwtHelper.decodeToken(this.getToken())
    const privileges = token['privileges']
    return {
      username: token['userName'],
      privileges: Array.isArray(privileges) ? privileges : [privileges]
    }
  }
}

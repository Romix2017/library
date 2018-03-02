import { Observable } from "rxjs/Observable";
import { Auth } from "../models/auth";

export interface IAuthService {
  login(username: string, password: string): Observable<string>
  logout()
  ensureLoggedIn(): Observable<any>
  getAuth(): Auth
}

import { Injectable } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public auth: AuthService, private router: Router) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token: string = this.auth.getToken();
    if (token != null) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.auth.getToken()}`
        }
      });
    }

    return next.handle(request).do((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        // do stuff with response if you want
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {

          this.router.navigateByUrl('auth');

          // redirect to the login route
          // or show a modal
        }
      }
    });
  }
}

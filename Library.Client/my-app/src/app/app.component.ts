import { Component, ViewContainerRef } from '@angular/core';
import '../styles.css';
import { AuthService } from './core/services/auth.service';
@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent {
  public title = 'app works!';

  public constructor(private viewContainerRef: ViewContainerRef, private authService: AuthService) {
    authService.ensureLoggedIn()
  }

}

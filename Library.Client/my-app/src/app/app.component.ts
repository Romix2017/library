import { Component, ViewContainerRef } from '@angular/core';
import '../styles.css';
@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent {
  public title = 'app works!';

  public constructor(private viewContainerRef: ViewContainerRef) { }

}

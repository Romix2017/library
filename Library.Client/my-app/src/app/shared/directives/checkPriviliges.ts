import { Directive, ElementRef, Renderer, OnInit, Input } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

@Directive({
  selector: "[checkPrivileges]"
})
export class CheckPrivilegesDirective implements OnInit {

  @Input('checkPrivileges') privileges: string[] = [];


  private _authService: AuthService;
  constructor(private el: ElementRef, private renderer: Renderer, authService: AuthService) {
    this._authService = authService;
  }

  ngOnInit() {

    let hasPrivileges: boolean = this._authService.getAuth()
        .privileges.some(p => this.privileges.some(r => p == r))

    if (!hasPrivileges) {
      this.renderer.setElementStyle(this.el.nativeElement, 'display', 'none');
    }
  }
}

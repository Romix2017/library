import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'lb-header',
  templateUrl: './header.component.html',
  styles: [require('./header.component.css').toString()],
})
export class HeaderComponent implements OnInit {
  collapse: boolean = true;
  constructor(public authService: AuthService) { }

  ngOnInit() { }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lb-header',
  templateUrl: './header.component.html',
  styles: [require('./header.component.css').toString()],
})
export class HeaderComponent implements OnInit {
  collapse: boolean = true;
  constructor() { }

  ngOnInit() { }

}

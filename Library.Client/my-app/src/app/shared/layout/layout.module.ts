import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { MainLayoutComponent } from './app-layouts/main-layout.component';
import { RouterModule } from "@angular/router";
import { FooterComponent } from "./footer/footer.component";
import { HeaderComponent } from "./header/header.component";
import { LeftMenuComponent } from "./left-menu/left-menu.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
  ],
  declarations: [
    MainLayoutComponent,
    FooterComponent,
    HeaderComponent,
    LeftMenuComponent
  ],
  exports: [
  ]
})
export class LibraryLayoutModule {

}

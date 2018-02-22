import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { routing } from './app.routing'
import { AppComponent } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppState, InternalStateType } from './app.service';
import { ModalModule } from 'ngx-bootstrap/modal';
import { LibraryLayoutModule } from './shared/layout/layout.module';
import { CoreModule } from './core/core.module';
import { CommonModule } from '@angular/common';


// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AppState
];




@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ModalModule.forRoot(),
    LibraryLayoutModule,
    CoreModule,
    routing
  ],
  exports: [
  
  ],
  providers: [APP_PROVIDERS ]
})
export class AppModule {
  constructor(public appRef: ApplicationRef, public appState: AppState) { }
}



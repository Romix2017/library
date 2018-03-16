import { NgModule } from '@angular/core';
import { BookService } from './services/book.service';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { AppStore } from './store/store';
import { GenreService } from './services/genre.service';
import { Repository } from './repository/repository';
import { httpFactory } from '@angular/http/src/http_module';
import { BookHistoryService } from './services/book-history.service';
import { AuthService } from './services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { providers } from './settings/settings';
import { UserService } from './services/user.service';
import { DateTimeFormatPipe } from './pipe/time.pipe';

@NgModule({
  imports: [HttpModule, HttpClientModule],
  providers: [BookService, AppStore, GenreService, BookHistoryService, UserService, AuthService, ...providers],
})
export class CoreModule {

}

import { NgModule } from '@angular/core';
import { BookService } from './services/book.service';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { AppStore } from './store/store';
import { GenreService } from './services/genre.service';
import { Repository } from './repository/repository';
import { httpFactory } from '@angular/http/src/http_module';

@NgModule({
  imports: [HttpModule],
  declarations: [],
  providers: [BookService, AppStore, GenreService, ],
})
export class CoreModule {

}

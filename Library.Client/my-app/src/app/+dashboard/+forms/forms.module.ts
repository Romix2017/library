import { NgModule } from '@angular/core';

import { BookComponent } from "../+forms/Book/book.component";
import { FormsRoutingModule } from './forms.routing';
import { FormsComponent } from './forms.component';
import { CommonModule } from '@angular/common';
import { BookEditComponent } from './Book/book-edit.component';
import { FormsModule } from '@angular/forms';
import { BookFormComponent } from './Book/book-form.component';
import { GenreFormComponent } from './Genre/genre-form.component';
import { GenreComponent } from './Genre/genre.component';
import { GenreEditComponent } from './Genre/genre-edit.component';
import { BookHistoryComponent } from './BookHistory/book-history.component';
import { BookHistoryEditComponent } from './BookHistory/book-history-edit.component';
import { BookHistoryFormComponent } from './BookHistory/book-history-form.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    FormsRoutingModule,
    CommonModule,
    FormsModule,
    NgbModule
  ],
  declarations: [
    BookComponent,
    FormsComponent,
    BookEditComponent,
    BookFormComponent,
    GenreFormComponent,
    GenreComponent,
    GenreEditComponent,
    BookHistoryComponent,
    BookHistoryEditComponent,
    BookHistoryFormComponent
  ],
  providers: [],
})
export class LocalFormsModule {

}

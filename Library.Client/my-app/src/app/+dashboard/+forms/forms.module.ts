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

@NgModule({
  imports: [
    FormsRoutingModule,
    CommonModule,
    FormsModule,
  ],
  declarations: [
    BookComponent,
    FormsComponent,
    BookEditComponent,
    BookFormComponent,
    GenreFormComponent,
    GenreComponent,
    GenreEditComponent
  ],
  providers: [],
})
export class LocalFormsModule {

}

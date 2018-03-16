import { NgModule } from '@angular/core';

import { BookComponent } from "../+forms/Book/book.component";
import { FormsRoutingModule } from './forms.routing';
import { FormsComponent } from './forms.component';
import { CommonModule } from '@angular/common';
import { BookEditComponent } from './Book/book-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookFormComponent } from './Book/book-form.component';
import { GenreFormComponent } from './Genre/genre-form.component';
import { GenreComponent } from './Genre/genre.component';
import { GenreEditComponent } from './Genre/genre-edit.component';
import { BookHistoryComponent } from './BookHistory/book-history.component';
import { BookHistoryEditComponent } from './BookHistory/book-history-edit.component';
import { BookHistoryFormComponent } from './BookHistory/book-history-form.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CoreModule } from '../../core/core.module';
import { DirectiveModule } from '../../shared/directives/directives.module';

import { MatAutocompleteModule, MatButtonModule, MatMenuModule, MatToolbarModule, MatIconModule, MatCardModule, MatSidenavModule, MatFormFieldModule, MatInputModule, MatTooltipModule, MatSliderModule } from '@angular/material'
import { FinderComponent } from './Finder/finder.component';
import { UserFormComponent } from './User/user-form.component';
import { UserEditComponent } from './User/user-edit.component';
import { UserComponent } from './User/user.component';
import { DateTimeFormatPipe } from '../../core/pipe/time.pipe';
import { DateFormatPipe } from '../../core/pipe/date.pipe';

@NgModule({
  imports: [
    FormsRoutingModule,
    CommonModule,
    FormsModule,
    NgbModule,
    DirectiveModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
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
    BookHistoryFormComponent,
    FinderComponent,
    UserFormComponent,
    UserEditComponent,
    UserComponent,
    DateFormatPipe
  ],
  providers: [],
})
export class LocalFormsModule {

}

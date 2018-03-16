import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsComponent } from "./forms.component";
import { BookFormComponent } from './Book/book-form.component';
import { GenreFormComponent } from './Genre/genre-form.component';
import { BookHistoryFormComponent } from './BookHistory/book-history-form.component';
import { UserFormComponent } from './User/user-form.component';

const routes: Routes = [{
  path: '',
  component: FormsComponent,
  data: { pageTitle: 'Forms Component' },
  children: [
    {
      path: '', redirectTo: 'books', pathMatch: 'full'
    },
    {
      path: 'genres',
      component: GenreFormComponent,
      data: { pageTitle: 'Genres form' }
    },
    {
      path: 'books',
      component: BookFormComponent,
      data: { pageTitle: 'Books form' }
    },
    {
      path: 'books-history',
      component: BookHistoryFormComponent,
      data: { pageTitle: 'Books History form' }
    },
    {
      path: 'users',
      component: UserFormComponent,
      data: { pageTitle: 'Users form' }
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class FormsRoutingModule { }

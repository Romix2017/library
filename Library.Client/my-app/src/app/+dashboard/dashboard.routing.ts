import { ModuleWithProviders } from "@angular/core"
import { Routes, RouterModule } from '@angular/router';
import { BookFormComponent } from "./+forms/Book/book-form.component";
import { FormsComponent } from "./+forms/forms.component";


export const routes: Routes = [
  {
    path: '', redirectTo: 'forms', pathMatch: 'full'
  },
  {
    path: 'forms',
    loadChildren: './+forms/forms.module#LocalFormsModule',
  }
];

export const routing = RouterModule.forChild(routes);

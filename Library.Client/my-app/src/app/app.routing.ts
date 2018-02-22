import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from "./shared/layout/app-layouts/main-layout.component";
import { ModuleWithProviders } from "@angular/core";

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    data: { pageTitle: 'Home' },
    children: [
      {
        path: '', redirectTo: 'dashboard', pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: './+dashboard/dashboard.module#DashboardModule',
        data: { pageTitle: 'Dashboard' }
      },
    ]
  },
  
  { path: '**', redirectTo: 'miscellaneous/error404' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, { useHash: true });

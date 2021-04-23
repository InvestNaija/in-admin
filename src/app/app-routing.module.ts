import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./inl-website/inl-website.module').then(m => m.InlWebsiteModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./inl-dashboard/inl-dashboard.module').then(m => m.InlDashboardModule)
  }
  // { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

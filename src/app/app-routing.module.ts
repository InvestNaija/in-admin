import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './_shared/components/page-not-found/page-not-found.component';
import { AuthGuard } from './_shared/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./inl-website/inl-website.module').then(m => m.InlWebsiteModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./inl-dashboard/inl-dashboard.module').then(m => m.InlDashboardModule),
    // canActivate: [AuthGuard]
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

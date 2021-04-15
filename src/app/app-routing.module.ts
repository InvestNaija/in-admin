import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'courses',
    loadChildren: () => import('./courses/courses.module').then(m => m.CoursesModule),
    // canActivate: [AuthGuard]
  },
  {
    path: 'certificates',
    loadChildren: () => import('./certificates/certificates.module').then(m => m.CertificatesModule),
    // canActivate: [AuthGuard]
  },
  {
    path: 'leaderboard',
    loadChildren: () => import('./leaderboard/leaderboard.module').then(m => m.LeaderboardModule),
    // canActivate: [AuthGuard]
  },
  {
    path: 'messages',
    loadChildren: () => import('./messages/messages.module').then(m => m.MessagesModule),
    // canActivate: [AuthGuard]
  },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  // { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InlDashboardComponent } from './inl-dashboard.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: InlDashboardComponent,
    children: [
      {
        path: 'index',
        component: DashboardComponent
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
      {
        path: 'user',
        loadChildren: () => import('./user/user.module').then(m => m.UserModule)
      },
      { path: '', redirectTo: 'index', pathMatch: 'full' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InlDashboardRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InlDashboardComponent } from './inl-dashboard.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { AuthGuard } from '../_shared/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: InlDashboardComponent,
    // canActivateChild: [AuthGuard],
    children: [
      {
        path: 'index',
        component: DashboardComponent
      },
      {
        path: 'customers',
        loadChildren: () => import('./customers/customers.module').then(m => m.CustomersModule),
      },
      {
        path: 'transactions',
        loadChildren: () => import('./transactions/transactions.module').then(m => m.TransactionsModule),
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

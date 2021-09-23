import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AdminUserDetailComponent } from './admin-detail/admin-detail.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {path: 'list',component: AdminUsersComponent},
      {path: 'detail/:id',component: AdminUserDetailComponent,},
      {path: 'detail',component: AdminUserDetailComponent,},
      { path: '', redirectTo: '/dashboard/admin-users/list', pathMatch: 'full'}
    ]
  },

  { path: '', redirectTo: '/list', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminUsersRoutingComponent { }

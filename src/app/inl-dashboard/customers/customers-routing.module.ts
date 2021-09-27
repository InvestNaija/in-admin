import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CustomersComponent } from './customers/customers.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {path: 'list',component: CustomersComponent},
      {path: 'detail',component: CustomerDetailComponent,},
      {path: 'detail/:id',component: CustomerDetailComponent,},
      {path: 'detail/:id/:page',component: CustomerDetailComponent,},
      { path: '', redirectTo: '/dashboard/customers/list', pathMatch: 'full'}
    ]
  },

  { path: '', redirectTo: '/list', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingComponent { }

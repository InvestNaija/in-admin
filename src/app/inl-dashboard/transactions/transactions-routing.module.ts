import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TransactionsComponent } from './transactions/transactions.component';
import { MakePaymentComponent } from './make-payment/make-payment.component';

const routes: Routes = [
  {
    path: '',
    component: TransactionsComponent,
  },
  {
    path: ':txnId/:assetId/make-payment',
    component: MakePaymentComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionsRoutingComponent { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgSelectModule } from '@ng-select/ng-select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SharedModule } from '@app/_shared/shared.module';
import { TransactionsModule } from '../transactions/transactions.module';

import { BankingDetailsComponent } from './banking-details/banking-details.component';
import { CustomersRoutingComponent } from './customers-routing.module';
import { CustomersComponent } from './customers/customers.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { CustomerDocumentsComponent } from './customer-documents/customer-documents.component';

@NgModule({
  declarations: [
    CustomersComponent,CustomerDetailComponent,
    CustomerDocumentsComponent,
    BankingDetailsComponent
  ],
  imports: [
    CommonModule,
    CustomersRoutingComponent,

    SharedModule,
    NgSelectModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatMenuModule,
    MatDividerModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,

    TransactionsModule
  ]
})
export class CustomersModule { }

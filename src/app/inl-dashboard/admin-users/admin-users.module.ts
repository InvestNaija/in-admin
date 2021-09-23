import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminUsersRoutingComponent } from './admin-users-routing.module';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AdminUserDetailComponent } from './admin-detail/admin-detail.component';


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

@NgModule({
  declarations: [
    AdminUsersComponent,AdminUserDetailComponent
  ],
  imports: [
    CommonModule,
    AdminUsersRoutingComponent,

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
export class AdminUsersModule { }

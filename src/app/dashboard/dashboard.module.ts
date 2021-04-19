import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';

import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { DashboardSidebarListsComponent } from './dashboard-sidebar-lists/dashboard-sidebar-lists.component';


@NgModule({
  declarations: [
    DashboardComponent,
    DashboardSidebarListsComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule
  ]
})
export class DashboardModule { }

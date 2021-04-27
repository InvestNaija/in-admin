import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { ProfileComponent } from './profile/profile.component';
import { PasswordComponent } from './password/password.component';
import { SocialsComponent } from './socials/socials.component';
import { DocumentsComponent } from './documents/documents.component';
import { BankingDetailsComponent } from './banking-details/banking-details.component';
import { NotificationsComponent } from './notifications/notifications.component';

import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    UserComponent,
    ProfileComponent,
    PasswordComponent,
    SocialsComponent,
    DocumentsComponent,
    BankingDetailsComponent,
    NotificationsComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,

    MatButtonModule,
    MatListModule,
    MatIconModule
  ]
})
export class UserModule { }

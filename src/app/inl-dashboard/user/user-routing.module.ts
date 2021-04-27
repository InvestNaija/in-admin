import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BankingDetailsComponent } from './banking-details/banking-details.component';
import { DocumentsComponent } from './documents/documents.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { PasswordComponent } from './password/password.component';
import { ProfileComponent } from './profile/profile.component';
import { SocialsComponent } from './socials/socials.component';
import { UserComponent } from './user.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'password',
        component: PasswordComponent
      },
      {
        path: 'socials',
        component: SocialsComponent
      },
      {
        path: 'documents',
        component: DocumentsComponent
      },
      {
        path: 'bank-details',
        component: BankingDetailsComponent
      },
      {
        path: 'notifications',
        component: NotificationsComponent
      },
      { path: '', redirectTo: 'profile', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }

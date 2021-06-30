import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentsComponent } from './documents/documents.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { PasswordComponent } from './password/password.component';
import { ProfileComponent } from './profile/profile.component';
import { SocialsComponent } from './socials/socials.component';
import { UserComponent } from './user.component';

const routes: Routes = [
  {
    path: ':page', component: UserComponent,
  },
  {path: '', component: UserComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }

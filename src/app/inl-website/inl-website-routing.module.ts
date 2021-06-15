import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InlForgotPasswordComponent } from './forgot-password/inl-forgot-password.component';
// import { InlWebsiteComponent } from './inl-website.component';
import { InlLoginComponent } from './login/inl-login.component';

const routes: Routes = [
  { path: '', component: InlLoginComponent },
  { path: 'forgot-password', component: InlForgotPasswordComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InlWebsiteRoutingModule { }

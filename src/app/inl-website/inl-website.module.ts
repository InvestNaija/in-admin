import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InlWebsiteRoutingModule } from './inl-website-routing.module';
import { InlWebsiteComponent } from './inl-website.component';
import { SharedModule } from '../shared/shared.module';
import { InlLoginComponent } from './login/inl-login.component';
import { InlForgotPasswordComponent } from './forgot-password/inl-forgot-password.component';


@NgModule({
  declarations: [
    InlWebsiteComponent,
    InlLoginComponent,
    InlForgotPasswordComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    InlWebsiteRoutingModule
  ]
})
export class InlWebsiteModule { }

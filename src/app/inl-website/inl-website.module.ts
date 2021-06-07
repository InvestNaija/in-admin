import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InlWebsiteRoutingModule } from './inl-website-routing.module';
import { InlWebsiteComponent } from './inl-website.component';
import { SharedModule } from '../shared/shared.module';
import { InlLoginComponent } from './login/inl-login.component';


@NgModule({
  declarations: [
    InlWebsiteComponent,
    InlLoginComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    InlWebsiteRoutingModule
  ]
})
export class InlWebsiteModule { }

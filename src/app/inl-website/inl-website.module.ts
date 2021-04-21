import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InlWebsiteRoutingModule } from './inl-website-routing.module';
import { InlWebsiteComponent } from './inl-website.component';


@NgModule({
  declarations: [
    InlWebsiteComponent
  ],
  imports: [
    CommonModule,
    InlWebsiteRoutingModule
  ]
})
export class InlWebsiteModule { }

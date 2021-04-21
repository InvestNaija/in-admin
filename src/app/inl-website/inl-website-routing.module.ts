import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InlWebsiteComponent } from './inl-website.component';

const routes: Routes = [{ path: '', component: InlWebsiteComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InlWebsiteRoutingModule { }

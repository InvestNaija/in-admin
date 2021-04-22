import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { InlWebsiteComponent } from './inl-website.component';
import { InlLoginComponent } from './login/inl-login.component';

const routes: Routes = [{ path: '', component: InlLoginComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InlWebsiteRoutingModule { }

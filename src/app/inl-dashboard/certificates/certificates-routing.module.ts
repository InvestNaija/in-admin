import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BadgesComponent } from './badges/badges.component';
import { CertificatesComponent } from './certificates/certificates.component';

const routes: Routes = [
  {
    path: '',
    component: CertificatesComponent
  },
  {
    path: 'badges',
    component: BadgesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CertificatesRoutingModule { }

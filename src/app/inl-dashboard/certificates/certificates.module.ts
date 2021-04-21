import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CertificatesRoutingModule } from './certificates-routing.module';
import { CertificatesComponent } from './certificates/certificates.component';
import { BadgesComponent } from './badges/badges.component';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';


@NgModule({
  declarations: [
    CertificatesComponent,
    BadgesComponent
  ],
  imports: [
    CommonModule,
    CertificatesRoutingModule,

    MatIconModule,
    MatButtonModule,
    MatProgressBarModule
  ]
})
export class CertificatesModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { ToastrModule } from 'ngx-toastr';
import { MatIconModule } from '@angular/material/icon';
import { BackbuttonComponent } from './components/backbutton/backbutton.component';

@NgModule({
  declarations: [
    PageNotFoundComponent,
    BackbuttonComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    ToastrModule.forRoot(),
  ],
  exports: [ CommonModule, RouterModule,
    MatIconModule, BackbuttonComponent,
    ToastrModule, FormsModule, ReactiveFormsModule,
    NgSelectModule
  ]
})
export class SharedModule { }

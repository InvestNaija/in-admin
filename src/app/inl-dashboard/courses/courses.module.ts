import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './courses/courses.component';

import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';

import { PopularComponent } from './courses/popular/popular.component';
import { WishlistComponent } from './courses/wishlist/wishlist.component';
import { HistoryComponent } from './courses/history/history.component';

@NgModule({
  declarations: [
    CoursesComponent,
    PopularComponent,
    WishlistComponent,
    HistoryComponent
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,

    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatMenuModule
  ]
})
export class CoursesModule { }

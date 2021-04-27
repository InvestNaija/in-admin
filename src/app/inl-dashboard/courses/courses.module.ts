import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './courses/courses.component';
import { PopularComponent } from './courses/popular/popular.component';
import { WishlistComponent } from './courses/wishlist/wishlist.component';
import { HistoryComponent } from './courses/history/history.component';

import { CoursePageComponent } from './course-page/course-page.component';
import { AboutComponent } from './course-page/about/about.component';
import { ReviewsComponent } from './course-page/reviews/reviews.component';
import { ForumComponent } from './course-page/forum/forum.component';
import { ResourcesComponent } from './course-page/resources/resources.component';

import { InstructorComponent } from './instructor/instructor.component';

import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [
    CoursesComponent,
    PopularComponent,
    WishlistComponent,
    HistoryComponent,
    CoursePageComponent,
    AboutComponent,
    ReviewsComponent,
    ForumComponent,
    ResourcesComponent,
    InstructorComponent
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,

    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatMenuModule,
    MatDividerModule,
    MatListModule
  ]
})
export class CoursesModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursePageComponent } from './course-page/course-page.component';
import { CoursesComponent } from './courses/courses.component';
import { InstructorComponent } from './instructor/instructor.component';

const routes: Routes = [
  {
    path: '',
    component: CoursesComponent
  },
  {
    path: "instructor/:id",
    component: InstructorComponent
  },
  {
    path: 'page/:id',
    component: CoursePageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }

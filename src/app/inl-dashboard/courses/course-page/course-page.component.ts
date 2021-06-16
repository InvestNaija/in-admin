import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { ApiService } from 'src/app/shared/services/api.service';
import { ApplicationContextService } from 'src/app/shared/services/application-context.service';
import { ICourse } from '../../models/course.model';

@Component({
  selector: 'in-course-page',
  templateUrl: './course-page.component.html',
  styleUrls: ['./course-page.component.scss']
})
export class CoursePageComponent implements OnInit {

  course: ICourse;

  constructor(
    private aRoute: ActivatedRoute,
    private api: ApiService,
    private appContext: ApplicationContextService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.aRoute.paramMap.pipe(
      switchMap(params => {
          return this.fetchCourse(params.get('id'));
        }
      )
    ).subscribe(res => {
      this.course = res.data;
      console.log(this.course);
    });
  }

  fetchCourse(courseId: string): Observable<any> {
    return this.api.get(`/api/provider/course/${courseId}`)
  }

  onDeleteCourse() {
    this.api.get(`/api/provider/course/delete/${this.course.id}`)
      .subscribe(res => {
        this.router.navigateByUrl('/dashboard/courses');
      })
  }
}

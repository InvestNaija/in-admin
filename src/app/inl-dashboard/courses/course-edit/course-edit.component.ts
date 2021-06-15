import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { ApiService } from 'src/app/shared/services/api.service';
import { ApplicationContextService } from 'src/app/shared/services/application-context.service';

@Component({
  selector: 'in-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.scss']
})
export class CourseEditComponent implements OnInit {

  constructor(
    private aRoute: ActivatedRoute,
    private api: ApiService,
    private appContext: ApplicationContextService,) { }

  ngOnInit(): void {
    this.aRoute.paramMap.pipe(
      switchMap(params =>
        this.fetchCourse(params.get('id'))
      )
    ).subscribe(res => {
      console.log(res);
    });
  }

  fetchCourse(courseId: string): Observable<any> {
    return this.api.get(`/api/provider/courses/${courseId}`)
  }

}

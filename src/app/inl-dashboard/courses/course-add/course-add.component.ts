import { Component, OnInit } from '@angular/core';
import { ICourse } from '../../models/course.model';

@Component({
  selector: 'in-course-add',
  templateUrl: './course-add.component.html',
  styleUrls: ['./course-add.component.scss']
})
export class CourseAddComponent implements OnInit {

  course: ICourse;

  constructor() { }

  ngOnInit(): void {
  }

}

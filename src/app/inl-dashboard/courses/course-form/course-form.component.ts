import { Component, OnInit, AfterViewChecked, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, AbstractControl, FormControl } from '@angular/forms';

import { ApiService } from '../../../shared/services/api.service';
import { CommonService } from '../../../shared/services/common.service';
import { ICourse } from '../../models/course.model';

@Component({
  selector: 'in-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit, AfterViewChecked {
  @Input() course: ICourse
  myForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public api: ApiService,
    public commonService: CommonService) { }

  ngOnInit(): void {
    console.log(this.course);

    this.commonService.resetContainer();
    this.myForm = this.fb.group({
      title: [],
      level: [],
      status: [],
      course_fee: [],
      category: [],
      description: [],
      publish_date: [],
    });
    if (!this.course) {
      // New Course
    } else {
      // We are editing
      this.populate(this.course);
    }
  }

  populate(course: ICourse) {
    // const date = new Date(course.dob);
    this.myForm.patchValue({
      title: course.title,
      level: course.level,
      status: course.status,
      course_fee: course.course_fee,
      category: course.category,
      // publish_date: new NgbDate( date.getFullYear(), date.getMonth() + 1, date.getDate()),
      description: course.description
    });
  }

  ngAfterViewChecked() {
  }

  submit() {}

  getLOVs(endpoint: string, selectScope: string, options: any) {
    this.commonService.getLOVs(endpoint, selectScope, options)
  }
}

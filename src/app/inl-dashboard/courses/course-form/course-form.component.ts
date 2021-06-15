import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { ApiService } from '../../../shared/services/api.service';
import { CommonService } from '../../../shared/services/common.service';

@Component({
  selector: 'in-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit, AfterViewChecked {

  constructor(
    public api: ApiService,
    public commonService: CommonService) { }

  ngOnInit(): void {
    this.commonService.resetContainer();
  }

  ngAfterViewChecked() {
  }

  getLOVs(endpoint: string, selectScope: string, options: any) {
    this.commonService.getLOVs(endpoint, selectScope, options)
  }
}

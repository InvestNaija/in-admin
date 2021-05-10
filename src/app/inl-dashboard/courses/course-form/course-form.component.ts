import { Component, OnInit, AfterViewChecked } from '@angular/core';
import bsCustomFileInput from 'bs-custom-file-input'

@Component({
  selector: 'in-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit, AfterViewChecked {

  constructor() { }

  ngOnInit(): void {
    
  }

  ngAfterViewChecked() {
    //Copy in all the js code from the script.js. Typescript will complain but it works just fine
    // bsCustomFileInput.init()
  }

}

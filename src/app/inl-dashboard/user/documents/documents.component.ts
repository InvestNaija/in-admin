import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'in-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log('in-documents loaded')
  }

}

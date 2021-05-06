import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
  position: number;
  course: string;
  courseFee: number;
  category: string;
  scheduled: string;
  published: string;
  status: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, course: 'Kunle Coker', courseFee: 3925, category: 'Investment', scheduled: 'Jan. 20th,2020', published: 'Jan. 20th,2020', status: 'Unapproved' },
  { position: 2, course: 'Nengi Hampson', courseFee: 3243, category: 'Investment', scheduled: 'Jan. 20th,2020', published: 'Jan. 20th,2020', status: 'Unapproved' },
  { position: 3, course: 'Benson Idashosa', courseFee: 2945, category: 'Investment', scheduled: 'Jan. 20th,2020', published: 'Jan. 20th,2020', status: 'Unapproved' },
  { position: 4, course: 'Doja Kabiru', courseFee: 2546, category: 'Investment', scheduled: 'Jan. 20th,2020', published: 'Jan. 20th,2020', status: 'Unapproved' },
  { position: 5, course: 'Sylvester Ayodele', courseFee: 1982, category: 'Investment', scheduled: 'Jan. 20th,2020', published: 'Jan. 20th,2020', status: 'Unapproved' },
  { position: 6, course: 'Linda Pedro', courseFee: 847, category: 'Investment', scheduled: 'Jan. 20th,2020', published: 'Jan. 20th,2020', status: 'Unapproved' },
];
@Component({
  selector: 'in-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  displayedColumns: string[] = ['position', 'course', 'courseFee', 'category', 'scheduled', 'published', 'status', 'action'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
}

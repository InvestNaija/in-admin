import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
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
  { position: 3, course: 'Benson Idashosa', courseFee: 2945, category: 'Investment', scheduled: 'Jan. 20th,2020', published: 'Jan. 20th,2020', status: 'Approved' },
  { position: 4, course: 'Doja Kabiru', courseFee: 2546, category: 'Investment', scheduled: 'Jan. 20th,2020', published: 'Jan. 20th,2020', status: 'Approved' },
  { position: 5, course: 'Sylvester Ayodele', courseFee: 1982, category: 'Investment', scheduled: 'Jan. 20th,2020', published: 'Jan. 20th,2020', status: 'Unapproved' },
  { position: 6, course: 'Linda Pedro', courseFee: 847, category: 'Investment', scheduled: 'Jan. 20th,2020', published: 'Jan. 20th,2020', status: 'Approved' },
];

@Component({
  selector: 'in-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit, AfterViewInit  {

  constructor() { }

  displayedColumns: string[] = ['position', 'course', 'courseFee', 'category', 'scheduled', 'published', 'status', 'action'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  activeLink = 'all';

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.dataSource.filterPredicate = (data: PeriodicElement, filter: string) => {
      return data.status.trim().toLowerCase() == filter;
    };
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string) {
    this.activeLink = filterValue.trim().toLowerCase();

    if (filterValue == 'all') {
      this.dataSource.filter = '';
    } else {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
  }
}

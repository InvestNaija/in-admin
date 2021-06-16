import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { ApiService } from 'src/app/shared/services/api.service';
import { ApplicationContextService } from 'src/app/shared/services/application-context.service';
import { CommonService } from 'src/app/shared/services/common.service';

export interface PeriodicElement {
  title: string;
  course_fee: number;
  category: string;
  level: string;
  publish_date: string;
  status: string;
}

@Component({
  selector: 'in-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit, AfterViewInit  {

  constructor(
    private api: ApiService
  ) { }

  displayedColumns: string[] = ['course', 'courseFee', 'category', 'level', 'published', 'status', 'action'];
  dataSource: any;
  activeLink = 'all';

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.fetchCourses();
  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string) {
    this.activeLink = filterValue.trim().toLowerCase();

    if (filterValue == 'all') {
      this.dataSource.filter = '';
    } else {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
  }

  fetchCourses() {
    this.api.get('/api/provider/courses')
      .subscribe(response => {
        this.dataSource = new MatTableDataSource(response.data);
        this.dataSource.filterPredicate = (data: PeriodicElement, filter: string) => {
          return data.status.trim().toLowerCase() == filter;
        };
        this.dataSource.paginator = this.paginator;
      });
  }
}

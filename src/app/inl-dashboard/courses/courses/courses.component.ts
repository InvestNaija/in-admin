import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

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

  total_count = 0;
  pageSize = 10;
  currentPage = new BehaviorSubject<number>(1);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    this.fetchCourses(this.paginator.pageIndex)
      .pipe(
        map(data => {
        // Flip flag to show that loading has finished.
        // this.isLoadingResults = false;
          this.total_count = data.response.totalItems;
          return data.response.allData;
        }),
        catchError(() => {
          // this.isLoadingResults = false;
          return of([]);
        })
      )
      .subscribe(response => {
        console.log(response);
        this.dataSource = new MatTableDataSource(response);

        this.dataSource.filterPredicate = (data: PeriodicElement, filter: string) => {
          return data.status.trim().toLowerCase() == filter;
        };
        this.dataSource.paginator = this.paginator;
      });
  }

  applyFilter(filterValue: string) {
    this.activeLink = filterValue.trim().toLowerCase();

    if (filterValue == 'all') {
      this.dataSource.filter = '';
    } else {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
  }

  fetchCourses(page: number) {
    console.log(page);
    return this.api.get('/api/provider/courses');
  }
}

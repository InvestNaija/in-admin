import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject, of } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';

import { ApiService } from 'src/app/shared/services/api.service';

export interface PeriodicElement {
  title: string;
  course_fee: number;
  category: any;
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
  isLoading = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    // this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    this.paginator.page
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoading = true;
          return this.fetchCourses(this.paginator.pageIndex);
        }),
        map((data: any) => {
          this.isLoading = false;
          this.total_count = data.response.totalItems;
          return data.response.allData;
        }),
        catchError(() => {
          this.isLoading = false;
          return of([]);
        })
      )
      .subscribe(response => {
        this.dataSource = new MatTableDataSource(response);

        this.dataSource.filterPredicate = (data: PeriodicElement, filter: string) => {
          return data.status.trim().toLowerCase() == filter;
        };
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
    return this.api.get(`/api/provider/courses?page=${page+1}`);
  }
}

import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject, of } from 'rxjs';
import { catchError, finalize, map, startWith, switchMap, take } from 'rxjs/operators';

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
  @ViewChild(MatPaginator) paginator: MatPaginator;
  private loadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.loadingSubject.asObservable();

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.paginator.page
      .pipe(
        startWith({}),
        switchMap(() => {
          this.dataSource = null;
          this.loadingSubject.next(true);
          return this.fetchCourses(this.paginator.pageIndex, this.paginator.pageSize);
        }),
        map((data: any) => {
          this.total_count = data.response.totalItems;
          return data.response.allData;
        }),
        catchError(() => {
          return of([]);
        })
      )
      .subscribe(response => {
        this.loadingSubject.next(false);
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

  fetchCourses(page: number, size: number) {
    return this.api.get(`/api/provider/courses?page=${page+1}&size=${size}`);
  }
}

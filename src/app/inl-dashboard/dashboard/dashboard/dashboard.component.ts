import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { catchError, map, switchMap } from 'rxjs/operators';
import { BehaviorSubject, of } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';

import { ApplicationContextService } from '../../../shared/services/application-context.service';
import { ApiService } from '../../../shared/services/api.service';

export interface PeriodicElement {
  position: number;
  course: string;
  courseFee: number;
  category: string;
  scheduled: string;
  published: string;
  status: string;
}

@Component({
  selector: 'in-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['course', 'courseFee', 'category', 'level', 'published', 'status', 'action'];
  dataSource: any;
  userInformation: any;

  total_count = 0;
  pageSize = 10;
  currentPage = new BehaviorSubject<number>(1);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  stats: any;

  constructor(
    private api: ApiService,
  ) { }

  ngOnInit(): void {
    this.api.get('/api/provider/stats')
      .subscribe(response => this.stats = response.data);
  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    this.fetchCourses(this.paginator.pageIndex)
      .pipe(
        map(data => {
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
  fetchCourses(page: number) {
    return this.api.get('/api/provider/unapproved/courses');
  }
}

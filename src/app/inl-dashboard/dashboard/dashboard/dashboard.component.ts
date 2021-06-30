import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { catchError, finalize, map, startWith, switchMap } from 'rxjs/operators';
import { BehaviorSubject, of } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';

import { ApiService } from '@app/_shared/services/api.service';

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

  displayedColumns: string[] = ['asset', 'price', 'unitsExpressed', 'amount', 'status', 'action'];
  dataSource: any = null;
  userInformation: any;

  total_count = 0;
  pageSize = 10;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  private loadingSubject = new BehaviorSubject<boolean>(true);
  isLoading$ = this.loadingSubject.asObservable();
  topAssets: any;

  constructor(
    private api: ApiService,
  ) { }

  ngOnInit(): void {
    this.api.get('/api/v1/assets/top-assets')
      .subscribe(response => {
        console.log(response)
        this.topAssets = response.data
      });
  }

  ngAfterViewInit() {
    this.paginator.page
      .pipe(
        startWith({}),
        switchMap(() => {
          this.dataSource = null;
          // return this.fetchCourses(this.paginator.pageIndex, this.paginator.pageSize);
          return this.fetchTxns();
        }),
        map((response: any) => {
          // this.total_count = data.response.totalItems;
          // console.log(data)
          return response.data;
        }),
        catchError(() => {
          return of([]);
        })
      )
      .subscribe(response => {
        // console.log(response.data)
        this.loadingSubject.next(false);
        this.dataSource = new MatTableDataSource(response);

        this.dataSource.filterPredicate = (data: PeriodicElement, filter: string) => {
          return data.status.trim().toLowerCase() == filter;
        };
      });
  }
  fetchTxns() {
    return this.api.get(`/api/v1/reservations/my-reservations`);
  }
}

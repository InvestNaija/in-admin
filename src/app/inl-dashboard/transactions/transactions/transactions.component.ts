import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { BehaviorSubject, of } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';

import { ApiService } from '@app/_shared/services/api.service';
import { MatTableDataSource } from '@angular/material/table';
import { ApplicationContextService } from '@app/_shared/services/application-context.service';


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
  selector: 'in-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit, AfterViewInit  {

  displayedColumns: string[] = ['asset', 'price', 'unitsExpressed', 'unitsAlloted', 'amount', 'status', 'action'];
  dataSource: any = null;
  total_count = 0;
  pageSize = 10;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private router: Router,
    private api: ApiService,
    private appService: ApplicationContextService
  ) { }

  private loadingSubject = new BehaviorSubject<boolean>(true);
  isLoading$ = this.loadingSubject.asObservable();

  ngOnInit(): void { }
  ngAfterViewInit() {
    this.paginator.page
      .pipe(
        startWith({}),
        switchMap(() => {
          this.dataSource = null;
          return this.api.get(`/api/v1/reservations/my-reservations`);
        }),
        map((response: any) => {
          // this.total_count = data.response.totalItems;
          return response.data;
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
  onMakePayment(element: any) {
    this.appService.checkCSCS(element);
  }
}

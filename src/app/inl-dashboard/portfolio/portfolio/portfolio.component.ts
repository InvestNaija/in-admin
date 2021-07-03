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
  selector: 'in-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit, AfterViewInit  {

  displayedColumns: string[] = ['asset', 'price', 'unitsExpressed', 'unitsAlloted', 'amount', 'status', 'action'];
  dataSource: any = null;
  total_count = 0;
  pageSize = 10;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  bestAsset = {loading: true, value: 0};
  totalAsset= {loading: true, value: 0};
  totalPortfolio= {loading: true, value: 0};

  constructor(
    private router: Router,
    private api: ApiService,
    private appService: ApplicationContextService,
  ) { }

  private loadingSubject = new BehaviorSubject<boolean>(true);
  isLoading$ = this.loadingSubject.asObservable();

  ngOnInit(): void { }
  ngAfterViewInit() {
    this.api.get(`/api/v1/assets/top-assets`)
      .subscribe(response => {
        this.bestAsset.loading = false;
        this.bestAsset.value = Math.max.apply(Math, response.data.map(function(ob:any) { return ob.sharePrice; }))
      });
    this.paginator.page
      .pipe(
        startWith({}),
        switchMap(() => {
          this.dataSource = null;
          return this.api.get(`/api/v1/reservations/my-reservations`);
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
        this.totalAsset.loading = false; this.totalPortfolio.loading = false
        this.totalAsset.value = response.length;
        this.totalPortfolio.value = response.reduce((a:any, b:any) => a + b.amount, 0);

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

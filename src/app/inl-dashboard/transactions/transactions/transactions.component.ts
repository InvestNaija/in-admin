import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
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

  custId: string;
  displayedColumns: string[] = ['custName', 'asset', 'description', 'amount', 'date', 'status', 'action'];
  dataSource: any = null;
  total_count = 0;
  pageSize = 10;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private router: Router,
    private aRoute: ActivatedRoute,
    private toastr: ToastrService,
    private api: ApiService,
    private appService: ApplicationContextService
  ) { }

  private loadingSubject = new BehaviorSubject<boolean>(true);
  isLoading$ = this.loadingSubject.asObservable();

  ngOnInit(): void {
    this.custId = this.aRoute.snapshot.paramMap.get('id');
    if(this.custId){
      this.displayedColumns = ['asset', 'description', 'amount', 'date', 'status', 'action'];
    }
  }
  ngAfterViewInit() {
    this.getTransactions(null);
  }

  getTransactions(search) {
    this.paginator.page
      .pipe(
        startWith({}),
        switchMap(() => {
          this.dataSource = null;
          if(this.custId)
            return this.api.get(`/transactions/customer/${this.custId}/?page=${this.paginator.pageIndex+1}&size=${this.paginator.pageSize}` + (search?`&search=${search}`:''));
          return this.api.get(`/transactions?page=${this.paginator.pageIndex+1}&size=${this.paginator.pageSize}`);
        }),
        catchError(() => {
          this.loadingSubject.next(false);
          return of([]);
        })
      )
      .subscribe(response => {
        this.loadingSubject.next(false);
        this.dataSource = new MatTableDataSource(response.data);
        this.total_count = response.totalItems;
      });
  }

  onSearch(search) {
    // console.log(search);
    this.getTransactions(search);
  }
}

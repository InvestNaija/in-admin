import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import Swal from 'sweetalert2';
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
  selector: 'in-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit, AfterViewInit  {

  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'phone', 'status', 'action'];
  dataSource: any = null;
  total_count = 0;
  pageSize = 10;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private api: ApiService,
    private appService: ApplicationContextService
  ) { }

  private loadingSubject = new BehaviorSubject<boolean>(true);
  isLoading$ = this.loadingSubject.asObservable();

  ngOnInit(): void { }
  ngAfterViewInit() {
    this.getTransactions();
  }

  getTransactions() {
    this.paginator.page
      .pipe(
        startWith({}),
        switchMap(() => {
          this.dataSource = null;
          return this.api.get(`/customers?page=${this.paginator.pageIndex+1}&size=${this.paginator.pageSize}&search`);
        }),
        catchError(() => {
          return of([]);
        })
      )
      .subscribe(response => {
        this.loadingSubject.next(false);
        this.dataSource = new MatTableDataSource(response.data);
        this.total_count = response.totalItems;
        // this.pageSize = response.totalPages

        this.dataSource.filterPredicate = (data: PeriodicElement, filter: string) => {
          return data.status.trim().toLowerCase() == filter;
        };
      });
  }
  onClickRow(row) {
    this.router.navigateByUrl(`/dashboard/customers/${row.id}`)
  }

  deleting=false;
  onDeleteTransaction(element: any) {
    Swal.fire({
      title: 'Delete transaction',
      text: "Deleting transaction is irreversible action",
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#06262D',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Proceed!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleting=true;
        this.api.delete(`/api/v1/reservations/cancel/${element.id}`)
          .subscribe(response => {
            this.toastr.success(response.message);
            this.deleting=false;
            this.getTransactions();
          },errResp => {
            this.deleting=false;
          });
      }
    });
  }
}

import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  selector: 'in-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss']
})
export class CustomerDetailComponent implements OnInit, AfterViewInit  {
  customer: any;

  displayedColumns: string[] = ['productType', 'description', 'amount', 'status', 'action'];
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
    // console.log('Called');
  }
  ngAfterViewInit() {

    const custId = this.aRoute.snapshot.paramMap.get('id');
    this.api.get(`/customers/${custId}`)
      .subscribe(customer => {
        this.customer = customer.data;
        this.customer.dob = new Date(this.customer.dob)
        // console.log(customer.data, this.customer);

        // this.loadingSubject.next(false);
        // this.dataSource = new MatTableDataSource(response.data);
        // this.total_count = response.totalItems;
      });
  }

  getCustomerTxns(custId) {
    return this.paginator.page
          .pipe(
            startWith({}),
            switchMap(() => {
              this.dataSource = null;
              return this.api.get(`/transactions/customer/${custId}/?page=${this.paginator.pageIndex+1}&size=${this.paginator.pageSize}&search`);
            })
          )
  }

}

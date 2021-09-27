import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, of } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
// import { FileSaver } from 'angular-file-saver';
import { saveAs } from 'file-saver';

import { ApiService } from '@app/_shared/services/api.service';
import { MatTableDataSource } from '@angular/material/table';
import { ApplicationContextService } from '@app/_shared/services/application-context.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@environments/environment';
import { AuthService } from '@app/_shared/services/auth.service';


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
  container: any = {};

  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'phone', 'status', 'action'];
  dataSource: any = null;
  total_count = 0;
  pageSize = 10;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private api: ApiService,
    private http: HttpClient,
    private auth: AuthService,
  ) { }

  private loadingSubject = new BehaviorSubject<boolean>(true);
  isLoading$ = this.loadingSubject.asObservable();

  ngOnInit(): void { }
  ngAfterViewInit() {
    this.getTransactions(null);
  }

  getTransactions(search) {
    this.paginator.page
      .pipe(
        startWith({}),
        switchMap(() => {
          this.dataSource = null;
          return this.api.get(`/customers?page=${this.paginator.pageIndex+1}&size=${this.paginator.pageSize}` + (search?`&search=${search}`:''));
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
    this.router.navigateByUrl(`/dashboard/customers/detail/${row.id}`)
  }
  onDownload(type) {
    this.container['downloading'] = true;
    let headers = new HttpHeaders().append('Authorization', `${this.auth.getToken()}`)//.append('Content-Type', undefined);
    this.http.get(`${environment.apiUrl}/customers/download/cscs`,{
      responseType: 'arraybuffer', observe: 'response', headers:headers}
     ).subscribe(response => {
      let blob = new Blob([response.body], { type: response.headers.get('content-type')});
      saveAs(blob, 'sample.csv');
      this.container['downloading'] = false;
    })
  }
  onSearch(search) {
    // console.log(search);
    this.getTransactions(search);
  }

  onAssetDetail(asset) {
    this.router.navigateByUrl(`/dashboard/assets/detail/${asset.id}`)
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
            this.getTransactions(null);
          },errResp => {
            this.deleting=false;
          });
      }
    });
  }
}

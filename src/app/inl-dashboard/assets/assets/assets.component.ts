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


// export interface PeriodicElement {
//   position: number;
//   course: string;
//   courseFee: number;
//   category: string;
//   scheduled: string;
//   published: string;
//   status: string;
// }

@Component({
  selector: 'in-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.scss']
})
export class AssetsComponent implements OnInit, AfterViewInit  {

  displayedColumns: string[] = ['name', 'type', 'sharePrice', 'anticipatedMinPrice', 'openingDate', 'closingDate', 'openForPurchase', 'action'];
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
    this.getTransactions(null);
  }

  getTransactions(search) {
    this.paginator.page
      .pipe(
        startWith({}),
        switchMap(() => {
          this.dataSource = null;
          return this.api.get(`/assets?page=${this.paginator.pageIndex+1}&size=${this.paginator.pageSize}` + (search?`&search=${search}`:''));
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

        // this.dataSource.filterPredicate = (data: PeriodicElement, filter: string) => {
        //   return data.status.trim().toLowerCase() == filter;
        // };
      });
  }
  isOpenForPurchase(asset): boolean{
    const today = new Date();
    const closingDate = new Date(asset.closingDate);

    // console.log(asset.name, closingDate, today);

    if(today >= closingDate) asset.openForPurchase = false;
    else asset.openForPurchase = true;
    return asset.openForPurchase;
  }
  onClickRow(row) {
    this.router.navigateByUrl(`/dashboard/assets/${row.id}`)
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

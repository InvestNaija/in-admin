import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import Swal from 'sweetalert2';
import { combineLatest } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { environment } from '@environments/environment';

import { IShare } from '../../_models/share.model';
import { ApiService } from '@app/_shared/services/api.service';
import { CommonService } from '@app/_shared/services/common.service';

@Component({
  selector: 'in-make-payment',
  templateUrl: './make-payment.component.html',
  styleUrls: ['./make-payment.component.scss']
})
export class MakePaymentComponent implements OnInit {

  paying = false;
  share: IShare;
  asset: any;
  transaction: any;

  constructor(
    private aRoute: ActivatedRoute,
    private apiService: ApiService,
    public commonServices: CommonService,
    @Inject(DOCUMENT) private document: Document
    ) { }

  ngOnInit(): void {
    // Get Asset details
    this.aRoute.paramMap.pipe(
      switchMap(params => {
        this.commonServices.loading().next(true);
        return combineLatest([
                  // Name of the asset
                  this.apiService.get(`/api/v1/assets/${params.get('assetId')}`),
                  // expression of Interest Id
                  this.apiService.get(`/api/v1/reservations/fetch/${params.get('txnId')}`)

        ]);
      })
    ).subscribe(([asset, transaction]) => {
      this.commonServices.loading().next(false);
        console.log(asset, transaction);
        this.asset = asset.data;
        this.transaction = transaction.data;
    })
  }
  onMakePayment(terms) {
    this.paying = true;
    if(!terms) {
      this.paying = false;
      Swal.fire('', 'Terms and Condition needs to be accepted', 'warning');
      return;
    }
    const payload = {
      gateway: environment.gateway,
      reservationId: this.transaction.id,
      currency: this.asset.currency
    }
    this.apiService.post('/api/v1/reservations/make-payment', payload)
      .subscribe(response => {
        this.paying = false;
        this.document.location.href = response.data.authorization_url;
      },
      errResp => {
        this.paying = false;
        Swal.fire('Oops...', errResp?.error?.error?.message, 'error')
      });
  }
}

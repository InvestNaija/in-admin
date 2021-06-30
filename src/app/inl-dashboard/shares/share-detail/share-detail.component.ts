import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { IShare } from '../../_models/share.model';
import { ApiService } from '@app/_shared/services/api.service';
import { CommonService } from '@app/_shared/services/common.service';

@Component({
  selector: 'in-share-detail',
  templateUrl: './share-detail.component.html',
  styleUrls: ['./share-detail.component.scss']
})
export class ShareDetailComponent implements OnInit {

  share: IShare;

  constructor(
    private router: Router,
    private aRoute: ActivatedRoute,
    private api: ApiService,
    public commonServices: CommonService,
    ) { }

  ngOnInit(): void {
    this.aRoute.paramMap.pipe(
      switchMap(params => {
        this.commonServices.loading().next(true);
        return this.api.get(`/api/v1/assets/${params.get('id')}`);
      })
    ).subscribe(response => {
      this.commonServices.loading().next(false);
      this.share = response.data;
    })
  }
  onExpressInterest(share: IShare) {
    this.router.navigateByUrl(`/dashboard/shares/details/${share.id}/expression-of-interest`)
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '@app/_shared/services/api.service';
import { ApplicationContextService } from '@app/_shared/services/application-context.service';
import { CommonService } from '@app/_shared/services/common.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'in-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  tabbedPages = [
    { page: null, url: '/dashboard/user/profile' },
    { page: 'password', url: '/dashboard/user/password' },
  ]

  selectedIndex;

  constructor(
    private aRoute: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private appContext: ApplicationContextService,
    private commonServices: CommonService
  ) { }

  ngOnInit(): void {
    this.aRoute.paramMap.pipe(
        switchMap(params => {
          this.selectedIndex = this.tabbedPages.map(p=> p.page).indexOf(params.get('page'));
          this.commonServices.loading().next(true);
          return this.apiService.get('/customers/profile/fetch');
        })
      ).subscribe(response => {
            this.appContext.userInformation = response.data;
            this.commonServices.loading().next(false);
          },
          errResp => {
            // this.container['loading'] = false;
            // Swal.fire('Oops...', errResp?.error?.error?.message, 'error')
          });
  }
  setIndex(event) {
    this.router.navigateByUrl(this.tabbedPages[event].url);
  }

}

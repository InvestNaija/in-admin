import { Component, OnInit, OnDestroy } from '@angular/core';
import { fromEvent, merge, Observable, Subscription } from "rxjs";
import { debounceTime } from 'rxjs/operators';
import { ApplicationContextService } from '../_shared/services/application-context.service';
import { AuthService } from '../_shared/services/auth.service';

@Component({
  selector: 'in-inl-dashboard',
  templateUrl: './inl-dashboard.component.html',
  styleUrls: ['./inl-dashboard.component.scss']
})
export class InlDashboardComponent implements OnInit, OnDestroy {

  sideNavMode = 'side';
  sideNavOpen = true;
  resizeObservable$: Observable<Event>;
  loadObservable$: Observable<Event>;
  sidenavSubscription$: Subscription;
  allSideNavEventsObservable$: Observable<Event>;
  userInformation: any;

  constructor(private auth: AuthService,
    private appContext: ApplicationContextService) { }

  ngOnInit(): void {
    this.resizeObservable$ = fromEvent(window, 'resize');
    this.loadObservable$ = fromEvent(window, 'load');
    this.allSideNavEventsObservable$ = merge(this.resizeObservable$, this.loadObservable$);
    this.sidenavSubscription$ = this.allSideNavEventsObservable$.pipe(debounceTime(50)).subscribe(evt => {
      // console.log('event: ', evt);
      // console.log('event.target.innerWidth: ', (evt.currentTarget as Window).innerWidth);
      let browserVidth = (evt.currentTarget as Window).innerWidth;
      if (browserVidth < 991) {
        this.sideNavMode = 'over';
        this.sideNavOpen = false;
      } else {
        this.sideNavMode = 'side';
        this.sideNavOpen = true;
      }
    });

    if(!this.auth.getToken()) {
      this.logout();
    }
    this.getUserInformation();
  }

  getUserInformation() {
    this.appContext.userInformationObs().subscribe(
       data => {
          console.log('UserInfo', data);
          this.userInformation = data;
        }
    );
  }

  logout() {

    // const payload = {
    //   username: 'admin',
    //   password: 'admin'
    // };

    // this.api.post('/auth/logout', payload)
    //   .subscribe(() => {
    //     this.auth.logout();
    //   });

    this.auth.logout();
  }

  ngOnDestroy() {
    this.sidenavSubscription$.unsubscribe()
  }

}

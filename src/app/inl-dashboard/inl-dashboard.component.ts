import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { fromEvent, merge, Observable, Subscription } from "rxjs";
import { debounceTime } from 'rxjs/operators';
import { ApplicationContextService } from '../_shared/services/application-context.service';
import { AuthService } from '../_shared/services/auth.service';

@Component({
  selector: 'in-inl-dashboard',
  templateUrl: './inl-dashboard.component.html',
  styleUrls: ['./inl-dashboard.component.scss']
})
export class InlDashboardComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('sidenav') sidenav: any

  sideNavMode = 'side';
  sideNavOpen = true;
  resizeObservable$: Observable<Event>;
  loadObservable$: Observable<Event>;
  sidenavSubscription$: Subscription;
  allSideNavEventsObservable$: Observable<Event>;
  userInformation: any;
  sidenavClickSubscription$: Subscription;

  constructor(private auth: AuthService,
    private appContext: ApplicationContextService
  ) {

  }

  ngOnInit(): void {
    this.setupSideBar();

    if(!this.auth.getToken()) {
      this.logout();
    }
    this.getUserInformation();
  }

  ngAfterViewInit() {
    this.sideNavFunction();
  }

  setupSideBar() {
    this.resizeObservable$ = fromEvent(document, 'resize');
    this.loadObservable$ = fromEvent(document, 'load');
    this.allSideNavEventsObservable$ = merge(this.resizeObservable$, this.loadObservable$);
    this.sidenavSubscription$ = this.allSideNavEventsObservable$.pipe(debounceTime(500)).subscribe(evt => this.sideNavFunction());

    let button = document.querySelectorAll('.menu-section-bottom a');
    let sidenavClick$ = fromEvent(button, 'click');

    this.sidenavClickSubscription$ = sidenavClick$.subscribe(evt => {
      if (window.innerWidth < 991) {
        this.sidenav.close();
      }
    });
  }

  sideNavFunction() {
    let browserVidth = window.innerWidth;
    if (browserVidth < 991) {
      this.sideNavMode = 'over';
      this.sideNavOpen = false;
    } else {
      this.sideNavMode = 'side';
      this.sideNavOpen = true;
    }
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

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, ReplaySubject, Subject, throwError } from 'rxjs/index';
import { catchError, map, publishLast, refCount, take } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ApplicationContextService {

  private _userInformation;
  private _userInformationObs = new BehaviorSubject(1);

  constructor() { }

  public set userInformation(value) {
    this._userInformation = value;
    this._userInformationObs.next(value);
    localStorage.setItem('learnin-cp-dashboard-refresh', btoa(JSON.stringify(value)));
  }

  public get userInformation() {
    return this._userInformation;
  }

  userInformationObs(): Observable<any> {
    if(localStorage.getItem('learnin-cp-dashboard-refresh')) {
      this._userInformationObs.next(JSON.parse(atob(localStorage.getItem('learnin-cp-dashboard-refresh'))));
    }
    return this._userInformationObs.asObservable();
  }


}

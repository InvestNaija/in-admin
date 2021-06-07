import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, ReplaySubject, Subject, throwError } from 'rxjs/index';
import { catchError, map, publishLast, refCount, take } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ApplicationContextService {

  private _userInformation;
  private _userInformationObs = new ReplaySubject(1);

  private _notificationInformation;
  private _notificationInformationObs = new ReplaySubject(1);

  private _socialMediaInformation;
  private _socialMediaInformationObs = new ReplaySubject(1);

  constructor() { }

  set userInformation(value) {
    this._userInformation = value;
    this._userInformationObs.next(value);
  }

  get userInformation() {
    return this._userInformation;
  }

  userInformationObs() {
    return this._userInformationObs.asObservable();
  }

  set notificationInformation(value) {
    this._notificationInformation = value;
    this._notificationInformationObs.next(value);
  }

  get notificationInformation() {
    return this._notificationInformation;
  }

  notificationInformationObs() {
    return this._notificationInformationObs.asObservable();
  }

  set socialMediaInformation(value) {
    this._socialMediaInformation = value;
    this._socialMediaInformationObs.next(value);
  }

  get socialMediaInformation() {
    return this._socialMediaInformation;
  }

  socialMediaInformationObs() {
    return this._socialMediaInformationObs.asObservable();
  }
}

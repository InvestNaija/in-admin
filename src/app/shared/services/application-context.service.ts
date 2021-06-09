import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, ReplaySubject, Subject, throwError } from 'rxjs/index';
import { catchError, map, publishLast, refCount, take } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ApplicationContextService {

  private _userInformation;
  private _userInformationObs = new ReplaySubject(1);

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
}
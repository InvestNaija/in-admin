import { Injectable } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import {  BehaviorSubject, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private loadingSubject = new BehaviorSubject<boolean>(null);
  isLoading$ = this.loadingSubject.asObservable();

  container: any = {};

  constructor(private api: ApiService) { }

  resetContainer() {
    this.container = {};
  }

  loading() {
    return this.loadingSubject;
  }

  getLOVs(endpoint: string, selectScope: string, options: any) {
    if (this.container[selectScope] == null) {
      this.container[options['loading']] = 'Loading, please wait...';
      return this.api.get(endpoint).pipe(
        map(response => {
            return of(response.data);
          }
        )
      )
          .subscribe(
            (response) => {
              this.container[options['loading']] = null;
              this.container[selectScope] = response;
            },
            (err) => {
              this.container[options['loading']] = null;
              console.log(err);
            }
          );
    }
  }

  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
          return;
      }
      if (control.value !== matchingControl.value) {
          matchingControl.setErrors({ mustMatch: true });
      } else {
          matchingControl.setErrors(null);
      }
    }
  }

  findInvalidControlsRecursive(formToInvestigate: FormGroup|FormArray): string[] {
    const invalidControls: any = {};
    const recursiveFunc = (form: FormGroup|FormArray) => {
      Object.keys(form.controls).forEach(field => {
        const control = form.get(field);
        if (control.invalid && !(control instanceof FormArray) && !(control instanceof FormGroup)) {
          invalidControls[field] = control.errors;
        }
        if (control instanceof FormGroup) {
          recursiveFunc(control);
        } else if (control instanceof FormArray) {
          recursiveFunc(control);
        }
      });
    }
    recursiveFunc(formToInvestigate);
    return invalidControls;
  }
}

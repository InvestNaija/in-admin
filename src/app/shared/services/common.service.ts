import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from './api.service';
import { ApplicationContextService } from './application-context.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  container: any = {};

  constructor(private api: ApiService) { }

  resetContainer() {
    this.container = {};
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
}

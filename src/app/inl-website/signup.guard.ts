import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { AuthService } from '@app/_shared/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SignupGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      return this.authService.signUp().pipe(
        map((e) => {
          if (e) {
              return true;
          }
          this.authService.signup$.next(null);
          this.router.navigate(['/auth/login']);
          return false
        }),
        // catchError(error => {
        //   console.log(error);
        //   this.authService.signup$.next(null);
        //   this.router.navigate(['/auth/login']);
        //   return of(false)
        // })
      )
  }

}

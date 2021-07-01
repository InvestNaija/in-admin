import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { environment } from '@environments/environment';
// import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    // private toastr: ToastrService
    ) { }

  get(url: string, useToken: boolean = true): Observable<any> {
    return this.request('GET', url, useToken);
  }

  post(url: string, body: Object, useToken: boolean = true): Observable<any> {
    return this.request('POST', url, useToken, body);
  }

  put(url: string, body: Object, useToken: boolean = true): Observable<any> {
    return this.request('PUT', url, useToken, body);
  }
  patch(url: string, body: Object, useToken: boolean = true): Observable<any> {
    return this.request('PATCH', url, useToken, body);
  }

  delete(url: string, useToken: boolean = true): Observable<any> {
    return this.request('DELETE', url, useToken);
  }

  request(method: string, url: string, useToken: boolean, body?: Object) {
    let headers = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Authorization', `${this.auth.getToken()}`);

    if (!useToken) {
      headers = headers.delete('Authorization');
    }

    const options = {
      body,
      headers,
    }

    const endpoint = environment.apiUrl + url
    return this.http.request(method, endpoint, options)
      .pipe(catchError((error: HttpErrorResponse) => this.onRequestError(error)));
  }

  onRequestError(error: HttpErrorResponse) {

    console.log('error', error);

    if (error.error instanceof ErrorEvent) {
      // this.toastr.error(error.error.message, 'Operation Unsuccessful');
    } else {
      // this.toastr.error(error.error, 'Operation Unsuccessful');
    }

    if (error.status === 401) {
      // this.toastr.error('Your session has timed out', 'Authentication Error');
      // this.auth.logout();
    }

    return throwError(error);
  }
}

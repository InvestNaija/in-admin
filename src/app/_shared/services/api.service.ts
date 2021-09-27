import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { environment } from '@environments/environment';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private toastr: ToastrService
    ) { }

  get(url: string, useToken: boolean = true): Observable<any> {
    return this.request('GET', url, useToken);
  }

  getWtHeader(url: string, useToken: boolean = true, header?: HttpHeaders): Observable<any> {
    return this.request('GET', url, useToken, null, header);
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

  request(method: string, url: string, useToken: boolean, body?: Object, header?: HttpHeaders) {
    let headers = header ?? new HttpHeaders()
                    .append('Content-Type', 'application/json');

    if (useToken) {
      headers = headers.append('Authorization', `${this.auth.getToken()}`);
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
    if (error.status >= 500 && error.status < 600 && this.auth.getToken()) {
      this.toastr.error(error.error.error.message, error.status+': '+ error.statusText);
      // this.auth.logout();
    }

    return throwError(error);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  signup$ = new BehaviorSubject<any>(null);
  // store the URL so we can redirect after logging in
  redirectUrl: string;
  landlordStorageKey = 'admin-cp-dashboard-jwt';

  constructor(private router: Router, private http: HttpClient) { }

  setToken(data: any) {
    localStorage.setItem(this.landlordStorageKey, data.token);
  }

  getToken() {
    return localStorage.getItem(this.landlordStorageKey);
  }

  isLoggedIn() {
    // console.log('user is logged in: ', this.getToken() !== '' && this.getToken() !== null && this.getToken() !== 'null' && this.getToken() !== undefined && this.getToken() !== 'undefined');
    return this.getToken() !== '' && this.getToken() !== null && this.getToken() !== 'null' && this.getToken() !== undefined && this.getToken() !== 'undefined';
  }

  logout() {
    localStorage.removeItem(this.landlordStorageKey)
    this.router.navigate(['/']);
  }
  signUp() {
    return this.signup$.asObservable();
  }
}

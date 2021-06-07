import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  // store the URL so we can redirect after logging in
  redirectUrl: string;

  landlordStorageKey = 'learning-cp-dashboard-jwt';

  constructor(private router: Router) { }

  setToken(data: any) {
    localStorage.setItem(this.landlordStorageKey, data.token);
    // localStorage.setItem(this.landlordStorageKey + '-expires_at', data.expires_in);
    // localStorage.setItem(this.landlordStorageKey + '-refresh_token', data.refresh_token);
  }

  getToken() {
    return localStorage.getItem(this.landlordStorageKey);
  }

  isLoggedIn() {
    console.log('user is logged in: ', this.getToken() !== '' && this.getToken() !== null && this.getToken() !== 'null' && this.getToken() !== undefined && this.getToken() !== 'undefined');
    
    return this.getToken() !== '' && this.getToken() !== null && this.getToken() !== 'null' && this.getToken() !== undefined && this.getToken() !== 'undefined';
  }

  logout() {
    localStorage.removeItem(this.landlordStorageKey);
    // localStorage.removeItem(this.landlordStorageKey + '-expires_at');
    // localStorage.removeItem(this.landlordStorageKey + '-refresh_token');
    this.router.navigate(['/']);
  }
}

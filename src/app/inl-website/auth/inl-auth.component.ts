import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

import { ApiService } from '@app/_shared/services/api.service';
import { AuthService } from '@app/_shared/services/auth.service';

@Component({
  selector: 'in-auth-account',
  templateUrl: './inl-auth.component.html',
  styleUrls: ['./inl-auth.component.scss']
})
export class InlAuthComponent implements OnInit {

  signupSub: Subscription

  constructor(private api: ApiService,
    private auth: AuthService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }
    this.signupSub = this.authService.signUp().subscribe(
      data => {
        if(data) {
          // this.populateKYCDetail(data);
        }
      }
    )
  }

  onSubmit(form: NgForm) {
    const values = form.value;
    const payload = {
      email: values.email,
    };
    this.api.post('/api/provider/forgot-password', payload, false)
      .subscribe(response => {
        // this.appContext.userInformation = response.data;
        // if (this.auth.redirectUrl) {
        //   this.router.navigate([this.auth.redirectUrl]);
        //   this.auth.redirectUrl = '';
        // } else {
        //   this.router.navigate(['/dashboard']);
        // }
      });
  }
  ngOnDestroy() {
    if(this.signupSub) {
      this.signupSub.unsubscribe();
    }
  }

}

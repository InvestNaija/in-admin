import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ApplicationContextService } from "src/app/shared/services/application-context.service";

@Component({
  selector: 'in-inl-forgot-password',
  templateUrl: './inl-forgot-password.component.html',
  styleUrls: ['./inl-forgot-password.component.scss']
})
export class InlForgotPasswordComponent implements OnInit {

  constructor(private api: ApiService,
    private auth: AuthService,
    private appContext: ApplicationContextService,
    private router: Router) { }

  ngOnInit(): void {
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }
  }

  onSubmit(form: NgForm) {
    const values = form.value;
    const payload = {
      email: values.email,
    };
    this.api.post('/api/provider/forgot-password', payload, false)
      .subscribe(response => {
        console.log(response);
        // this.appContext.userInformation = response.data;
        // if (this.auth.redirectUrl) {
        //   this.router.navigate([this.auth.redirectUrl]);
        //   this.auth.redirectUrl = '';
        // } else {
        //   this.router.navigate(['/dashboard']);
        // }
      });
  }

}

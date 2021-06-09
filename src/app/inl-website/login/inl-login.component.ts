import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ApplicationContextService } from "src/app/shared/services/application-context.service";

@Component({
  selector: 'in-inl-login',
  templateUrl: './inl-login.component.html',
  styleUrls: ['./inl-login.component.scss']
})
export class InlLoginComponent implements OnInit {

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
      password: values.password
    };

    console.log(values);
    
    this.api.post('/api/provider/login', payload)
      .subscribe(response => {
        console.log(response);
        this.appContext.userInformation = response.data;
        this.auth.setToken(response);
        if (this.auth.redirectUrl) {
          this.router.navigate([this.auth.redirectUrl]);
          this.auth.redirectUrl = '';
        } else {
          this.router.navigate(['/dashboard']);
        }
      });
  }

}

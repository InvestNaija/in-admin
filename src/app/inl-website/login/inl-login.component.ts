import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { ApiService } from '@app/_shared/services/api.service';
import { AuthService } from '@app/_shared/services/auth.service';
import { ApplicationContextService } from "@app/_shared/services/application-context.service";
import { FormErrors, ValidationMessages } from './login.validators';
import { CommonService } from '@app/_shared/services/common.service';

@Component({
  selector: 'in-inl-login',
  templateUrl: './inl-login.component.html',
  styleUrls: ['./inl-login.component.scss']
})
export class InlLoginComponent implements OnInit {
  myForm: FormGroup;
  errors = [];
  formErrors = FormErrors;
  uiErrors = FormErrors;
  validationMessages = ValidationMessages;
  APIResponse = false; submitting = false;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private auth: AuthService,
    private appContext: ApplicationContextService,
    private commonServices: CommonService,
    private router: Router) { }

  ngOnInit(): void {
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }
    this.myForm = this.fb.group({
      email: [null, [Validators.required, Validators.pattern(this.commonServices.email)]],
      password: [null, [
          Validators.required,
          Validators.minLength(6),
          this.commonServices.regexValidator(new RegExp(this.commonServices.oneDigit), {'oneDigit': ''}),
          this.commonServices.regexValidator(new RegExp(this.commonServices.oneLowerCase), {'oneLowerCase': ''}),
          this.commonServices.regexValidator(new RegExp(this.commonServices.oneUpperCase), {'oneUpperCase': ''}),
        ]
      ],
    });
  }

  controlChanged(ctrlName: string) {
    this.errors = this.commonServices.controlnvalid(this.myForm.get(ctrlName) as FormControl);
    this.displayErrors();
  }

  onSubmit() {

    this.APIResponse = true; this.submitting = true;
    if (this.myForm.invalid) {
      this.uiErrors = JSON.parse(JSON.stringify(this.formErrors))
      this.errors = this.commonServices.findInvalidControlsRecursive(this.myForm);
      this.displayErrors();
      this.APIResponse = false; this.submitting = false;
      return;
    }
    const fd = JSON.parse(JSON.stringify(this.myForm.value));
    console.log(fd);

    this.api.post('/api/v1/auth/customers/login', fd, false)
      .subscribe(response => {
        this.APIResponse = false; this.submitting = false;
        this.appContext.userInformation = response.data;
        this.auth.setToken(response);
        if (this.auth.redirectUrl) {
          this.router.navigate([this.auth.redirectUrl]);
          this.auth.redirectUrl = '';
        } else {
          this.router.navigate(['/dashboard']);
        }
      },
      errResp => {
        this.APIResponse = false; this.submitting = false;
        if(errResp?.status === 503) {
          Swal.fire('Oops...', 'Service is currently unavailable. Please try again later', 'error');
        } else {
          Swal.fire('Oops...', errResp?.error?.error?.message, 'error');
        }
      });
  }

  displayErrors() {
    Object.keys(this.formErrors).forEach((control) => {
      this.formErrors[control] = '';
    });
    Object.keys(this.errors).forEach((control) => {
      Object.keys(this.errors[control]).forEach(error => {
        this.uiErrors[control] = ValidationMessages[control][error];
      })
    });
  }
}

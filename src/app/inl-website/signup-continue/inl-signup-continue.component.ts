import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

import { AuthService } from '@app/_shared/services/auth.service';
import { ValidationMessages, FormErrors, KYCDetail } from './signup.validators';
import { ApiService } from '@app/_shared/services/api.service';
import { CommonService } from '@app/_shared/services/common.service';

@Component({
  selector: 'in-inl-signup-continue',
  templateUrl: './inl-signup-continue.component.html',
  styleUrls: ['./inl-signup-continue.component.scss']
})
export class InlSignupContinueComponent implements OnInit, OnDestroy {
  gender = [{id: 'm', name: 'Male' }, {id: 'f', name: 'Female' }];
  myForm: FormGroup;
  signupSub: Subscription
  errors = [];
  formErrors = FormErrors;
  uiErrors = FormErrors;
  validationMessages = ValidationMessages;
  container: any = {};

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private commonServices: CommonService,
    private apiService: ApiService,
    private router: Router) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: [null, Validators.required],
      middleName: [null],
      gender: [null, Validators.required],
      phone: [null, Validators.required],
      birthdate: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      photo: [null],
      address: [null],
      nin: [null],
      bvn: [null, Validators.required],
      signature: [],
      passwordGroup: this.fb.group({
        password: [null, Validators.required],
        confirmPassword: [null, Validators.required],
      },{validators: this.commonServices.mustMatch('password', 'confirmPassword')}),
      accept: [false, Validators.requiredTrue]
    });
    this.signupSub = this.authService.signUp().subscribe(
      data => {
        console.log(data)
        if(data) {
          this.populateKYCDetail(data);
        }
      }
    )
  }

  populateKYCDetail(kycDetail: KYCDetail) {
    let dob = kycDetail?.birthdate.split("-");
    const gender = this.gender.find(g => g.id === kycDetail?.gender);
    this.myForm.patchValue({
      firstName: kycDetail?.firstname,
      lastName: kycDetail?.lastname,
      middleName: kycDetail?.middlename,
      gender: gender,
      phone: kycDetail?.phone,
      birthdate: dob[2] + '-' + dob[1] + '-' +dob[0], //Format understood by browser
      email: kycDetail?.email,
      photo: kycDetail?.photo,
      address: kycDetail?.residence?.address1,
      nin: kycDetail?.nin,
      bvn: kycDetail?.bvn,
      signature: kycDetail?.signature,
    });
  }


  onSubmit() {
    // this.APIResponse = false; this.submitting = true;
    if (this.myForm.invalid) {
      this.uiErrors = JSON.parse(JSON.stringify(this.formErrors))
      this.errors = this.commonServices.findInvalidControlsRecursive(this.myForm);
      Object.keys(this.errors).forEach((control) => {
        Object.keys(this.errors[control]).forEach(error => {
          this.uiErrors[control] = ValidationMessages[control][error];
        })
      })
      return;
    }
    const fd = JSON.parse(JSON.stringify(this.myForm.value));
    fd.dob = fd.birthdate;
    fd.confirmPassword = fd.passwordGroup.confirmPassword;
    fd.password = fd.passwordGroup.password;
    fd.gender = fd.gender.name
    delete fd.passwordGroup;
    delete fd.photo;
    delete fd.signature;

    if(!fd.accept) {
      Swal.fire('', 'You need to accept the terms and conditions to proceed', 'warning');
      return;
    }
    this.apiService.post('/api/v1/auth/customers/signup', fd, false)
      .subscribe(response => {
        this.authService.signup$.next(response.data);
        Swal.fire('', response?.message, 'success');
        setTimeout(()=>{
          this.router.navigate(['/auth/verify-otp']);
        }, 2000)
      },
      errResp => {
        Swal.fire('Oops...', errResp?.error?.error?.message, 'error')
      });
    // this.APIResponse = false; this.submitting = false;
  }


  ngOnDestroy() {
    if(this.signupSub) {
      this.signupSub.unsubscribe();
    }
  }

}


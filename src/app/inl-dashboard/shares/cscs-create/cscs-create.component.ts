import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { IShare } from '../../_models/share.model';
import { ApiService } from '@app/_shared/services/api.service';
import { CommonService } from '@app/_shared/services/common.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormErrors, ICSCS, ValidationMessages } from './cscs-create.validators';
import { ApplicationContextService } from '@app/_shared/services/application-context.service';
import { DOCUMENT } from '@angular/common';
import { environment } from '@environments/environment';

@Component({
  selector: 'in-cscs-create',
  templateUrl: './cscs-create.component.html',
  styleUrls: ['./cscs-create.component.scss']
})
export class CscsCreateComponent implements OnInit {

  myForm: FormGroup;
  share: IShare;
  errors = [];
  formErrors = FormErrors;
  uiErrors = FormErrors;
  validationMessages = ValidationMessages;

  submitting = false;

  total = 0;
  txnId: string;

  constructor(
    private fb: FormBuilder,
    private aRoute: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    public commonServices: CommonService,
    private appService: ApplicationContextService,
    @Inject(DOCUMENT) private document: Document
    ) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      fullName: [{value: '', disabled: true}, [Validators.required]],
      MaidenName: ['', [Validators.required]],
      City: ['', [Validators.required]],
      Country: ['', [Validators.required]],
      Citizen: ['', [Validators.required]],
      PostalCode: ['', [Validators.required]],
    });

    this.aRoute.paramMap
      .pipe(
        switchMap(params => {
          this.txnId = params.get('id');
          return this.appService.userInformationObs();
        })
      ).subscribe(userInfo => {
        this.myForm.patchValue({
          fullName: userInfo.firstName + ' ' + userInfo.lastName
        })
      })
  }

  onSubmit() {
    this.submitting = true;
    if (this.myForm.invalid) {
      this.uiErrors = JSON.parse(JSON.stringify(this.formErrors))
      this.errors = this.commonServices.findInvalidControlsRecursive(this.myForm);
      console.log(this.errors);
      Object.keys(this.errors).forEach((control) => {
        Object.keys(this.errors[control]).forEach(error => {
          this.uiErrors[control] = ValidationMessages[control][error];
        })
      });
      return;
    }
    const fd = JSON.parse(JSON.stringify(this.myForm.value));
    this.apiService.post('/api/v1/customers/create-cscs', fd)
      .pipe(
        switchMap(resp => {
          console.log(resp);
          const payload = {
            gateway: environment.gateway,
            reservationId: this.txnId
          }
          return this.apiService.post('/api/v1/reservations/make-payment', payload)
        })
      )
      .subscribe(response => {
        this.document.location.href = response.data.authorization_url;
      },
      errResp => {
        this.submitting = false;
        Swal.fire('Oops...', errResp?.error?.error?.message, 'error')
      });
  }

}

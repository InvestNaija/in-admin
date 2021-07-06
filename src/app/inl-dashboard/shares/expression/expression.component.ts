import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { IShare } from '../../_models/share.model';
import { ApiService } from '@app/_shared/services/api.service';
import { CommonService } from '@app/_shared/services/common.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormErrors, IExpression, ValidationMessages } from './expression.validators';
import { ApplicationContextService } from '@app/_shared/services/application-context.service';

@Component({
  selector: 'in-expression',
  templateUrl: './expression.component.html',
  styleUrls: ['./expression.component.scss']
})
export class ExpressionComponent implements OnInit {

  myForm: FormGroup;
  share: IShare;
  errors = [];
  formErrors = FormErrors;
  uiErrors = FormErrors;
  validationMessages = ValidationMessages;

  submitting = false;

  total = 0;
  assetId: string;

  constructor(
    private fb: FormBuilder,
    private aRoute: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    public commonServices: CommonService,
    private appService: ApplicationContextService
    ) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      type: [{value: '', disabled: true}, [Validators.required]],
      sharePrice: [{value: '', disabled: true}, [Validators.required]],
      units: ['', [Validators.required]],
      amount: [{value: '', disabled: true}, [Validators.required]],
    });

    this.aRoute.paramMap.pipe(
      switchMap(params => {
        this.commonServices.loading().next(true);
        this.assetId = params.get('id');
        return this.apiService.get(`/api/v1/assets/${this.assetId}`);
      })
    ).subscribe(response => {
      this.commonServices.loading().next(false);
      this.share = response.data;
      this.populateExpression(response.data)
    })

    this.myForm.get('units').valueChanges
        .subscribe(val => {
          this.myForm.patchValue({
            amount: +this.myForm.get('sharePrice').value * val
          })
        });
  }

  populateExpression(expression: IExpression) {
    console.log(expression);
    this.myForm.patchValue({
      type: expression?.type,
      sharePrice: expression?.sharePrice,
      units: expression?.units,
      amount: expression?.amount,
    });
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
    const fd = {
      units: this.myForm.get('units').value,
      assetId: this.assetId
    };
    // this.APIResponse = false; this.submitting = false;
    this.apiService.post(`/api/v1/reservations/express-interest`, fd)
      .subscribe(response => {
        this.router.navigateByUrl(`/dashboard/transactions/${response.data.reservation.id}/${response.data.asset.id}/make-payment`)
      },
      errResp => {
        this.submitting = false;
        Swal.fire('Oops...', errResp?.error?.error?.message, 'error')
      });
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { ApiService } from '@app/_shared/services/api.service';
import { CommonService } from '@app/_shared/services/common.service';
import { FormErrors, ValidationMessages } from './socials.validators';

@Component({
  selector: 'in-socials',
  templateUrl: './socials.component.html',
  styleUrls: ['./socials.component.scss']
})
export class SocialsComponent implements OnInit {
  myForm: FormGroup;
  errors = [];
  formErrors = FormErrors;
  uiErrors = FormErrors;
  validationMessages = ValidationMessages;
  submitting = false;
  container = {};

  constructor(
    private fb: FormBuilder,
    private commonServices: CommonService,
    private apiService: ApiService,
    ) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      facebook: [null, [Validators.pattern(this.commonServices.url)]],
      linkedIn: [null, [Validators.pattern(this.commonServices.url)]],
      twitter: [null, [Validators.pattern(this.commonServices.url)]],
      website: [null, [Validators.pattern(this.commonServices.url)]],
      youtube: [null, [Validators.pattern(this.commonServices.url)]],
    });

    this.container['loading'] = true;
    this.apiService.get('/api/v1/customers/profile/fetch')
      .subscribe(response => {
        this.container['loading'] = false;
          this.myForm.patchValue({
            facebook: response.data.facebook,
            linkedIn: response.data.linkedIn,
            twitter: response.data.twitter,
            website: response.data.website,
            youtube: response.data.youtube,
          })
      },
      errResp => {
        this.container['loading'] = false;
        // Swal.fire('Oops...', errResp?.error?.error?.message, 'error')
      });
  }
  onSubmit() {
    this.submitting = true;
    if (this.myForm.invalid) {
      this.uiErrors = JSON.parse(JSON.stringify(this.formErrors))
      this.errors = this.commonServices.findInvalidControlsRecursive(this.myForm);
      Object.keys(this.errors).forEach((control) => {
        Object.keys(this.errors[control]).forEach(error => {
          this.uiErrors[control] = ValidationMessages[control][error];
        })
      })
      this.submitting = false;
      return;
    }
    const fd = JSON.parse(JSON.stringify(this.myForm.value));
    this.apiService.post('/api/v1/customers/update-profile', fd)
      .subscribe(response => {
        this.submitting = false;
        Swal.fire('Great!', response?.message, 'success')
      },
      errResp => {
        this.submitting = false;
        // Swal.fire('Oops...', errResp?.error?.error?.message, 'error')
      });
  }

}

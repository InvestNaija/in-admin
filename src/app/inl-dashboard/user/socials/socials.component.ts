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

  constructor(
    private fb: FormBuilder,
    private commonServices: CommonService,
    private apiService: ApiService,
    ) { }

  ngOnInit(): void {
    const reg = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?%#[]@!\$&'()*\+,;=.]+$/;
    this.myForm = this.fb.group({
      facebook: [null, [Validators.pattern(reg)]],
      linkedIn: [null, [Validators.pattern(reg)]],
      twitter: [null, [Validators.pattern(reg)]],
      website: [null, [Validators.pattern(reg)]],
      youtube: [null, [Validators.pattern(reg)]],
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
      return;
    }
    const fd = JSON.parse(JSON.stringify(this.myForm.value));
    this.apiService.post('/api/v1/auth/customers/update-profile', fd)
      .subscribe(response => {
        Swal.fire('Great!', response?.message, 'success')
      },
      errResp => {
        this.submitting = false;
        Swal.fire('Oops...', errResp?.error?.error?.message, 'error')
      });
  }

}

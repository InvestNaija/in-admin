import { formatDate } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { ApiService } from '@app/_shared/services/api.service';
import { CommonService } from '@app/_shared/services/common.service';
import { User, FormErrors, ValidationMessages } from './admin.validators';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationContextService } from '@app/_shared/services/application-context.service';
import { ToastrService } from 'ngx-toastr';
import { combineLatest, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'in-admin-detail',
  templateUrl: './admin-detail.component.html',
  styleUrls: ['./admin-detail.component.scss']
})
export class AdminUserDetailComponent implements OnInit  {
  public Editor = ClassicEditor;

  userId: string;
  roles: any;
  myForm: FormGroup;
  errors = [];
  formErrors = FormErrors;
  uiErrors = FormErrors;
  validationMessages = ValidationMessages;
  submitting = false; disableButton=false


  @ViewChild('imagePond') imagePond: any;
  container = {
    loading:true,
    imagePondFiles: [], paymentLogoPondFiles: []
  };

  pondOptions = {
    class: 'my-filepond',
    labelIdle: 'Drag Drop file <br><small>Max size: 200KB</small> ',
    acceptedFileTypes: 'image/jpg, image/jpeg, image/png',
    maxFileSize: '200KB',
    credits: ''
  };
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private aRouter: ActivatedRoute,
    private toastr: ToastrService,
    public apiService: ApiService,
    private appContext: ApplicationContextService,
    public commonServices: CommonService
    ) { }


  ngOnInit(): void {
    this.aRouter.paramMap.pipe(
      switchMap(params => {
        this.userId = params.get('id');
        return combineLatest([
          (this.userId ? this.apiService.get(`/users/${this.userId}`) : of({}) ),
          this.apiService.get(`/auth/roles`)
        ]);
      })
    ).subscribe(([user, roles]) => {
      console.log(user, roles);

      this.container['loading'] = false;

      this.roles = roles.data.sort((a, b) => (a.module > b.module ? 1 : -1));
      this.roles = this.roles.reduce((prev, now) => {
        if (!prev[now.module]) {
          prev[now.module] = [];
        }
        prev[now.module].push(now);
        return prev;
      }, {});
      // console.log(this.roles);

      this.populateMyForm(user?.data, this.roles);
      // this.container['originalForm'] = this.myForm.value;

    })
  }

  objectKey(obj) {
    return obj ? Object.keys(obj) : null;
  }

  populateMyForm(user: User, roles) {

    this.myForm = this.fb.group({
      firstname: [user?.firstname, Validators.required],
      lastname: [user?.lastname, Validators.required],
      email: [user?.email],
      phone: [user?.phone],
      dob: [user?.dob, Validators.required],
      // roles: [user?.roles],
    });

  }

  pondHandleAddFile(imgType,event) {
    if(event.error) {
      this.toastr.error(event.error.sub, event.error.main);
      return;
    }
    this.container[imgType + 'loaded'] = event.file.filename;
    this.container[imgType] = event.file.getFileEncodeDataURL();
  }
  oninit(imgType, event){
    this.container['original' + imgType + 'loaded'] = event.pond.files.get()[0] ? (event.pond.files.get()[0]).replace(/^.*[\\\/]/, '') : null;
  }

  onSubmit() {
    this.submitting = true;
    if (this.myForm.invalid) {
      this.uiErrors = JSON.parse(JSON.stringify(this.formErrors))
      this.errors = this.commonServices.findInvalidControlsRecursive(this.myForm);
      console.log(this.uiErrors);
      console.log(this.errors);


      this.displayErrors();
      this.submitting = false;
      return;
    }
    const fd = JSON.parse(JSON.stringify(this.myForm.value));
    // changes
    this.container['formChanges'] = {};
    Object.keys(fd).forEach((key) => {
      if(fd[key] != this.container['originalForm'][key]){
        this.container['formChanges'][key] = fd[key];
      }
    });
    this.container['originalimageloaded'] != this.container['imageloaded'] ?
          this.container['formChanges']['image'] = this.container['image'] : 0;
    this.container['originalpaymentLogoloaded'] != this.container['paymentLogoloaded'] ?
          this.container['formChanges']['paymentLogo'] = this.container['paymentLogo'] : 0;

    this.submituser(this.container['formChanges'])
      .subscribe(response => {
        this.submitting = false;
          this.toastr.success('Update successful!', 'success');
          this.router.navigateByUrl('/dashboard/users/list');
      },
      errResp => {
        this.submitting = false;
        this.toastr.error(errResp?.error?.error?.message, 'error')
      });
  }
  submituser(fd){
    return this.userId ? this.apiService.patch(`/users/${this.userId}`, fd) : this.apiService.post(`/users`, fd);
  }
  controlChanged(ctrlName: string) {
    this.errors = this.commonServices.controlnvalid(this.myForm.get(ctrlName) as FormControl);
    this.displayErrors();
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

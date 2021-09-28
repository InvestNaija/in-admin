import { formatDate } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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

  user: User;
  userId: string;
  roles = [];
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
          (this.userId ? this.apiService.get(`/auth/admins/fetch` + (this.userId?`?id=${this.userId}`:'')) : of({}) ),
          this.apiService.get(`/auth/roles`)
        ]);
      })
    ).subscribe(([user, roles]) => {

      this.container['loading'] = false;
      this.roles = roles.data;
      let theRoles = [];
      this.objectKey( this.roles).forEach(module => {
        this.roles[module].forEach(role => {
          user?.data?.roles.forEach(uRole => {
            if(uRole.id == role.id) role['selected'] = true;
            else role['selected'] = false;
          });
          theRoles.push(role)
        });
      });
      this.populateMyForm(user?.data, theRoles);
    })
  }

  objectKey(obj) {
    return obj ? Object.keys(obj) : null;
  }

  populateMyForm(user: User, roles) {

    this.myForm = this.fb.group({
      firstname: [user?.firstname, Validators.required],
      lastname: [user?.lastname, Validators.required],
      email: [user?.email, [Validators.required, Validators.pattern(this.commonServices.email)]],
      phone: [user?.phone, Validators.required],
      dob: [user?.dob, Validators.required]
    });

    const roleArray = new FormArray([]);
    (<Array<any>>roles).forEach(role => {
      roleArray.push(this.fb.group({
        id: role['id'], module: role['module'], permission: role['permission'], selected: role['selected']
      }));
    });
    this.myForm.setControl( 'roles', roleArray )
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
    console.log((this.myForm.value)); return;

    this.submitting = true;
    if (this.myForm.invalid) {
      this.uiErrors = JSON.parse(JSON.stringify(this.formErrors))
      this.errors = this.commonServices.findInvalidControlsRecursive(this.myForm);
      this.displayErrors();
      this.submitting = false;
      return;
    }
    const fd = JSON.parse(JSON.stringify(this.myForm.value));
    const dRoles = [];
    fd.roles.filter(element => {
      return element.selected
    });
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

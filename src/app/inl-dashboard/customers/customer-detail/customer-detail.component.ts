import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, of, Subscription } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';

import { ApiService } from '@app/_shared/services/api.service';
import { ValidationMessages, FormErrors, Customer } from './customer.validators';
import { MatTableDataSource } from '@angular/material/table';
import { ApplicationContextService } from '@app/_shared/services/application-context.service';
import { CommonService } from '@app/_shared/services/common.service';


export interface PeriodicElement {
  position: number;
  course: string;
  courseFee: number;
  category: string;
  scheduled: string;
  published: string;
  status: string;
}

@Component({
  selector: 'in-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss']
})
export class CustomerDetailComponent implements OnInit, AfterViewInit  {
  gender = [{id: 'male', bvn: 'm', name: 'Male' }, {id: 'female', bvn: 'female', name: 'Female' }];
  myForm: FormGroup;
  signupSub: Subscription
  errors = [];
  formErrors = FormErrors;
  uiErrors = FormErrors;
  validationMessages = ValidationMessages;
  container: any = {
    loading:true,
  };
  APIResponse = false; submitting = false;
  customer: any;

  custId: string;

  displayedColumns: string[] = ['productType', 'description', 'amount', 'status', 'action'];
  dataSource: any = null;
  total_count = 0;
  pageSize = 10;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private aRouter: ActivatedRoute,
    private toastr: ToastrService,
    private api: ApiService,
    private commonServices: CommonService,
  ) { }

  ngOnInit(): void {
    // console.log('Called');
  }
  ngAfterViewInit() {

    this.aRouter.paramMap.pipe(
      switchMap(params => {
        this.custId = params.get('id');
        return (this.custId ? this.api.get(`/customers/${this.custId}`) : of({}) )
      })
    ).subscribe(customer => {
      this.container['loading'] = false;

        this.customer = customer.data;
        this.customer.dob = new Date(this.customer.dob)
        this.populateMyForm(customer?.data);
      });
  }
  populateMyForm(customer: Customer) {
    console.log(customer?.address);

    this.myForm = this.fb.group({
      firstName: [customer?.firstName, Validators.required],
      middleName: [customer?.middleName],
      lastName: [customer?.lastName, Validators.required],
      email: [customer?.email, [Validators.required, Validators.pattern(this.commonServices.email)]],
      phone: [customer?.phone],
      dob: [ customer?.dob, Validators.required],
      gender: [this.gender.find(g => g.id === customer?.gender), Validators.required],
      photo: [customer?.photo],
      address: [customer?.address],
      nin: [customer?.nin],
      bvn: [customer?.bvn, [Validators.required, Validators.maxLength(10), Validators.pattern(/[0-9]+$/), Validators.minLength(11)]],
      mothersMaidenName: [customer?.mothersMaidenName, [Validators.required]], placeOfBirth: [customer?.placeOfBirth, [Validators.required]],
      zanibalId: [customer?.zanibalId]
    });
  }
  onBVNChanged() {
    let bvn = this.myForm.get('bvn').value;
    if(bvn.length === 11) {
      const chosenBank = this.myForm.get('bankCode').value;
      this.container['loadingBVN'] = true
      const fd = {
        bvn
      }
      this.api.post('/api/v1/verifications/bank-account', fd)
      .subscribe((resp: any) => {
        this.container['loadingBVN'] = false;
        this.populateMyForm(resp?.data);
      },
      errResp => {
        this.container['loadingBVN'] = false;
        this.toastr.error(errResp?.error?.error?.message, errResp.errorText)
      });
    }
  }
  onSubmit(){}
}

import { formatDate } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { ApiService } from '@app/_shared/services/api.service';
import { CommonService } from '@app/_shared/services/common.service';
import { Asset, FormErrors, ValidationMessages } from './asset.validators';
import { ActivatedRoute } from '@angular/router';
import { ApplicationContextService } from '@app/_shared/services/application-context.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'in-asset-detail',
  templateUrl: './asset-detail.component.html',
  styleUrls: ['./asset-detail.component.scss']
})
export class AssetDetailComponent implements OnInit  {
  public Editor = ClassicEditor;

  assetId: string;
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
    labelIdle: 'Drag Drop file ',
    acceptedFileTypes: 'image/jpg, image/jpeg, image/png',
    maxFileSize: '1MB',
    credits: ''
  };
  constructor(
    private fb: FormBuilder,
    private aRouter: ActivatedRoute,
    private toastr: ToastrService,
    public apiService: ApiService,
    private appContext: ApplicationContextService,
    public commonServices: CommonService
    ) { }


  ngOnInit(): void {
    this.assetId = this.aRouter.snapshot.paramMap.get('id');
    if(this.assetId){
      this.apiService.get(`/assets/${this.assetId}`)
          .subscribe(asset => {
            this.container['loading'] = false;
            this.populateMyForm(asset.data);
            this.container['originalForm'] = this.myForm.value;
          })
    } else {
      this.container['loading'] = false;
      const modal = {} as Asset;
      this.populateMyForm(modal);
      this.container['originalForm'] = this.myForm.value;
    }
  }

  populateMyForm(asset: Asset) {
    asset?.image ? this.container.imagePondFiles.push(asset?.image) : 0;
    asset?.paymentLogo ? this.container.paymentLogoPondFiles.push(asset?.paymentLogo) : 0;

    this.myForm = this.fb.group({
      type: [asset?.type, Validators.required],
      name: [asset?.name, Validators.required],
      anticipatedMinPrice: [asset?.anticipatedMinPrice],
      anticipatedMaxPrice: [asset?.anticipatedMaxPrice],
      sharePrice: [asset?.sharePrice, Validators.required],
      openForPurchase: [asset?.openForPurchase],
      availableShares: [asset?.availableShares],
      description: [asset?.description, Validators.required],
      openingDate: [(asset?.openingDate ? formatDate(asset?.openingDate, 'yyyy-MM-ddTHH:mm', 'en-US') : null), Validators.required],
      closingDate: [(asset?.closingDate ? formatDate(asset?.closingDate, 'yyyy-MM-ddTHH:mm', 'en-US') : null), Validators.required],
      maturityDate: [(asset?.maturityDate ? formatDate(asset?.maturityDate, 'yyyy-MM-ddTHH:mm', 'en-US') : null)],
      allocationDate: [(asset?.allocationDate ? formatDate(asset?.allocationDate, 'yyyy-MM-ddTHH:mm', 'en-US') : null)],
      fundingDate: [(asset?.fundingDate ? formatDate(asset?.fundingDate, 'yyyy-MM-ddTHH:mm', 'en-US') : null)],
      paymentLabel: [asset?.paymentLabel],
      subsequentMinAmount: [asset?.subsequentMinAmount],
      currency: [asset?.currency, Validators.required],
      subaccountId: [asset?.subaccountId],
      minimumNoOfUnits: [asset?.minimumNoOfUnits],
      bankName: [asset?.bankName]
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

    this.submitAsset(this.container['formChanges'])
      .subscribe(response => {
        this.submitting = false;
          this.toastr.success('Update successful!', 'success')
      },
      errResp => {
        this.submitting = false;
        this.toastr.error(errResp?.error?.error?.message, 'error')
      });
  }
  submitAsset(fd){
    return this.assetId ? this.apiService.patch(`/assets/${this.assetId}`, fd) : this.apiService.post(`/assets`, fd);
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

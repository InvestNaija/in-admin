import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '@app/_shared/services/api.service';
import { AuthService } from '@app/_shared/services/auth.service';
import Swal from 'sweetalert2';
import { FormErrors, ValidationMessages } from './documents.validators';

@Component({
  selector: 'in-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit {
  myForm: FormGroup;
  errors = [];
  formErrors = FormErrors;
  uiErrors = FormErrors;
  validationMessages = ValidationMessages;
  loading: boolean;
  uploading = false; firstFile = 0;

  profOfAddress = [
    {code: 'passport', value:  'passportNo', label: 'International Passport Number'},
    {code: 'driverLicense', value:  'driverLicenseNo', label: 'Driver\'s License'},
    {code: 'utility', value:  'utilityNo', label: 'Utility Bills'},
    {code: 'nationalId', value:  'nationalIdNo', label: 'National Identity Card'}
  ];
  profOfId = [
    {code: 'passport', value:  'passportNo', label: 'International Passport Number'},
    {code: 'driverLicense', value:  'driverLicenseNo', label: 'Driver\'s License'},
    {code: 'utility', value:  'utilityNo', label: 'Utility Bills'},
    {code: 'nationalId', value:  'nationalIdNo', label: 'National Identity Card'}
  ];
  documents = [
    {id: 'address', title: 'Proof of Address', IdType: null, idNumber: null, selectedFile:null, pondFile: []},
    {id: 'id', title: 'Proof of Id', IdType: null, idNumber: null, selectedFile:null, pondFile: []}
  ]

  pondOptions = {
    class: 'my-filepond',
    labelIdle: 'Drop files here',
    acceptedFileTypes: 'image/png, image/jpeg, image/gif',
    // beforeAddFile: function(item) {
    //   // console.log(item);
    //   // return false;
    // }
  };
  constructor(
    private apiService: ApiService,
    private auth: AuthService,
    private http: HttpClient
    ) { }

  ngOnInit(): void {
    this.loading = true;
    this.apiService.get('/api/v1/customers/documents/fetch')
      .subscribe(response => {
        this.loading = false;
        this.documents.map(doc => {
          this.profOfAddress.map(proof => {
            if(response.data[proof.code]) {
              doc.IdType = proof;
              doc.idNumber = response.data[proof.value];
              doc.pondFile.push(response.data[proof.code]);
            }
          })
          this.profOfId.map(proof => {
            if(response.data[proof.code]) {
              doc.IdType = proof;
              doc.idNumber = response.data[proof.value];
              doc.pondFile.push(response.data[proof.code]);
            }
          })
        })
      },
      errResp => {
        this.loading = false;
        Swal.fire('Oops...', errResp?.error?.error?.message, 'error')
      });
  }
  DataURIToBlob(dataURI: string) {
    const splitDataURI = dataURI.split(',')
    const byteString = splitDataURI[0].indexOf('base64') >= 0 ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1])
    const mimeString = splitDataURI[0].split(':')[1].split(';')[0]

    const ia = new Uint8Array(byteString.length)
    for (let i = 0; i < byteString.length; i++)
        ia[i] = byteString.charCodeAt(i)

    return new Blob([ia], { type: mimeString })
  }
  beforeAdd(file: any) {
    console.log(file)
  }
  onSaveFile(document: any) {
    if(!document.IdType) {
      Swal.fire('', `Please select ${document.IdType?.label} type first`, 'error');
      return;
    }
    if(document.IdType?.code !== 'UB' && !document.idNumber ) {
      Swal.fire('', `You need to provide ${document.IdType?.label} number`, 'error');
      return;
    }
    Swal.fire({
      title: 'Upload Document!',
      text: "Are you sure you want to upload document?",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Proceed!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        const fd = new FormData();
        fd.append(document['IdType']['code'], this.DataURIToBlob(document.selectedFile) );
        fd.append(document['IdType']['value'], document.idNumber);
        let headers = new HttpHeaders()
          .append('Authorization', `${this.auth.getToken()}`);
        this.http.post('/api/v1/customers/upload-documents', fd, {headers: headers})
            .subscribe((response: any) => {
              this.uploading = false;
              Swal.fire('Great!', response?.message, 'success')
            },
            errResp => {
              this.uploading = false;
              Swal.fire('Oops...', errResp?.error?.error?.message, 'error')
            })
      }
    });
  }
}

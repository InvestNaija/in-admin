import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { ToastrModule } from 'ngx-toastr';
import { MatIconModule } from '@angular/material/icon';
import { BackbuttonComponent } from './components/backbutton/backbutton.component';

import { FilePondModule, registerPlugin } from 'ngx-filepond';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type/dist/filepond-plugin-file-validate-type';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation/dist/filepond-plugin-image-exif-orientation';
import FilePondPluginImageCrop from 'filepond-plugin-image-crop/dist/filepond-plugin-image-crop';
import FilePondPluginImageResize from 'filepond-plugin-image-resize/dist/filepond-plugin-image-resize';
import FilePondPluginImageTransform from 'filepond-plugin-image-transform/dist/filepond-plugin-image-transform';
import FilePondPluginFileEncode from 'filepond-plugin-file-encode/dist/filepond-plugin-file-encode';
// import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size/dist/filepond-plugin-file-validate-size';
import FilePondPluginImageEdit from 'filepond-plugin-image-edit/dist/filepond-plugin-image-edit';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

registerPlugin(
  FilePondPluginImagePreview,
  FilePondPluginFileValidateType,
  FilePondPluginImageExifOrientation,
  FilePondPluginImageCrop,
  FilePondPluginImageResize,
  FilePondPluginImageTransform,
  FilePondPluginFileEncode,
  // FilePondPluginFileValidateSize,
  FilePondPluginImageEdit,
);

@NgModule({
  declarations: [
    PageNotFoundComponent,
    BackbuttonComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    ToastrModule.forRoot(),

    FilePondModule,
  ],
  exports: [ CommonModule, RouterModule,
    MatIconModule, BackbuttonComponent,
    ToastrModule, FormsModule, ReactiveFormsModule,
    NgSelectModule,
    FilePondModule,
  ]
})
export class SharedModule { }

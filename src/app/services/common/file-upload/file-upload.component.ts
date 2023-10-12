import { Component, Input } from '@angular/core';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { HttpClientService } from '../http-client.service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BaseComponent } from 'src/app/base/base.component';
import { AlertifyService, MessagePositions, MessageTypes } from '../../admin/alertify.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent extends BaseComponent {
  public files: NgxFileDropEntry[] = [];

  @Input()
  options!: Partial<FileUploadOptions>;

  constructor(private httpClient: HttpClientService, private alertify: AlertifyService, spinner: NgxSpinnerService) { 
    super(spinner);
  }

  public selectedFiles(files: NgxFileDropEntry[]) {
    this.files = files;
  }

  deleteFileFromList(index: number) {
    this.files.splice(index, 1);
  }

  convertFileFormat(files: NgxFileDropEntry[]): FormData {
    const fileData: FormData = new FormData();

    for (const file of files) {
      (file.fileEntry as FileSystemFileEntry).file((_file: File) => {
        fileData.append(_file.name, _file)
      });
    }
    return fileData;
  }

  uploadSelectedFiles() {
    const result = window.confirm('Are you sure you want to upload these files?');
    if(result){
      this.httpClient.post({
        controller: this.options?.controller,
        action: this.options?.action,
        headers: new HttpHeaders({ "responseType": "blob" })
      }, this.convertFileFormat(this.files)).subscribe(data => {
        this.alertify.message(`File Upload Success!`, MessageTypes.Success, MessagePositions.TopRight, 5);
        this.files = [];
      },
        (errorResponse: HttpErrorResponse) => {
          this.alertify.message(`Error occurred!`, MessageTypes.Error, MessagePositions.TopRight, 5);
        }
      );
    }
  }
}

export class FileUploadOptions {
  controller?: string;
  action?: string;
  queryString?: string;
  description?: string;
  accept?: string;
}

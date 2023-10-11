import { Component, Input } from '@angular/core';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { HttpClientService } from '../http-client.service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {
  public files: NgxFileDropEntry[] = [];

  @Input()
  options!: Partial<FileUploadOptions>;

  constructor(private httpClient: HttpClientService) { }
  public selectedFiles(files: NgxFileDropEntry[]) {
    this.files = files;
    const fileData: FormData = new FormData();
    for (const file of files) {
      (file.fileEntry as FileSystemFileEntry).file((_file: File) => {
        fileData.append(_file.name, _file)
      });
    }

    this.httpClient.post({
      controller: this.options?.controller,
      action: this.options?.action,
      headers: new HttpHeaders({"responseType" : "blob"})
    }, fileData).subscribe(data => {

    },
    (errorResponse : HttpErrorResponse) => {

    }
    );
  }

  deleteFileFromList(index: number) {
    this.files.splice(index, 1);
  }
}

export class FileUploadOptions {
  controller?: string;
  action?: string;
  queryString?: string;
  description?: string;
  accept?: string;
}

import { Component, Input } from '@angular/core';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { HttpClientService } from '../http-client.service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { AlertifyService, MessageType, Position } from '../../admin/alertify.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';
import { DataType } from 'src/app/dialogs/delete-dialog/delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { FileUploadDialogComponent } from 'src/app/dialogs/file-upload-dialog/file-upload-dialog.component';
import { DialogService } from '../dialog.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {

  constructor(
    private httpClientService: HttpClientService,
    private alertify: AlertifyService,
    private customToastrService: CustomToastrService,
    private dialog: MatDialog,
    private dialogService: DialogService
  ) { }
  public files: NgxFileDropEntry[]
  @Input() options: Partial<FileUploadOptions>

  public selectedFiles(files: NgxFileDropEntry[]) {
    this.files = files
    const fileData: FormData = new FormData()
    // tüm file ' ları tutabilmek için burada for ile tüm file'lara girmem gerekiyor.

    for (const file of files) {
      (file.fileEntry as FileSystemFileEntry).file((_file: File) => {
        fileData.append(_file.name, _file, file.relativePath);
      });
    }

    // Gönderme işlemi gerçekleşecek
    debugger
    this.dialogService.openDialog({
      componentType: FileUploadDialogComponent,
      data: DataType.Yes,
      callBack: () => {
        this.httpClientService.post({
          controller: this.options.controller,
          action: this.options.action,
          queryString: this.options.queryString,

          header: new HttpHeaders({ 'responseType': 'blob' })
        }, fileData).subscribe(data => {
          const message: string = "Dosya ekleme başarılı"

          if (this.options.isAdminPage) {
            this.alertify.message(message, {
              dismissOther: true,
              messageType: MessageType.Success,
              position: Position.TopRight
            })
          } else {
            this.customToastrService.message(message, "Başarılı", {
              messageType: ToastrMessageType.Success,
              toastrPosition: ToastrPosition.TopRight
            })
          }
        }, (errorResponse: HttpErrorResponse) => {
          const message: string = "Dosya eklenirken bir hata oluştu!"

          if (this.options.isAdminPage) {
            this.alertify.message(message, {
              dismissOther: true,
              messageType: MessageType.Error,
              position: Position.TopRight
            })
          } else {
            this.customToastrService.message(message, "Hata", {
              messageType: ToastrMessageType.Error,
              toastrPosition: ToastrPosition.TopRight
            })
          }
        })
      }
    })


  }


}

export class FileUploadOptions {
  controller?: string;
  action?: string;
  queryString?: string;
  explanation?: string;
  accept?: string;
  isAdminPage: boolean
}

import { HttpErrorResponse } from '@angular/common/http';
import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import { DataType, DeleteDialogComponent } from 'src/app/dialogs/delete-dialog/delete-dialog.component';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { ProductService } from 'src/app/services/common/models/product.service';

declare var $: any

@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {

  //
  constructor(
    private element: ElementRef,
    private _renderer: Renderer2,
    private httpClientService: HttpClientService,
    private spinner: NgxSpinnerService,
    public dialog: MatDialog,
    private alertify: AlertifyService
  ) {
    const img = _renderer.createElement("img")
    img.setAttribute("src", "../../../../../assets/delete.png")
    img.setAttribute("style", "cursor:pointer;")
    img.width = 25
    img.height = 25
    _renderer.appendChild(element.nativeElement, img)
  }

  @Output() callback: EventEmitter<any> = new EventEmitter()
  @Input() id: string
  @Input() controller: string
  @Input() alertifyName: string

  @HostListener("click")
  async onclick() {

    this.openDialog(async () => {
      this.spinner.show(SpinnerType.BallScaleMultiple)
      const td: HTMLTableCellElement = this.element.nativeElement
      this.httpClientService.delete({
        controller: this.controller
      }, this.id).subscribe(data => {
        $(td.parentElement).fadeOut(2000, () => {
          this.callback.emit()
        })
        this.alertify.message(`${this.alertifyName} başarılı bir şekilde silindi.`, {
          dismissOther: true,
          messageType: MessageType.Error,
          position: Position.TopRight
        })
      }, (errorResponse: HttpErrorResponse) => {
        this.spinner.hide(SpinnerType.BallScaleMultiple)
        this.alertify.message("Beklenmeyen bir hata ile karşılaşıldı!", {
          dismissOther: true,
          messageType: MessageType.Error,
          position: Position.TopRight
        })
      })


    })

  }

  openDialog(callback: any): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      data: DataType.Yes,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == DataType.Yes) {
        callback()
      }
    });
  }

}
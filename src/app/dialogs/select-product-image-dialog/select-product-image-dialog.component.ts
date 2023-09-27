import { Component, Inject, OnInit, Output } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FileUploadOptions } from 'src/app/services/common/file-upload/file-upload.component';
import { ProductService } from 'src/app/services/common/models/product.service';
import { List_Product_Image } from 'src/app/contracts/List_Product_Image';
import { DialogService } from 'src/app/services/common/dialog.service';
import { DataType, DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
declare var $: any
@Component({
  selector: 'app-select-product-image-dialog',
  templateUrl: './select-product-image-dialog.component.html',
  styleUrls: ['./select-product-image-dialog.component.scss']
})
export class SelectProductImageDialogComponent extends BaseDialog<SelectProductImageDialogComponent> implements OnInit {

  constructor(
    dialogRef: MatDialogRef<SelectProductImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SelectProductImageState | string,
    private productService: ProductService,
    private dialogService: DialogService,
    private spinner: NgxSpinnerService
  ) {
    super(dialogRef)
  }
  @Output() options: Partial<FileUploadOptions> = {
    accept: ".png, .jpg, .jpeg, .gif",
    controller: "products",
    action: "upload",
    queryString: `id=${this.data}`,
    explanation: "Ürün resmini seçin veya buraya sürükleyin.",
    isAdminPage: true
  }

  images: List_Product_Image[]
  async ngOnInit() {
    this.images = await this.productService.readImages(this.data as string)
  }


  deleteImages(imageId: string, event: any) {
    this.dialogService.openDialog({
      componentType: DeleteDialogComponent,
      data: DataType.Yes,
      callBack: async () => {
        this.spinner.show(SpinnerType.BallScaleMultiple)

        await this.productService.deleteImages(this.data as string, imageId, () => {
          this.spinner.hide(SpinnerType.BallScaleMultiple)
          var card = $(event.srcElement).parent().parent().parent()
          card.fadeOut(500)

        })
      }
    })
  }

  changeShowcase(imageId: string) {
    // alert(`imageId: ${imageId} - productId: ${this.data}`)
    this.spinner.show(SpinnerType.BallScaleMultiple)
    this.productService.changeShowcase(imageId, this.data as string, () => {
      debugger
      this.spinner.hide(SpinnerType.BallScaleMultiple)
    })
  }
}

export enum SelectProductImageState {
  Close
}

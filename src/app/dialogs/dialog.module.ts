import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { FileUploadDialogComponent } from './file-upload-dialog/file-upload-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FileUploadModule } from '../services/common/file-upload/file-upload.module';
import { MatButtonModule } from '@angular/material/button';
import { SelectProductImageDialogComponent } from './select-product-image-dialog/select-product-image-dialog.component';
import {MatCardImage, MatCardModule} from '@angular/material/card';
import { BasketItemRemoveDialogComponent } from './basket-item-remove-dialog/basket-item-remove-dialog.component';
import { CreateShoppingDialogComponent } from './create-shopping-dialog/create-shopping-dialog.component';


@NgModule({
  declarations: [
    DeleteDialogComponent,
    SelectProductImageDialogComponent,
    BasketItemRemoveDialogComponent,
    CreateShoppingDialogComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule, MatCardModule,
    FileUploadModule
  ]

})
export class DialogModule { }

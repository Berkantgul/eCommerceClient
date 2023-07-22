import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DeleteDirective } from '../../../directives/admin/delete.directive';
import { FileUploadModule } from '../../../services/common/file-upload/file-upload.module';
import { CreateProductComponent } from './create-product/create-product.component';
import { ListProductComponent } from './list-product/list-product.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { MatDialogModule } from '@angular/material/dialog';
import { DeleteDialogComponent } from 'src/app/dialogs/delete-dialog/delete-dialog.component';
import { FileUploadComponent } from 'src/app/services/common/file-upload/file-upload.component';
import { FileUploadDialogComponent } from 'src/app/dialogs/file-upload-dialog/file-upload-dialog.component';
import { DialogModule } from '@angular/cdk/dialog';

@NgModule({
  declarations: [
    // ProductsComponent,
    // CreateComponent,
    // ListComponent
    ProductsComponent,
    CreateProductComponent,
    ListProductComponent,
    DeleteDirective,
    // DeleteDialogComponent,
    // FileUploadDialogComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: "", component: ProductsComponent }
    ]),
    MatSidenavModule, MatFormFieldModule, MatTableModule, MatPaginatorModule, MatInputModule, MatButtonModule,
    FileUploadModule, DialogModule

  ],
  exports: [

  ]
})
export class ProductsModule { }

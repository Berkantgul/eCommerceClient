import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { RouterModule } from '@angular/router';
import { CreateProductComponent } from './create-product/create-product.component';
import { ListProductComponent } from './list-product/list-product.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
// import {MatInputModule} from '@angular/material/input';
import { MatInputModule } from '@angular/material/input'
import {MatButtonModule} from '@angular/material/button';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';



@NgModule({
  declarations: [
    ProductsComponent,
    CreateProductComponent,
    ListProductComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: "", component: ProductsComponent }
    ]),
    MatSidenavModule,
    MatFormFieldModule,
    // MatInputModule
    MatInputModule,
    MatButtonModule, MatPaginatorModule, MatTableModule
  ]
})
export class ProductsModule { }

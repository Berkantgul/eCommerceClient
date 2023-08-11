import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { List_Product } from 'src/app/contracts/list_product';
import { SelectProductImageDialogComponent } from 'src/app/dialogs/select-product-image-dialog/select-product-image-dialog.component';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { DialogService } from 'src/app/services/common/dialog.service';
import { ProductService } from 'src/app/services/common/models/product.service';
declare var $: any

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent extends BaseComponent implements OnInit {


  constructor(spinner: NgxSpinnerService, private productService: ProductService, private alertify: AlertifyService, private dialogService: DialogService) {
    super(spinner);
  }

  // table kolonları
  displayedColumns: string[] = ['name', 'stock', 'price', 'createdDate', 'updatedDate', 'images', 'edit', 'delete'];
  // Tabloya eklenecek verilerin tanımlanması
  dataSource: MatTableDataSource<List_Product> = null;
  // Pagination işlemi yapılması için gerekli olan değişken ataması
  @ViewChild(MatPaginator) paginator: MatPaginator

  addProductImage(id: string) {
    this.dialogService.openDialog({
      componentType: SelectProductImageDialogComponent,
      data: id,
      options: {
        width: "1400px"
      }
    })
  }

  async ngOnInit() {
    await this.getProducts()
  }


  async getProducts() {
    this.showSpinner(SpinnerType.BallScaleMultiple)

    // verileri çekiyorum
    // product service'de döndürdüğüm totalCount ve product listesini burada karşılıyorum.
    const allProducts: { totalCount: number; products: List_Product[] } = await this.productService.read(this.paginator ? this.paginator.pageIndex : 0, this.paginator ? this.paginator.pageSize : 5, () => this.hideSpinner(SpinnerType.BallScaleMultiple), errorMessage => (this.hideSpinner(SpinnerType.BallScaleMultiple), this.alertify.message(errorMessage, {
      dismissOther: false,
      messageType: MessageType.Error,
      position: Position.TopRight
    })))

    this.dataSource = new MatTableDataSource<List_Product>(allProducts.products)
    // Tablonun bende var olan verilerin sayısını bilmesi için sayfalama yapısına bundan haberdar ediyorum
    this.paginator.length = allProducts.totalCount
    debugger
  }

  // page değiştiğinde verilerin değişmesini tetikliyorum.
  async pageChanged() {
    await this.getProducts()
  }



}

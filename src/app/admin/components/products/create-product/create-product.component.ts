import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { Create_Product } from 'src/app/contracts/create_product';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { ProductService } from 'src/app/services/common/models/product.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent extends BaseComponent implements OnInit {

  constructor(spinner: NgxSpinnerService, private productService: ProductService, private alertify: AlertifyService) {
    super(spinner)
  }

  ngOnInit(): void {
  }

  @Output() createdProduct: EventEmitter<Create_Product> = new EventEmitter();

  create(name: HTMLInputElement, price: HTMLInputElement, stock: HTMLInputElement) {
    this.showSpinner(SpinnerType.BallScaleMultiple)
    const create_product = new Create_Product();
    create_product.name = name.value;
    create_product.price = parseFloat(price.value)
    create_product.stock = parseInt(stock.value)

    this.productService.create(create_product, () => {
      this.hideSpinner(SpinnerType.BallScaleMultiple)
      this.alertify.message("Ürün başarılı bir şekilde eklendi.", {
        messageType: MessageType.Success,
        position: Position.TopLeft,
        dismissOther: true
      })
      this.createdProduct.emit(create_product)
    }, (errorCallBack) => {
      this.alertify.message(errorCallBack, {
        dismissOther: true,
        position: Position.TopRight,
        messageType: MessageType.Error
      })
    })
  }

}

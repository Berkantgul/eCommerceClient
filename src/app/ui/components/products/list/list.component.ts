import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { BaseUrl } from 'src/app/contracts/base_url';
import { CreateBasketItem } from 'src/app/contracts/basket/create_basket_item';
import { List_Product } from 'src/app/contracts/list_product';
import { FileService } from 'src/app/services/common/file.service';
import { BasketService } from 'src/app/services/common/models/basket.service';
import { ProductService } from 'src/app/services/common/models/product.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent implements OnInit {

  products: List_Product[]
  currentPageNo: number
  pageSize: number = 12
  totalProductCount: number
  pageList: number[] = []
  totalPageCount: number
  baseUrl: BaseUrl
  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute, private fileService: FileService, spinner: NgxSpinnerService, private basketService: BasketService) { super(spinner) }

  async ngOnInit() {
    this.baseUrl = await this.fileService.getStorageUrl();

    this.activatedRoute.params.subscribe(async params => {
      this.currentPageNo = parseInt(params["pageNo"] ?? 1)
      const data: { totalCount: number; products: List_Product[] } = await this.productService.read((this.currentPageNo - 1), this.pageSize, () => { }, errorMessage => { })

      this.products = data.products

      this.products = this.products.map<List_Product>(p => {
        const listProduct: List_Product = {
          id: p.id,
          createdDate: p.createdDate,
          name: p.name,
          price: p.price,
          stock: p.stock,
          updatedDate: p.updatedDate,
          productImageFiles: p.productImageFiles,
          imagePath: p.productImageFiles.length ? p.productImageFiles.find(p => p.showcase)?.path : ""
        };
        return listProduct;
      });

      this.totalProductCount = data.totalCount
      this.totalPageCount = Math.ceil(this.totalProductCount / this.pageSize)

      this.pageList = []

      if (this.totalPageCount >= 7) {

        if (this.currentPageNo - 3 <= 0)
          for (let i = 1; i <= 7; i++)
            this.pageList.push(i);

        else if (this.currentPageNo + 3 >= this.totalPageCount)
          for (let i = this.totalPageCount - 6; i <= this.totalPageCount; i++)
            this.pageList.push(i);

        else
          for (let i = this.currentPageNo - 3; i <= this.currentPageNo + 3; i++)
            this.pageList.push(i);
      }

      else {
        for (let i = 1; i <= this.totalPageCount; i++) {
          this.pageList.push(i);
        }
      }
    })
  }

  async addToBasketItem(productId: string) {
    console.log(productId)
    this.showSpinner(SpinnerType.BallScaleMultiple)
    let basketItem: CreateBasketItem = new CreateBasketItem()
    basketItem.productId = productId
    basketItem.quantity = 1

    await this.basketService.add(basketItem)
    this.hideSpinner(SpinnerType.BallScaleMultiple)
  }



}

import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { ListBasketItem } from 'src/app/contracts/basket/list_basket_item';
import { UpdateBasketItem } from 'src/app/contracts/basket/update_basket_item';
import { BasketService } from 'src/app/services/common/models/basket.service';
declare var $: any;
@Component({
  selector: 'app-baskets',
  templateUrl: './baskets.component.html',
  styleUrls: ['./baskets.component.scss']
})
export class BasketsComponent extends BaseComponent implements OnInit {


  listBasketItems: ListBasketItem[] = []


  constructor(
    spinner: NgxSpinnerService,
    private basketService: BasketService
  ) { super(spinner) }

  async ngOnInit() {
    this.listBasketItems = await this.basketService.getBasketItems()
  }


  async ChangeQuantity(object: any) {
    this.showSpinner(SpinnerType.BallScaleMultiple)

    const basketItemId: string = object.target.attributes["id"].value
    const quantity: number = object.target.value

    const basketItem: UpdateBasketItem = new UpdateBasketItem()

    basketItem.basketItemId = basketItemId
    basketItem.quantity = quantity

    await this.basketService.update(basketItem)
    this.hideSpinner(SpinnerType.BallScaleMultiple)
  }

  async RemoveBasketItem(basketItemId: string) {
    this.showSpinner(SpinnerType.BallScaleMultiple)

    await this.basketService.remove(basketItemId)

    var c = $("." + basketItemId)
    $("#" + basketItemId).fadeOut(500, () => this.hideSpinner(SpinnerType.BallScaleMultiple));
    debugger
  }



}

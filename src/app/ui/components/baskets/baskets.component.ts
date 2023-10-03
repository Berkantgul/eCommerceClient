import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { ListBasketItem } from 'src/app/contracts/basket/list_basket_item';
import { UpdateBasketItem } from 'src/app/contracts/basket/update_basket_item';
import { CreateOrder } from 'src/app/contracts/order/create_order';
import { BasketItemDeleteState, BasketItemRemoveDialogComponent } from 'src/app/dialogs/basket-item-remove-dialog/basket-item-remove-dialog.component';
import { CreateShoppingDialogComponent, CreateShoppingState } from 'src/app/dialogs/create-shopping-dialog/create-shopping-dialog.component';
import { DialogService } from 'src/app/services/common/dialog.service';
import { BasketService } from 'src/app/services/common/models/basket.service';
import { OrderService } from 'src/app/services/common/models/order.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';
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
    private basketService: BasketService,
    private orderService: OrderService,
    private toastr: CustomToastrService,
    private dialogService: DialogService,
    private router: Router
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

  RemoveBasketItem(basketItemId: string) {

    $("#basketModal").modal("hide");
    this.dialogService.openDialog({
      componentType: BasketItemRemoveDialogComponent,
      data: BasketItemDeleteState.Yes,
      callBack: async () => {
        this.showSpinner(SpinnerType.BallScaleMultiple)

        $("#exampleModal").modal("show")

        await this.basketService.remove(basketItemId)

        var c = $("." + basketItemId)
        $("#" + basketItemId).fadeOut(500, () => this.hideSpinner(SpinnerType.BallScaleMultiple));
        debugger
      }
    })


  }

  shoppingCreate() {

    $("#basketModal").modal("hide")
    this.dialogService.openDialog({
      componentType: CreateShoppingDialogComponent,
      data: CreateShoppingState.Yes,
      callBack: async () => {
        this.showSpinner(SpinnerType.BallScaleMultiple)
        let order: CreateOrder = new CreateOrder()
        order.address = "Arnavutköy"
        order.description = "falanca filanca"
        await this.orderService.create(order, () => {
          this.toastr.message("Siparişiniz işleme alınmıştır", "Güle Güle kullanın!", {
            messageType: ToastrMessageType.Success,
            toastrPosition: ToastrPosition.TopRight
          })
          this.hideSpinner(SpinnerType.BallScaleMultiple)
        })
        this.router.navigate(["/"])

      }
    })


    this.hideSpinner(SpinnerType.BallScaleMultiple)
  }



}

import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { CreateBasketItem } from 'src/app/contracts/basket/create_basket_item';
import { Observable, firstValueFrom } from 'rxjs';
import { ListBasketItem } from 'src/app/contracts/basket/list_basket_item';
import { UpdateBasketItem } from 'src/app/contracts/basket/update_basket_item';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  constructor(private httpClientService: HttpClientService) { }

  add(basketItem: CreateBasketItem): Promise<void> {
    const observable: Observable<any> = this.httpClientService.post({
      controller: "baskets"
    }, basketItem)

    return firstValueFrom(observable)
  }

  getBasketItems(): Promise<ListBasketItem[]> {
    const observale: Observable<ListBasketItem[]> = this.httpClientService.get({
      controller: "baskets"
    })

    return firstValueFrom(observale)
  }

  remove(BasketItemId: string): Promise<void> {
    const observable: Observable<any> = this.httpClientService.delete({
      controller: "baskets"
    }, BasketItemId)
    debugger
    return firstValueFrom(observable)
  }

  update(updateBasketItem: UpdateBasketItem): Promise<void> {
    const observable: Observable<any> = this.httpClientService.update({
      controller: "baskets"
    }, updateBasketItem)

    return firstValueFrom(observable)
  }
}

import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Create_Product } from 'src/app/contracts/create_product';
import { HttpErrorResponse } from '@angular/common/http';
import { List_Product } from 'src/app/contracts/list_product';
import { Observable, first, firstValueFrom } from 'rxjs';
import { List_Product_Image } from 'src/app/contracts/List_Product_Image';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClientService: HttpClientService) { }

  create(product: Create_Product, successCallBack?: any, errorCallBack?: (errorMessage: string) => void
  ) {
    this.httpClientService.post({
      controller: "Products"
    }, product)
      .subscribe(result => {
        successCallBack();
      }, (errorResponse: HttpErrorResponse) => {
        const _error: Array<{ key: string, value: Array<string> }> = errorResponse.error

        let message = ""
        _error.forEach((v, index) => {
          v.value.forEach((_v, _index) => {
            message += `${_v}<br>`
          });
        });
        errorCallBack(message);
      })
  }

  // async olarak oluşturduğum read fonksiyonu parametre olarak verdiğim page ve size parametreleri ve successCallBack ve errorCallBack fonksiyoları ile çalışacak geriye totalCount ve product listesi dönecek.
  async read(page: number = 0, size: number = 5, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void): Promise<{ totalCount: number; products: List_Product[] }> {
    const promiseData: Promise<{ totalCount: number; products: List_Product[] }> = this.httpClientService.get<{ totalCount: number; products: List_Product[] }>({
      controller: "products",
      queryString: `page=${page}&size=${size}`
    }).toPromise();

    promiseData.then(d => successCallBack())
      .catch((errorResponse: HttpErrorResponse) => errorCallBack(errorResponse.message))
    // debugger
    return await promiseData;
  }

  async delete(id: string) {
    const deleteObservable: Observable<any> = this.httpClientService.delete({
      controller: "products"
    }, id);
    debugger;
    await firstValueFrom(deleteObservable)
  }

  async readImages(id: string) {
    const getObservable: Observable<List_Product_Image[]> = this.httpClientService.get<List_Product_Image[]>({
      controller: "products",
      action: "getproductimage"
    }, id)

    return await firstValueFrom(getObservable)

  }

  async deleteImages(id: string, imageId: string, successCallBack?: () => void) {
    const deleteObservable = this.httpClientService.delete({
      controller: "products",
      action: "deleteproductimage",
      queryString: `imageId=${imageId}`,
    }, id)

    await firstValueFrom(deleteObservable)
    successCallBack();
  }

  async changeShowcase(imageId: string, productId: string, successCallBack?: () => void): Promise<void> {
    const changeShowcaseImageObservable = this.httpClientService.get({
      controller: "products",
      action: "ChangeShowcase",
      queryString: `imageId=${imageId}&productId=${productId}`
    });

    await firstValueFrom(changeShowcaseImageObservable)

    successCallBack()
  }
}

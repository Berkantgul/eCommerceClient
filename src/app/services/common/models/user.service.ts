import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { User } from 'src/app/entities/user';
import { Observable, firstValueFrom } from 'rxjs';
import { Create_User } from 'src/app/contracts/user/create-user';
import { TokenResponse } from 'src/app/contracts/token/tokenResponse';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClientService: HttpClientService, private toastrService: CustomToastrService) { }

  async createUser(user: User): Promise<Create_User> {
    const observable: Observable<Create_User | User> = this.httpClientService.post<Create_User | User>({
      controller: "users",
    }, user)

    return await firstValueFrom(observable) as Create_User
  }

  async login(userNameOrEmail: string, password: string, callBackFunction: () => void): Promise<any> {
    const observable: Observable<any | TokenResponse> = this.httpClientService.post<any | TokenResponse>({
      controller: "users",
      action: "login"
    }, { userNameOrEmail, password })

    const tokenResponse: TokenResponse = await firstValueFrom(observable) as TokenResponse
    if (tokenResponse) {
      localStorage.setItem("accesstoken", tokenResponse.token.accessToken)

      this.toastrService.message("Kullanıcı girişi başarıyla sağlanmıştır", "Giriş Başarılı", {
        messageType: ToastrMessageType.Success,
        toastrPosition: ToastrPosition.TopRight
      })
    }

    callBackFunction()
  }
}

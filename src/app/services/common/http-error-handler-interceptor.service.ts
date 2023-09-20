import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../ui/custom-toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import { UserAuthService } from './models/user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerInterceptorService implements HttpInterceptor {

  constructor(private toastr: CustomToastrService, private spinner: NgxSpinnerService, private userAuthService: UserAuthService) { }

  // req -> gelen istek
  // next -> nasıl devam edecek
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // araya girdikten sonra ilk olarak fonksiyonu salacağım
    // return next ile devamını getirmesini istiyorum
    // neyin devamını getir? buradaki request'i handle ederek devamını getir(Http isteğini api'a ulaştır)
    // bunu ulaştırırkende pipe ile bir rxjs fonksiyonu devreye sokacağım
    // catchError() adlı fonksiyon devreye girsin
    // bu fonksiyonda ne yapıyoruz?
    // eğer ki bir hata meydana gelirse o hatayı burada handle et
    // catchError() hatayı bizlere observable olarak sunuyor
    return next.handle(req).pipe(catchError(error => {
      // catchEror() operator function döndürmek zorunda
      console.log(error)
      switch (error.status) {
        case HttpStatusCode.InternalServerError:
          this.toastr.message("Sunucuya erişilemiyor!", "Sunucu Hatası!", {
            toastrPosition: ToastrPosition.TopFullWidth,
            messageType: ToastrMessageType.Warning
          })
          break;

        case HttpStatusCode.Unauthorized:
          this.toastr.message("Bu işlemi yapmaya yetkiniz bulunmuyor!", "Yetkisiz İşlem!", {
            toastrPosition: ToastrPosition.TopFullWidth,
            messageType: ToastrMessageType.Warning
          })

          this.userAuthService.refreshTokenLogin(localStorage.getItem("refreshtoken")).then((data => {

          }))
          break;

        case HttpStatusCode.BadRequest:
          this.toastr.message("Geçersiz istek yapıldı!", "Geçersiz İstek! ", {
            toastrPosition: ToastrPosition.TopFullWidth,
            messageType: ToastrMessageType.Warning
          })
          break;

        case HttpStatusCode.NotFound:
          this.toastr.message("Sayfa bulunamadı !", "Hata!", {
            toastrPosition: ToastrPosition.TopFullWidth,
            messageType: ToastrMessageType.Warning
          })
          break;
        default:
          this.toastr.message("Beklenmedik bir hata oluştu daha sonra tekrar deneyin", "Başarısız İşlem", {
            toastrPosition: ToastrPosition.TopFullWidth,
            messageType: ToastrMessageType.Warning
          })
          break;
      }
      this.spinner.hide(SpinnerType.BallScaleMultiple)
      return of(error)    // observable geriye döndürdük
    }))
  }
}

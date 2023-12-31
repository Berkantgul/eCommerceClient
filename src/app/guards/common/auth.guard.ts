import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { SpinnerType } from 'src/app/base/base.component';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private jwtHelperService: JwtHelperService, private router: Router, private toastrService: CustomToastrService, private spinnerService: NgxSpinnerService) {


  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    this.spinnerService.show(SpinnerType.BallScaleMultiple)

    const token: string = localStorage.getItem("accesstoken")

    let expired: boolean
    try {
      expired = this.jwtHelperService.isTokenExpired(token)
    } catch {
      expired = true
    }

    if (!token || expired) {
      this.router.navigate(["login"], { queryParams: { returnUrl: state.url } })
      this.toastrService.message("Oturum açmanız gerekiyor.", "Yetkisiz Erişim!", {
        messageType: ToastrMessageType.Info,
        toastrPosition: ToastrPosition.TopRight
      })
    }

    this.spinnerService.hide(SpinnerType.BallScaleMultiple)
    return true;
  }

}

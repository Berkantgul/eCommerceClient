import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private jwtHelperService: JwtHelperService, private spinnerService: NgxSpinnerService) { }

  identityCheck() {
    const token: string = localStorage.getItem("accesstoken")
    this.spinnerService.show(SpinnerType.BallScaleMultiple)
    let expired: boolean
    try {
      expired = this.jwtHelperService.isTokenExpired(token)
    } catch {
      expired = true
    }

    _isAuthenticated = token != null && !expired
  }

  get isAuthenticated(): boolean {
    return _isAuthenticated
  }
}

export let _isAuthenticated : boolean

import { FacebookLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { AuthService } from 'src/app/services/common/auth.service';
import { UserService } from 'src/app/services/common/models/user.service';
import { UserAuthService } from '../../../services/common/models/user-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent {


  constructor(
    spinner: NgxSpinnerService,
    private userAuthService: UserAuthService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private socialAuthService: SocialAuthService
  ) {
    super(spinner);
    this.socialAuthService.authState.subscribe(async (user: SocialUser) => {
      console.log(user)
      this.showSpinner(SpinnerType.BallScaleMultiple)
      switch (user.provider) {
        case "GOOGLE":
          await userAuthService.googleLogin(user, () => {
            this.authService.identityCheck()
            this.hideSpinner(SpinnerType.BallScaleMultiple)
          })
          break;
        case "FACEBOOK":
          await userAuthService.facebookLogin(user, () => {
            this.authService.identityCheck()
            this.hideSpinner(SpinnerType.BallScaleMultiple)
          })
          break;
        default:
          break;
      }


    })
  }

  async loginUser(usernameOrEmail: string, password: string) {
    this.showSpinner(SpinnerType.BallScaleMultiple);
    await this.userAuthService.login(usernameOrEmail, password, () => {
      this.authService.identityCheck();

      this.activatedRoute.queryParams.subscribe(params => {
        const returnUrl: string = params["returnUrl"];
        if (returnUrl)
          this.router.navigate([returnUrl]);
      });
      this.hideSpinner(SpinnerType.BallScaleMultiple);
    });
  }

  facebookLogin() {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID)
  }
}

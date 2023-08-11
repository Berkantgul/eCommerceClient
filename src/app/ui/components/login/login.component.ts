import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { UserService } from 'src/app/services/common/models/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent {


  constructor(
    spinner: NgxSpinnerService,
    private userService: UserService
  ) {
    super(spinner);

  }

  async loginUser(userNameOrEmail: string, password: string) {
    this.showSpinner(SpinnerType.BallScaleMultiple)
    await this.userService.login(userNameOrEmail, password, () => {
      this.hideSpinner(SpinnerType.BallScaleMultiple)
    })
  }
}

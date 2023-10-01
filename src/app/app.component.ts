import { Component } from '@angular/core';
import { AuthService } from './services/common/auth.service';
import { Router } from '@angular/router';
import { HttpClientService } from '././services/common/http-client.service';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'eCommerceClient';

  constructor(
    public authService: AuthService,
    private router: Router
  ) {
    this.authService.isAuthenticated

  }

  signOut() {
    localStorage.removeItem("accesstoken")
    this.authService.identityCheck()
    this.router.navigate([""])
  }
}


//$.get("https://localhost:7046/api/Products")

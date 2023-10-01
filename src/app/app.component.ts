import { Component, ViewChild } from '@angular/core';
import { AuthService } from './services/common/auth.service';
import { Router } from '@angular/router';
import { HttpClientService } from '././services/common/http-client.service';
import { DynamicComponentLoadDirective } from './directives/common/dynamic-component-load.directive';
import { ComponentType, DynamicComponentLoadService } from './services/common/dynamic-component-load.service';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'eCommerceClient';
  @ViewChild(DynamicComponentLoadDirective, { static: true })
  dynamicComponentLoadDirective: DynamicComponentLoadDirective

  constructor(
    public authService: AuthService,
    private router: Router,
    private dynamicComponentLoadService: DynamicComponentLoadService
  ) {
    this.authService.isAuthenticated

  }

  signOut() {
    localStorage.removeItem("accesstoken")
    this.authService.identityCheck()
    this.router.navigate([""])
  }

  loadComponent() {
    this.dynamicComponentLoadService.loadComponent(ComponentType.BasketsComponent, this.dynamicComponentLoadDirective.viewContainerRef)
  }
}


//$.get("https://localhost:7046/api/Products")

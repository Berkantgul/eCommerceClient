import { Injectable, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DynamicComponentLoadService {

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  async loadComponent(component: ComponentType, viewContainerRef: ViewContainerRef) {
    let _commponent: any = null
    switch (component) {
      case ComponentType.BasketsComponent:
        _commponent = (await (import("../../ui/components/baskets/baskets.component"))).BasketsComponent
        break;

    }

    viewContainerRef.clear()
    return viewContainerRef.createComponent(this.componentFactoryResolver.resolveComponentFactory(_commponent))
  }
}

export enum ComponentType {
  BasketsComponent
}

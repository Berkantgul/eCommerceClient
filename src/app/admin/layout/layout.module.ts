import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { ComponentsModule } from './components/components.module';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';



@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    RouterModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatSidenavModule
  ],
  exports: [
    LayoutComponent
  ]
})
export class LayoutModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from './layout/layout.module';
import { ComponentsModule } from './components/components.module';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LayoutModule,
    ComponentsModule,
    RouterModule
  ],
  exports:[
    LayoutModule
  ]
})
export class AdminModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyServicesRoutingModule } from './my-services-routing.module';
import { OntimizeWebModule } from 'ontimize-web-ngx';
import { MyServicesHomeComponent } from './my-services-home/my-services-home.component';


@NgModule({
  declarations: [
    MyServicesHomeComponent
  ],
  imports: [
    CommonModule,
    OntimizeWebModule,
    MyServicesRoutingModule
  ]
})
export class MyServicesModule { }

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MyServicesRoutingModule } from "./my-services-routing.module";
import { OntimizeWebModule } from "ontimize-web-ngx";
import { MyServicesHomeComponent } from "./my-services-home/my-services-home.component";
import { MyServicesDetailComponent } from "./my-services-detail/my-services-detail.component";
import { MyServicesNewComponent } from "./my-services-new/my-services-new.component";

@NgModule({
	declarations: [MyServicesHomeComponent, MyServicesDetailComponent, MyServicesNewComponent],
	imports: [CommonModule, OntimizeWebModule, MyServicesRoutingModule],
})
export class MyServicesModule {}

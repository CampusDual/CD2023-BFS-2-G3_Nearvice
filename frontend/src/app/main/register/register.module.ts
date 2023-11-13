import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { RegisterRoutingModule } from "./register-routing.module";
import { RegisterHomeComponent } from "./register-home/register-home.component";
import { OntimizeWebModule } from "ontimize-web-ngx";
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
	declarations: [RegisterHomeComponent],
	imports: [CommonModule, RegisterRoutingModule, OntimizeWebModule, SharedModule],
	exports: [RegisterHomeComponent],
})
export class RegisterModule {}

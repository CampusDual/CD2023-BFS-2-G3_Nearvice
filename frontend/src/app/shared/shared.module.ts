import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { OntimizeWebModule } from "ontimize-web-ngx";
import { OMapModule } from "ontimize-web-ngx-map";

@NgModule({
	imports: [OntimizeWebModule, OMapModule],
	declarations: [],
	exports: [CommonModule, OMapModule],
})
export class SharedModule {}

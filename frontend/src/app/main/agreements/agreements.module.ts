import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AgreementsRoutingModule } from "./agreements-routing.module";
import { OntimizeWebModule } from "ontimize-web-ngx";
import { AgreementsHomeComponent } from "./agreements-home/agreements-home.component";
import { AgreementsNewComponent } from "./agreements-new/agreements-new.component";
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
	declarations: [AgreementsNewComponent, AgreementsHomeComponent],
	imports: [CommonModule, AgreementsRoutingModule, OntimizeWebModule, SharedModule],
	exports: [AgreementsHomeComponent, AgreementsNewComponent],
})
export class AgreementsModule {}

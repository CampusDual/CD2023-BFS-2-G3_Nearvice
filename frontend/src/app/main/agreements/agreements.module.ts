import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AgreementsRoutingModule } from "./agreements-routing.module";
import { OntimizeWebModule } from "ontimize-web-ngx";
import { AgreementsHomeComponent } from "./agreements-home/agreements-home.component";
import { AgreementsNewComponent } from "./agreements-new/agreements-new.component";

@NgModule({
	declarations: [AgreementsHomeComponent, AgreementsNewComponent],
	imports: [CommonModule, AgreementsRoutingModule, OntimizeWebModule],
})
export class AgreementsModule {}

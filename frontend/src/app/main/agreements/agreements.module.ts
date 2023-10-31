import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AgreementsRoutingModule } from "./agreements-routing.module";
import { OntimizeWebModule } from "ontimize-web-ngx";
import { AgreementsNewComponent } from "./agreements-new/agreements-new.component";
import { SharedModule } from "src/app/shared/shared.module";
import { AgreementsDetailComponent } from "./agreements-detail/agreements-detail.component";
import { AgreementsNavigationComponent } from "./agreements-navigation/agreements-navigation.component";

@NgModule({
	declarations: [AgreementsNewComponent, AgreementsNavigationComponent, AgreementsDetailComponent],
	imports: [CommonModule, AgreementsRoutingModule, OntimizeWebModule, SharedModule],
	exports: [AgreementsNavigationComponent, AgreementsNewComponent, AgreementsDetailComponent],
})
export class AgreementsModule {}

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { WorksRoutingModule } from "./works-routing.module";
import { WorksNavigationComponent } from "./works-navigation/works-navigation.component";
import { SharedModule } from "src/app/shared/shared.module";
import { OntimizeWebModule } from "ontimize-web-ngx";

@NgModule({
	declarations: [WorksNavigationComponent],
	imports: [CommonModule, WorksRoutingModule, OntimizeWebModule, SharedModule],
	exports: [WorksNavigationComponent],
})
export class WorksModule {}

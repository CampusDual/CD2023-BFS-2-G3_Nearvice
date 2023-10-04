import { NgModule } from "@angular/core";
import { OntimizeWebModule } from "ontimize-web-ngx";

import { SharedModule } from "../../shared/shared.module";
import { HomeRoutingModule } from "./home-routing.module";
import { HomeComponent } from "./home.component";
import { HomeDetailCardComponent } from "./home-detail-card/home-detail-card.component";

@NgModule({
	imports: [SharedModule, OntimizeWebModule, HomeRoutingModule],
	declarations: [HomeComponent, HomeDetailCardComponent],
})
export class HomeModule {}

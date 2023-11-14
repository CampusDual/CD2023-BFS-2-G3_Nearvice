import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AnnouncesRoutingModule } from "./announces-routing.module";
import { AnnouncesDetailComponent } from "./announces-detail/announces-detail.component";
import { OntimizeWebModule } from "ontimize-web-ngx";
import { AnnouncesHomeComponent } from "./announces-home/announces-home.component";
import { OMapModule } from "ontimize-web-ngx-map";

@NgModule({
	declarations: [AnnouncesHomeComponent, AnnouncesDetailComponent],
	imports: [CommonModule, OntimizeWebModule, AnnouncesRoutingModule, OMapModule],
})
export class AnnouncesModule {}

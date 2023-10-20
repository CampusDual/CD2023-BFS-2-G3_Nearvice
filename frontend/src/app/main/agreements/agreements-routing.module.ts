import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AgreementsHomeComponent } from "./agreements-home/agreements-home.component";
import { AgreementsNewComponent } from "./agreements-new/agreements-new.component";

const routes: Routes = [
	{
		path: "",
		component: AgreementsHomeComponent,
	},
	{
		path: ":C_ID",
		component: AgreementsNewComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AgreementsRoutingModule {}

import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AnnouncesDetailComponent } from "./announces-detail/announces-detail.component";
import { AnnouncesHomeComponent } from "./announces-home/announces-home.component";

const routes: Routes = [
	{
		path: "",
		component: AnnouncesHomeComponent,
	},
	{
		path: "/detail",
		component: AnnouncesDetailComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AnnouncesRoutingModule {}

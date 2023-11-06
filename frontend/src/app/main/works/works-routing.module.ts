import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { WorksNavigationComponent } from "./works-navigation/works-navigation.component";

const routes: Routes = [
	{
		path: "",
		component: WorksNavigationComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class WorksRoutingModule {}

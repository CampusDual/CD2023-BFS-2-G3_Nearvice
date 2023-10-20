import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuardService } from "ontimize-web-ngx";

import { MainComponent } from "./main.component";

export const routes: Routes = [
	{
		path: "",
		component: MainComponent,
		canActivate: [AuthGuardService],
		children: [
			{ path: "", redirectTo: "home", pathMatch: "full" },
			{
				path: "home",
				loadChildren: () => import("./home/home.module").then((m) => m.HomeModule),
			},
			{
				path: "services",
				loadChildren: () =>
					import("./my-services/my-services.module").then((m) => m.MyServicesModule),
			},
			{
				path: "mailbox",
				loadChildren: () => import("./mailbox/mailbox.module").then((m) => m.MailboxModule),
			},
			{
				path: "agreements",
				loadChildren: () =>
					import("./agreements/agreements.module").then((m) => m.AgreementsModule),
			},
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class MainRoutingModule {}

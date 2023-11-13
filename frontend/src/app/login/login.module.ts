import { NgModule } from "@angular/core";
import { OntimizeWebModule } from "ontimize-web-ngx";

import { SharedModule } from "../shared/shared.module";
import { LoginRoutingModule } from "./login-routing.module";
import { LoginComponent } from "./login.component";
import { RegisterModule } from "../main/register/register.module";

@NgModule({
	imports: [SharedModule, OntimizeWebModule, LoginRoutingModule, RegisterModule],
	declarations: [LoginComponent],
})
export class LoginModule {}

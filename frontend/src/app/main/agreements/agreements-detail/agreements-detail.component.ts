import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { OFormComponent } from "ontimize-web-ngx";

@Component({
	selector: "agreements-detail",
	templateUrl: "./agreements-detail.component.html",
	styleUrls: ["./agreements-detail.component.scss"],
})
export class AgreementsDetailComponent implements OnInit {
	@Input() isClient: boolean;
	@ViewChild("agreementForm", { static: false }) form: OFormComponent;
	constructor() {}

	ngOnInit() {}
	imClient() {}
}

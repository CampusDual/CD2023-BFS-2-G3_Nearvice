import { Component, OnInit, ViewChild } from "@angular/core";
import { OTableColumn } from "ontimize-web-ngx";

@Component({
	selector: "app-my-services-home",
	templateUrl: "./my-services-home.component.html",
	styleUrls: ["./my-services-home.component.css"],
})
export class MyServicesHomeComponent implements OnInit {
	@ViewChild("acceptedAgreements", { static: false }) accAg: OTableColumn;
	constructor() {}

	ngOnInit() {}

	getData(event) {
		console.log(event);
		if (event[1].ACCEPTED_AGREEMENTS_COUNT == undefined) {
			console.log(this.accAg);
		}
	}
}

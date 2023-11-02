import { Component, OnInit, ViewChild } from "@angular/core";
import { OTableColumn } from "ontimize-web-ngx";

@Component({
	selector: "app-my-services-home",
	templateUrl: "./my-services-home.component.html",
	styleUrls: ["./my-services-home.component.css"],
})
export class MyServicesHomeComponent implements OnInit {
	@ViewChild("acceptedAgreements", { static: false }) accAg: OTableColumn;
	cell = document.getElementById("acceptedAgreements");
	constructor() {}

	ngOnInit() {}

	getData(event) {
		event.forEach((row) => {
			if (row["ACCEPTED_AGREEMENTS_COUNT"] == null) {
				row["ACCEPTED_AGREEMENTS_COUNT"] = 0;
			}
		});
	}
}

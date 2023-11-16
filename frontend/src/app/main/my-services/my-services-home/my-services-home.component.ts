import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { OTableColumn } from "ontimize-web-ngx";

@Component({
	selector: "app-my-services-home",
	templateUrl: "./my-services-home.component.html",
	styleUrls: ["./my-services-home.component.css"],
})
export class MyServicesHomeComponent implements OnInit {
	showServicesTable: boolean = true;
	@ViewChild("acceptedAgreements", { static: false }) accAg: OTableColumn;
	cell = document.getElementById("acceptedAgreements");
	constructor(private router: Router) {}

	ngOnInit() {}

	goToNewService() {
		this.router.navigateByUrl("main/services/new");
	}

	getData(event) {
		console.log(event);
		if (event.length <= 0) {
			this.showServicesTable = false;
		}
		event.forEach((row) => {
			if (row["ACCEPTED_AGREEMENTS_COUNT"] == null) {
				row["ACCEPTED_AGREEMENTS_COUNT"] = 0;
			}
		});
	}
}

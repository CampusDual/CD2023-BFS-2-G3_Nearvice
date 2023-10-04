import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { OCheckboxComponent } from "ontimize-web-ngx";

@Component({
	selector: "app-my-services-new",
	templateUrl: "./my-services-new.component.html",
	styleUrls: ["./my-services-new.component.css"],
})
export class MyServicesNewComponent implements OnInit, AfterViewInit {
	@ViewChild("ocheckbox", { static: true }) check: OCheckboxComponent;
	constructor() {}

	ngOnInit() {
		console.log(this.check);
	}

	ngAfterViewInit(): void {
		console.log(this.check);
	}
}

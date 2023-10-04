import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { OFormComponent } from "ontimize-web-ngx";

@Component({
	selector: "home-detail-card",
	templateUrl: "./home-detail-card.component.html",
	styleUrls: ["./home-detail-card.component.css"],
})
export class HomeDetailCardComponent implements OnInit {
	@Input() data: any;
	@ViewChild("form", { static: false }) form: OFormComponent;

	constructor() {}

	ngOnInit() {}
	onAction1() {
		if (this.form && this.form.insert) {
			this.form.insert();
		}
	}
}

import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { OFormComponent } from "ontimize-web-ngx";

@Component({
	selector: "home-detail-card",
	templateUrl: "./home-detail-card.component.html",
	styleUrls: ["./home-detail-card.component.css"],
})
export class HomeDetailCardComponent implements OnInit {
	@Input() data: any;
	@ViewChild("form", { static: false }) form: OFormComponent;
	@ViewChild("formC", { static: false }) formC: OFormComponent;

	constructor(private router: Router) {}

	ngOnInit() {}
	onActionC() {
		if (this.formC && this.formC.insert) {
			this.formC.insert();
		}
		//this.router.navigateByUrl("main/mailbox");
	}

	onAction1() {
		if (this.form && this.form.insert) {
			this.form.insert();
		}
		//this.router.navigateByUrl("main/mailbox");
	}
}

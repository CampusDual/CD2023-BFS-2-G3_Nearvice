import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { OFormComponent } from "ontimize-web-ngx";

@Component({
	selector: "app-agreements-new",
	templateUrl: "./agreements-new.component.html",
	styleUrls: ["./agreements-new.component.css"],
})
export class AgreementsNewComponent implements OnInit {
	c_id: number;

	@ViewChild("agreementForm", { static: false }) form: OFormComponent;

	constructor(private route: ActivatedRoute) {}

	ngOnInit() {
		this.route.params.subscribe((params) => {
			this.c_id = params["C_ID"];
		});
	}

	offerSend() {
		if (this.form && this.form.insert) {
			this.form.insert();
		}
	}
}

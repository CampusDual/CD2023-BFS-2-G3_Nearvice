import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { OFormComponent, OTextInputComponent } from "ontimize-web-ngx";

@Component({
	selector: "agreements-new",
	templateUrl: "./agreements-new.component.html",
	styleUrls: ["./agreements-new.component.css"],
})
export class AgreementsNewComponent implements OnInit {
	c_id: number;
	ag_id: number;

	@ViewChild("agreementForm", { static: false }) form: OFormComponent;
	@ViewChild("inputID", { static: false }) inputID: OTextInputComponent;

	constructor(private route: ActivatedRoute, private router: Router) {}

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
	getData() {
		this.ag_id = this.inputID.getValue();
	}
}

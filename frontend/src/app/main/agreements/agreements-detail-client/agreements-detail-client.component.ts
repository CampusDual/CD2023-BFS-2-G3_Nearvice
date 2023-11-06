import { Component, OnInit, ViewChild } from "@angular/core";
import { OFormComponent, OntimizeService } from "ontimize-web-ngx";

@Component({
	selector: "app-agreements-detail-client",
	templateUrl: "./agreements-detail-client.component.html",
	styleUrls: ["./agreements-detail-client.component.css"],
})
export class AgreementsDetailClientComponent implements OnInit {
	@ViewChild("agreementFormClient", { static: false }) form: OFormComponent;
	protected service: OntimizeService;
	ag_accepted: boolean;
	showAccept: boolean = true;
	status: string;
	constructor() {}

	ngOnInit() {}
	onDataLoaded(data: any) {
		this.ag_accepted = data.AG_ACCEPTED;
		if (this.ag_accepted != null) {
			this.showAccept = false;
		}

		if (data.AG_ACCEPTED) {
			this.status = "ACCEPTED";
		} else if (data.AG_ACCEPTED == false) {
			this.status = "DECLINED";
		} else if (data.AG_ACCEPTED == undefined) {
			this.status = "PENDING";
		}
	}
	acceptOffer() {
		this.ag_accepted = true;
		this.form.setFieldValues({ AG_ACCEPTED: this.ag_accepted });
		this.form.update();
	}
	declineOffer() {
		this.ag_accepted = false;
		this.form.setFieldValues({ AG_ACCEPTED: this.ag_accepted });
		this.form.update();
	}
}

import { Component, Injector, Input, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { OFormComponent, OntimizeService } from "ontimize-web-ngx";
import { getLoggedUser } from "src/app/shared/utils";

@Component({
	selector: "app-works-navigation",
	templateUrl: "./works-navigation.component.html",
	styleUrls: ["./works-navigation.component.css"],
})
export class WorksNavigationComponent implements OnInit {
	@Input() data: any;
	protected service: OntimizeService;
	@ViewChild("formWork", { static: false }) formW: OFormComponent;
	viewOfferClient: boolean = false;
	user: string = getLoggedUser();
	c_id: any;
	finishWorkCondition: boolean = false;

	constructor(private route: ActivatedRoute, protected injector: Injector) {
		this.service = this.injector.get(OntimizeService);
	}

	ngOnInit() {
		setTimeout(() => {
			if (this.data.CLIENT == this.user) {
				this.viewOfferClient = true;
			}
		}, 300);
		this.route.params.subscribe((params) => {
			this.c_id = params["C_ID"];
		});
	}

	dataLoaded(event) {
		if (event.AG_ACCEPTED) {
			this.finishWorkCondition = true;
		}
	}

	insertDate() {
		const filter = {
			C_ID: Number(this.c_id),
		};

		const columns = {
			C_END_DATETIME: new Date(),
		};
		const sqlTypes = {
			C_END_DATETIME: 93,
			C_ID: 4,
		};
		this.service.update(filter, columns, "conversation", sqlTypes).subscribe((resp) => {
			console.log(resp);
		});
	}
}

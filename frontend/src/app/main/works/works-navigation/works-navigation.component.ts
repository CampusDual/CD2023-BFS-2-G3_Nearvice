import { ChangeDetectorRef, Component, Injector, Input, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
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
	viewFinishWorkButton: boolean = false;

	constructor(
		private route: ActivatedRoute,
		protected injector: Injector,
		private router: Router,
		private cdRef: ChangeDetectorRef
	) {
		this.service = this.injector.get(OntimizeService);
	}

	ngOnInit() {
		setTimeout(() => {
			if (this.data.CLIENT == this.user) {
				this.viewOfferClient = true;
			}
		}, 200);
	}

	dataLoaded(event) {
		this.c_id = event.C_ID;
		const filter = {
			C_ID: Number(this.c_id),
		};

		const columns = ["C_END_DATETIME"];
		this.service.query(filter, columns, "conversation").subscribe((resp) => {
			if (resp.data[0].C_END_DATETIME != null) {
				this.viewFinishWorkButton = true;
			}
			if (event.AG_ACCEPTED && !this.viewFinishWorkButton) {
				this.finishWorkCondition = true;
			}
		});
	}

	insertDate(event) {
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
			this.router.navigateByUrl(`/main/mailbox`);
			this.finishWorkCondition = false;
			this.cdRef.detectChanges();
		});
	}
}

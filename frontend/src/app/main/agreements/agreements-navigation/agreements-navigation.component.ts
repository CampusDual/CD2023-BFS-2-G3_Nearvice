import { Component, Input, OnInit, AfterContentInit, Injector } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { OntimizeService } from "ontimize-web-ngx";
import { getLoggedUser } from "src/app/shared/utils";

@Component({
	selector: "app-agreements-navigation",
	templateUrl: "./agreements-navigation.component.html",
	styleUrls: ["./agreements-navigation.component.css"],
})
export class AgreementsNavigationComponent implements OnInit, AfterContentInit {
	@Input() data: any;
	protected service: OntimizeService;
	user: string = getLoggedUser();
	viewOfferClient: boolean = false;
	c_id: number;
	ag_id: number;
	agreement: any;
	accepted: any;
	isClient: boolean = true;

	constructor(private router: Router, private route: ActivatedRoute, protected injector: Injector) {
		this.service = this.injector.get(OntimizeService);
	}

	ngOnInit() {
		setTimeout(() => {
			if (this.data.CLIENT == this.user) {
				this.viewOfferClient = true;
			}
		}, 1000);
	}

	onDataLoaded(data: any) {
		console.log(data);
		this.c_id = data.C_ID;
		this.ag_id = data.AG_ID;
		this.accepted = data.A_ACCEPTED;
		this.agreement = data.AG_ID;
		console.log(this.accepted);
	}

	public openAgreementFormNew() {
		this.router.navigateByUrl(`main/agreements/new/${this.c_id}?isdetail=true`);
	}
	public openAgreementFormDetail() {
		this.router.navigateByUrl(`main/agreements/${this.ag_id}?isdetail=true`);
	}
	public openAgreementFormDetailClient() {
		this.router.navigateByUrl(`main/agreements/${this.ag_id}/client?isdetail=true`);
	}

	ngAfterContentInit() {}
}

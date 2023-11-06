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
	dataIsLoaded: boolean = false;

	constructor(private router: Router, private route: ActivatedRoute, protected injector: Injector) {
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

	onDataLoaded(event: any) {
		this.ag_id = event.AG_ID;
		this.accepted = event.AG_ACCEPTED;
		this.agreement = event.AG_ID;
		this.dataIsLoaded = event;
		console.log(event);
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

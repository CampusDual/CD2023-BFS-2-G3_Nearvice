import { Component, Input, OnInit, AfterContentInit } from "@angular/core";
import { Router } from "@angular/router";
import { getLoggedUser } from "src/app/shared/utils";

@Component({
	selector: "app-agreements-navigation",
	templateUrl: "./agreements-navigation.component.html",
	styleUrls: ["./agreements-navigation.component.css"],
})
export class AgreementsNavigationComponent implements OnInit, AfterContentInit {
	@Input() data: any;
	user: string = getLoggedUser();
	public viewOfferClient: boolean = false;

	constructor(private router: Router) {}

	ngOnInit() {
		setTimeout(() => {
			if (this.data.CLIENT == this.user) {
				this.viewOfferClient = true;
			}
		}, 500);
	}

	public openAgreementFormNew(data: any): void {
		this.router.navigateByUrl(`main/agreements/new/${this.data.C_ID}?isdetail=true`);
	}
	public openAgreementFormDetail(data: any): void {
		this.router.navigateByUrl(`main/agreements/${this.data.AG_ID}?isdetail=true`);
	}

	ngAfterContentInit() {}
	setData(data) {
		this.data = data;
	}
}

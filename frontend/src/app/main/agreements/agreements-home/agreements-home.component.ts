import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
	selector: "agreements-home",
	templateUrl: "./agreements-home.component.html",
	styleUrls: ["./agreements-home.component.css"],
})
export class AgreementsHomeComponent implements OnInit {
	@Input() data: any;

	constructor(private router: Router) {}

	ngOnInit() {}

	public openAgreementFormNew(data: any): void {
		this.router.navigateByUrl(`main/agreements/new/${this.data.C_ID}?isdetail=true`);
	}
	public openAgreementFormDetail(data: any): void {
		this.router.navigateByUrl(`main/agreements/${this.data.AG_ID}?isdetail=true`);
	}
}

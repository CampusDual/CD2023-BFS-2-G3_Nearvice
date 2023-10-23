import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
	selector: "app-agreements-home",
	templateUrl: "./agreements-home.component.html",
	styleUrls: ["./agreements-home.component.css"],
})
export class AgreementsHomeComponent implements OnInit {
	@Input() data: any;

	constructor(private router: Router) {}

	ngOnInit() {}

	public openAgreementForm(data: any): void {
		this.router.navigateByUrl(`main/agreements/${this.data}?isdetail=true`);
	}
}

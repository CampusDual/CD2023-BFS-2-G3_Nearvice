import { Component, Input, OnInit } from "@angular/core";

@Component({
	selector: "agreements-detail",
	templateUrl: "./agreements-detail.component.html",
	styleUrls: ["./agreements-detail.component.scss"],
})
export class AgreementsDetailComponent implements OnInit {
	@Input() data: any;
	constructor() {}

	ngOnInit() {}
}

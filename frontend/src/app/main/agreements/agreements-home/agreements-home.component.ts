import { Component, Input, OnInit } from "@angular/core";
import { AgreementsNewComponent } from "../agreements-new/agreements-new.component";
import { MatDialog } from "@angular/material";
import { Router } from "@angular/router";

@Component({
	selector: "app-agreements-home",
	templateUrl: "./agreements-home.component.html",
	styleUrls: ["./agreements-home.component.css"],
})
export class AgreementsHomeComponent implements OnInit {
	@Input() data: any;

	constructor(protected dialog: MatDialog, private router: Router) {}

	ngOnInit() {}

	public openAgreementForm(data: any): void {
		//this.router.navigate(["main/home/agreements/" + data]);
		this.dialog.open(AgreementsNewComponent, {
			// height: "auto",
			// width: "520px",
			data: data,
		});
	}
}

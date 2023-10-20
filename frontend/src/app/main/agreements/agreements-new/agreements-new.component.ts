import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material";

@Component({
	selector: "app-agreements-new",
	templateUrl: "./agreements-new.component.html",
	styleUrls: ["./agreements-new.component.css"],
})
export class AgreementsNewComponent implements OnInit {
	constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

	ngOnInit() {}
}

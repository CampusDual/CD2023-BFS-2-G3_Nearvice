import { Component, OnInit, Input, ViewChild, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { DomSanitizer } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { OFormComponent } from "ontimize-web-ngx";

@Component({
	selector: "home-detail-card",
	templateUrl: "./home-detail-card.component.html",
	styleUrls: ["./home-detail-card.component.css"],
})
export class HomeDetailCardComponent implements OnInit {
	@Input() data: any;
	@ViewChild("form", { static: false }) form: OFormComponent;
	localStorageData: any;
	sessionData: any;
	user: any;

	constructor(private router: Router) {}

	ngOnInit() {
		this.localStorageData = localStorage.getItem("com.ontimize.web.ngx.jee.seed");
		this.sessionData = JSON.parse(this.localStorageData);
		this.user = this.sessionData.session.user;
	}
	conversationInit() {
		if (this.form && this.form.insert) {
			this.form.insert();
		}
		this.router.navigateByUrl("main/mailbox");
	}
	goToAnnounceDetail() {
		this.router.navigateByUrl(`/main/services/${this.data.A_ID}?isdetail=true`);
	}
}

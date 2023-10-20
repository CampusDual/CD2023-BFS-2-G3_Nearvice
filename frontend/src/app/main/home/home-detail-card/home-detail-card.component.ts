import { Component, OnInit, Input, ViewChild, Inject, Injector } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { DomSanitizer } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { OFormComponent, OntimizeService } from "ontimize-web-ngx";

@Component({
	selector: "home-detail-card",
	templateUrl: "./home-detail-card.component.html",
	styleUrls: ["./home-detail-card.component.css"],
})
export class HomeDetailCardComponent implements OnInit {
	protected service: OntimizeService;
	@Input() data: any;
	@ViewChild("form", { static: false }) form: OFormComponent;
	localStorageData: any;
	sessionData: any;
	user: any;
	conversationExists: boolean = false;
	conversation: any;

	constructor(private router: Router, protected injector: Injector) {
		this.service = this.injector.get(OntimizeService);
	}

	ngOnInit() {
		this.localStorageData = localStorage.getItem("com.ontimize.web.ngx.jee.seed");
		this.sessionData = JSON.parse(this.localStorageData);
		this.user = this.sessionData.session.user;
		this.configureService();
		this.getConversations(this.data);
	}

	protected configureService() {
		const conf = this.service.getDefaultServiceConfiguration("conversations");
		this.service.configureService(conf);
	}

	getConversations(data) {
		if (data.hasOwnProperty("A_ID") && this.service !== null) {
			const filter = {
				A_ID: data["A_ID"],
				U_CLIENT: this.user,
			};

			const columns = ["C_ID"];
			this.service.query(filter, columns, "conversation").subscribe((resp) => {
				if (resp.code === 0 && resp.data[0]) {
					if (resp.data[0]) {
						this.conversationExists = true;
						this.conversation = resp.data[0].C_ID;
					}
				}
			});
		}
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
	goToChat() {
		this.router.navigateByUrl(`/main/mailbox/${this.conversation}?isdetail=true`);
	}
}

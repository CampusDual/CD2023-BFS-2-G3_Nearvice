import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { OFormComponent } from "ontimize-web-ngx";

@Component({
	selector: "app-mailbox-chat",
	templateUrl: "./mailbox-chat.component.html",
	styleUrls: ["./mailbox-chat.component.css"],
})
export class MailboxChatComponent implements OnInit {
	c_id: number;

	@ViewChild("formchat", { static: false }) form: OFormComponent;
	constructor(private route: ActivatedRoute) {}

	ngOnInit() {
		this.route.params.subscribe((params) => {
			this.c_id = params["C_ID"];
		});
	}

	messageSend() {
		if (this.form && this.form.insert) {
			this.form.insert();
		}
	}
}

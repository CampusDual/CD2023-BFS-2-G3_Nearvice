import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { OFormComponent, OTextInputComponent } from "ontimize-web-ngx";

@Component({
	selector: "app-mailbox-chat",
	templateUrl: "./mailbox-chat.component.html",
	styleUrls: ["./mailbox-chat.component.css"],
})
export class MailboxChatComponent implements OnInit, AfterViewInit {
	c_id: number;
	localStorageData: any;
	sessionData: any;
	user: any;

	@ViewChild("formchat", { static: false }) form: OFormComponent;

	constructor(private route: ActivatedRoute) {}

	ngOnInit() {
		this.route.params.subscribe((params) => {
			this.c_id = params["C_ID"];
		});

		this.localStorageData = localStorage.getItem("com.ontimize.web.ngx.jee.seed");
		this.sessionData = JSON.parse(this.localStorageData);
		this.user = this.sessionData.session.user;
	}

	messageSend() {
		if (this.form && this.form.insert) {
			this.form.insert();
		}
	}

	ngAfterViewInit() {
		setTimeout(() => {
			let messages = document.querySelectorAll(".chatMessage");

			messages.forEach((message) => {
				if (this.user == message.children[0].innerHTML) {
					message.classList.remove("chatMessage");
					message.classList.add("meChatMessage");
					message.children[0].remove();
				}
			});
		}, 500);
	}
}

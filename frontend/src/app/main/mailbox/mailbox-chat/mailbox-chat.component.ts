import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { OFormComponent, OListComponent, OTextInputComponent } from "ontimize-web-ngx";

@Component({
	selector: "app-mailbox-chat",
	templateUrl: "./mailbox-chat.component.html",
	styleUrls: ["./mailbox-chat.component.css"],
})
export class MailboxChatComponent implements OnInit, AfterViewInit {
	c_id: number;
	localStorageData: any;
	sessionData: any;
	user: string;
	rowsToQuery: number = 3;

	@ViewChild("formchat", { static: false }) form: OFormComponent;
	@ViewChild("inputP", { static: false }) inputP: OTextInputComponent;
	@ViewChild("inputC", { static: false }) inputC: OTextInputComponent;
	@ViewChild("chatList", { static: false }) chatList: OListComponent;

	constructor(private route: ActivatedRoute) {}

	ngOnInit() {
		this.route.params.subscribe((params) => {
			this.c_id = params["C_ID"];
		});

		this.localStorageData = localStorage.getItem("com.ontimize.web.ngx.jee.seed");
		this.sessionData = JSON.parse(this.localStorageData);
		this.user = this.sessionData.session.user;
	}
	getData() {
		let user_ = this.inputP.getValue();
		let u_client = this.inputC.getValue();

		if (this.user === user_) {
			this.inputP.elementRef.nativeElement.style.display = "none";
		} else if (this.user === u_client) {
			this.inputC.elementRef.nativeElement.style.display = "none";
		}
	}

	dinamicQueryRows(event: Array<any>) {
		this.rowsToQuery = event.length;
	}

	messageSend() {
		if (this.form && this.form.insert) {
			this.form.insert();
		}
	}

	ngAfterViewInit() {}

	ngAfterViewChecked() {
		setTimeout(() => {
			let messages = document.querySelectorAll(".chatMessage");
			messages.forEach((message) => {
				if (this.user == message.children[0].innerHTML) {
					message.classList.remove("chatMessage");
					message.classList.add("meChatMessage");
					message.children[0].remove();
					//this.counter++;
				}
			});
		}, 500);
		//this.dinamicQueryRows();
	}
}

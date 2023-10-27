import { AfterViewInit, Component, OnInit, ViewChild, Renderer2, Injector } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {
	OFormComponent,
	OListComponent,
	OTextInputComponent,
	OntimizeService,
} from "ontimize-web-ngx";

@Component({
	selector: "app-mailbox-chat",
	templateUrl: "./mailbox-chat.component.html",
	styleUrls: ["./mailbox-chat.component.css"],
})
export class MailboxChatComponent implements OnInit, AfterViewInit {
	protected service: OntimizeService;
	c_id: number;
	localStorageData: any;
	sessionData: any;
	user: string;
	rowsToQuery: number = 0;
	professionalCondition: boolean = true;
	clientCondition: boolean = true;
	agreementOfferExists: boolean = false;
	agreement: any;
	myChatMessagesClass: string = "my-chat-messages-styles";
	chatMessagesClass: string = "chat-messages-styles";

	@ViewChild("formchat", { static: false }) form: OFormComponent;
	@ViewChild("inputP", { static: false }) inputP: OTextInputComponent;
	@ViewChild("inputC", { static: false }) inputC: OTextInputComponent;
	@ViewChild("chatList", { static: false }) chatList: OListComponent;

	constructor(
		private route: ActivatedRoute,
		private renderer: Renderer2,
		protected injector: Injector,
		private router: Router
	) {
		this.service = this.injector.get(OntimizeService);
	}

	ngOnInit() {
		this.route.params.subscribe((params) => {
			this.c_id = params["C_ID"];
		});
		this.configureService();
		this.getAgreements();

		this.localStorageData = localStorage.getItem("com.ontimize.web.ngx.jee.seed");
		this.sessionData = JSON.parse(this.localStorageData);
		this.user = this.sessionData.session.user;
	}
	protected configureService() {
		const conf = this.service.getDefaultServiceConfiguration("agreements");
		this.service.configureService(conf);
	}

	getAgreements() {
		const _cid: number = +this.c_id;
		if (_cid && this.service !== null) {
			const filter = {
				C_ID: _cid,
			};

			const columns = ["AG_ID"];
			this.service.query(filter, columns, "agreement").subscribe((resp) => {
				if (resp.code === 0 && resp.data[0]) {
					if (resp.data[0]) {
						this.agreementOfferExists = true;
						this.agreement = resp.data[0].AG_ID;
					}
				}
			});
		}
	}
	getData() {
		let user_ = this.inputP.getValue();
		let u_client = this.inputC.getValue();

		if (this.user === user_) {
			this.professionalCondition = false;
		} else if (this.user === u_client) {
			this.clientCondition = false;
		}
	}

	dinamicQueryRows(event: Array<any>) {
		this.rowsToQuery = event.length;
	}

	messageSend() {
		if (this.form && this.form.insert) {
			this.form.insert();
			setTimeout(() => {
				this.rowsToQuery++;
				this.chatList.reloadData();
				this.scrollToBottom();
			}, 100);
		}
	}

	ngAfterViewInit() {}

	getChatMessageStyles(row: any): any {
		if (this.user === row.U_EMITTER) {
			return this.myChatMessagesClass;
		} else {
			return this.chatMessagesClass;
		}
	}

	uEmitterStyles(row: any): any {
		let uEmitterUserStyles: any = {
			display: "none",
		};

		if (this.user === row.U_EMITTER) {
			return uEmitterUserStyles;
		}
	}
	onLastItem() {
		this.scrollToBottom();
	}
	scrollToBottom() {
		var scroll = document.querySelector(".application-layout-content-wrapper.header-layout");
		scroll.scrollTop = scroll.scrollHeight;
	}
}

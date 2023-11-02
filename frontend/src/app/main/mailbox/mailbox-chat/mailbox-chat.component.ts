import { AfterViewInit, Component, OnInit, ViewChild, Injector } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { OFormComponent, OListComponent, OntimizeService } from "ontimize-web-ngx";
import { MY_CHAT_MESSAGES_CLASS, OTHER_CHAT_MESSAGES_CLASS } from "src/app/shared/constants";
import { getLoggedUser } from "src/app/shared/utils";

@Component({
	selector: "app-mailbox-chat",
	templateUrl: "./mailbox-chat.component.html",
	styleUrls: ["./mailbox-chat.component.css"],
})
export class MailboxChatComponent implements OnInit, AfterViewInit {
	protected service: OntimizeService;
	c_id: number;
	user: string = getLoggedUser();
	u_client: string;
	rowsToQuery: number = 0;
	professionalCondition: boolean = true;
	clientCondition: boolean = true;
	agreementOfferExists: boolean = false;
	agreement: any;

	@ViewChild("formchat", { static: false }) form: OFormComponent;
	@ViewChild("chatList", { static: false }) chatList: OListComponent;

	constructor(private route: ActivatedRoute) {}

	ngOnInit() {
		this.route.params.subscribe((params) => {
			this.c_id = params["C_ID"];
		});
		// this.configureService();
		// this.getAgreements();
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
	getData(event) {
		let user_ = event.USER_;
		this.u_client = event.U_CLIENT;

		if (this.user === user_) {
			this.professionalCondition = false;
		} else if (this.user === this.u_client) {
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
				// Este timeout nos lo deja pasar Alvaro :)
				this.rowsToQuery++;
				this.chatList.reloadData();
			}, 100);
		}
	}

	ngAfterViewInit() {}

	getChatMessageStyles(row: any): any {
		if (this.user === row.U_EMITTER) {
			return MY_CHAT_MESSAGES_CLASS;
		} else {
			return OTHER_CHAT_MESSAGES_CLASS;
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
}

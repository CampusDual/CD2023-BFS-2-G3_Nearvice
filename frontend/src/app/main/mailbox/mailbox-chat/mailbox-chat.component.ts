import {
	AfterViewInit,
	Component,
	OnInit,
	ViewChild,
	Injector,
	ElementRef,
	ChangeDetectorRef,
	QueryList,
	ViewChildren,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
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
	s_name: string;
	a_title: string;
	c_id: number;
	user: string = getLoggedUser();
	u_client: string;
	user_: string;
	rowsToQuery: number = 0;
	professionalCondition: boolean = true;
	clientCondition: boolean = true;
	agreementOfferExists: boolean = false;
	agreement: any;
	isConversationActive: boolean;

	@ViewChild("formchat", { static: false }) form: OFormComponent;
	@ViewChild("chatList", { static: false }) chatList: OListComponent;
	@ViewChild("scroll", { static: false }) myScrollContainer: ElementRef;
	@ViewChildren("chatItem") chatItems: QueryList<ElementRef>;

	constructor(
		private route: ActivatedRoute,
		protected injector: Injector,
		private router: Router,
		private cdr: ChangeDetectorRef
	) {
		this.service = this.injector.get(OntimizeService);
	}

	ngOnInit() {
		this.route.params.subscribe((params) => {
			this.c_id = params["C_ID"];
		});
		this.configureService();
	}
	protected configureService() {
		const conf = this.service.getDefaultServiceConfiguration("conversations");
		this.service.configureService(conf);
	}

	archiveConversation() {
		const _cid: number = Number(this.c_id);
		if (_cid && this.service !== null) {
			const filter = {
				C_ID: _cid,
			};

			const columns = { C_ACTIVE: false };
			this.service.update(filter, columns, "conversation").subscribe((resp) => {
				if (resp.code === 0) {
					this.router.navigateByUrl(`/main/mailbox`);
				}
			});
		}
	}
	getData(event) {
		this.user_ = event.USER_;
		this.u_client = event.U_CLIENT;
		this.s_name = event.S_NAME;
		this.a_title = event.A_TITLE;
		let user_ = event.USER_;
		this.u_client = event.U_CLIENT;
		this.isConversationActive = event.C_ACTIVE;

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
				this.scrollToBottom();
			}, 100);
		}
	}

	ngAfterViewInit() {
		this.chatItems.changes.subscribe((list: QueryList<ElementRef>) => {
			this.scrollToBottom();
		});
	}

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

	onLastItem() {}

	scrollToBottom() {
		var scroll = document.querySelector(".application-layout-content-wrapper.header-layout");
		scroll.scrollTop = scroll.scrollHeight;
	}
}

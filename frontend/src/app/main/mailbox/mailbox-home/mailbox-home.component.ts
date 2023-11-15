import { Component, Injector, OnInit, ViewChild } from "@angular/core";
import {
	FilterExpressionUtils,
	Expression,
	OntimizeService,
	OTranslateService,
} from "ontimize-web-ngx";

@Component({
	selector: "app-mailbox-home",
	templateUrl: "./mailbox-home.component.html",
	styleUrls: ["./mailbox-home.component.css"],
})
export class MailboxHomeComponent implements OnInit {
	public selectedConversationStatusCode = 2;
	lang: string;
	public service: OntimizeService;
	public conversationArray: Array<any> = [];
	showClientList: boolean = true;
	showProfessionalList: boolean = true;

	constructor(private translateService: OTranslateService, protected injector: Injector) {
		this.conversationArray = [
			{
				conversationStatusCode: false,
				conversationStatus: this.translateService.get("SHOW_ARCHIVED_CONVERSATIONS"),
			},
			{
				conversationStatusCode: true,
				conversationStatus: this.translateService.get("SHOW_ACTIVE_CONVERSATIONS"),
			},
		];
	}

	getDataArray() {
		return this.conversationArray;
	}
	ngOnInit() {}

	createFilter(values: Array<{ attr; value }>): Expression {
		let filters: Array<Expression> = [];
		values.forEach((fil) => {
			if (fil.value != null) {
				if (fil.attr === "CONV_STATUS") {
					filters.push(FilterExpressionUtils.buildExpressionEquals("C_ACTIVE", fil.value));
				}
			}
		});

		if (filters.length > 0) {
			return filters.reduce((exp1, exp2) =>
				FilterExpressionUtils.buildComplexExpression(exp1, exp2, FilterExpressionUtils.OP_AND)
			);
		} else {
			return null;
		}
	}

	clientIsEmpty(event) {
		if (event.length > 0) {
			this.showClientList = true;
		} else {
			this.showClientList = false;
		}
	}

	professionalIsEmpty(event) {
		if (event.length > 0) {
			this.showProfessionalList = true;
		} else {
			this.showProfessionalList = false;
		}
	}
}

import { Component, OnInit, ViewChild } from "@angular/core";
import { FilterExpressionUtils, Expression, OComboComponent } from "ontimize-web-ngx";

@Component({
	selector: "app-mailbox-home",
	templateUrl: "./mailbox-home.component.html",
	styleUrls: ["./mailbox-home.component.css"],
})
export class MailboxHomeComponent implements OnInit {
	public selectedConversationStatusCode = 2;

	constructor() {}

	ngOnInit() {}

	public conversationArray = [
		{
			conversationStatusCode: null,
			conversationStatus: "Mostrar todas las conversaciones",
		},
		{
			conversationStatusCode: false,
			conversationStatus: "Mostrar las conversaciones archivadas",
		},
		{
			conversationStatusCode: true,
			conversationStatus: "Mostrar las conversaciones activas",
		},
	];

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
}

import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { getLoggedUser } from "src/app/shared/utils";

@Component({
	selector: "app-works-navigation",
	templateUrl: "./works-navigation.component.html",
	styleUrls: ["./works-navigation.component.css"],
})
export class WorksNavigationComponent implements OnInit {
	c_id: any;
	finishWorkCondition: boolean = false;
	@Input() data: any;
	viewOfferClient: boolean = false;
	user: string = getLoggedUser();

	constructor(private route: ActivatedRoute) {}

	ngOnInit() {
		setTimeout(() => {
			if (this.data.CLIENT == this.user) {
				this.viewOfferClient = true;
			}
		}, 300);
		this.route.params.subscribe((params) => {
			this.c_id = params["C_ID"];
		});
	}

	dataLoaded(event) {
		console.log(event);
		if (event.AG_ACCEPTED) {
			this.finishWorkCondition = true;
		}
		console.log(this.c_id);
	}
}

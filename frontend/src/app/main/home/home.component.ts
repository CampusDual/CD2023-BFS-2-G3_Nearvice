import { OTableComponent, OFormComponent, OnClickTableEvent } from "ontimize-web-ngx";
import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
	selector: "home",
	templateUrl: "./home.component.html",
	styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
	constructor(private router: Router, private actRoute: ActivatedRoute) {}

	@ViewChild("table", { static: true }) table: OTableComponent;

	onClick(event: OnClickTableEvent) {
		this.table.toogleRowExpandable(event.row, event.rowIndex, event.mouseEvent);
	}

	ngOnInit() {}

	navigate() {
		this.router.navigate(["../", "login"], { relativeTo: this.actRoute });
	}
}

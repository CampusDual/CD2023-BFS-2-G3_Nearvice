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

	latitude: number;
	longitude: number;
	error: string;
	@ViewChild("table", { static: true }) table: OTableComponent;

	onClick(event: OnClickTableEvent) {
		this.table.toogleRowExpandable(event.row, event.rowIndex, event.mouseEvent);
	}

	ngOnInit() {
		if ("geolocation" in navigator) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					this.latitude = position.coords.latitude;
					this.longitude = position.coords.longitude;
					console.log(this.latitude);
					console.log(this.longitude);
				},
				(err) => {
					this.error = `Error: ${err.message}`;
				}
			);
		} else {
			this.error = "Geolocalización no compatible en este navegador.";
		}
	}

	navigate() {
		this.router.navigate(["../", "login"], { relativeTo: this.actRoute });
	}
}

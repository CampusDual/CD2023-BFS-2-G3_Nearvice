import { OTableComponent, OFormComponent, OnClickTableEvent } from "ontimize-web-ngx";
import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
	selector: "home",
	templateUrl: "./home.component.html",
	styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
	constructor(private router: Router, private actRoute: ActivatedRoute) {
		this.geoLocation();
	}

	latitude: number;
	longitude: number;
	error: string;
	locationObtained = false;

	@ViewChild("table", { static: true }) table: OTableComponent;

	onClick(event: OnClickTableEvent) {
		this.table.toogleRowExpandable(event.row, event.rowIndex, event.mouseEvent);
	}

	ngOnInit() {}

	geoLocation() {
		if ("geolocation" in navigator) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					this.latitude = position.coords.latitude;
					this.longitude = position.coords.longitude;
					this.locationObtained = true;
				},
				(err) => {
					this.error = `Error: ${err.message}`;
					this.locationObtained = true;
				}
			);
		} else {
			this.error = "Geolocalización no compatible en este navegador.";
			this.locationObtained = true;
		}
	}

	getDistanceCalculator() {
		const _this = this;
		function calculateDistances(rowData: any): number {
			if (_this.locationObtained) {
				const anuncioLocation = {
					latitude: rowData["A_LATITUDE"],
					longitude: rowData["A_LONGITUDE"],
				};
				const distance = _this.calculateDistance(
					_this.latitude,
					_this.longitude,
					anuncioLocation.latitude,
					anuncioLocation.longitude
				);
				return distance;
			} else {
				return 0;
			}
		}
		return calculateDistances;
	}

	calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
		const R = 6371;
		const dLat = this.deg2rad(lat2 - lat1);
		const dLon = this.deg2rad(lon2 - lon1);
		const a =
			Math.sin(dLat / 2) * Math.sin(dLat / 2) +
			Math.cos(this.deg2rad(lat1)) *
				Math.cos(this.deg2rad(lat2)) *
				Math.sin(dLon / 2) *
				Math.sin(dLon / 2);
		const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		const distance = R * c;
		return distance;
	}

	deg2rad(deg: number): number {
		return deg * (Math.PI / 180);
	}
	navigate() {
		this.router.navigate(["../", "login"], { relativeTo: this.actRoute });
	}
}

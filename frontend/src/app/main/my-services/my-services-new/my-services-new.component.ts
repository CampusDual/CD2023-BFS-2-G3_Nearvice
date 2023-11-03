import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { OCheckboxComponent, OFormComponent } from "ontimize-web-ngx";
import * as L from "leaflet";
import { OMapComponent, OMapLayerComponent } from "ontimize-web-ngx-map";

@Component({
	selector: "app-my-services-new",
	templateUrl: "./my-services-new.component.html",
	styleUrls: ["./my-services-new.component.css"],
})
export class MyServicesNewComponent implements OnInit, AfterViewInit {
	@ViewChild("ocheckbox", { static: true }) check: OCheckboxComponent;
	@ViewChild("formNewService", { static: false }) form: OFormComponent;
	@ViewChild("oMapMarker", { static: false }) oMapMarker: OMapComponent;
	@ViewChild("oMarker", { static: false }) oMarker: OMapLayerComponent;
	longitudeService: number = null;
	latitudeService: number = null;
	private currentMarker: L.Marker = null;
	error: string;
	locationObtained = false;
	constructor() {}

	ngOnInit() {
		this.geoLocation();
	}

	geoLocation() {
		if ("geolocation" in navigator) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					this.latitudeService = position.coords.latitude;
					this.longitudeService = position.coords.longitude;
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
	ngAfterViewInit(): void {
		console.log(this.check);
	}
	hasGPSPosition() {
		return this.latitudeService !== null && this.longitudeService !== null;
	}

	getPositionGPS() {
		if (
			typeof this.latitudeService === "number" &&
			typeof this.longitudeService === "number" &&
			!isNaN(this.latitudeService) &&
			!isNaN(this.longitudeService)
		) {
			let location = `${this.latitudeService},${this.longitudeService}`;
			return location;
		}
	}

	onMapClick(e) {
		this.oMarker.setVisible(false);
		const lat = e.latlng.lat;
		const lng = e.latlng.lng;
		if (this.currentMarker) {
			this.oMapMarker.getLMap().removeLayer(this.currentMarker);
		}
		this.currentMarker = L.marker([lat, lng]).addTo(this.oMapMarker.getLMap());
		this.form.setFieldValues({ A_LATITUDE: lat, A_LONGITUDE: lng });
	}
	locationcharge() {
		this.form.setFieldValues({
			A_LATITUDE: this.latitudeService,
			A_LONGITUDE: this.longitudeService,
		});
	}
}

import { Component, AfterViewInit, ViewChild } from "@angular/core";
import { OFormComponent } from "ontimize-web-ngx";
import { OMapComponent, OMapLayerComponent } from "ontimize-web-ngx-map";
import * as L from "leaflet";
import { MyServicesDetailMessageService } from "./my-services-detail-message.service";

@Component({
	selector: "app-my-services-detail",
	templateUrl: "./my-services-detail.component.html",
	styleUrls: ["./my-services-detail.component.css"],
	providers: [
		{ provide: "myServicesDetailMessageService", useValue: MyServicesDetailMessageService },
	],
})
export class MyServicesDetailComponent {
	@ViewChild("formServiceDetail", { static: false }) form: OFormComponent;
	@ViewChild("oMapMarker", { static: false }) oMapMarker: OMapComponent;
	@ViewChild("oMarker", { static: false }) oMarker: OMapLayerComponent;

	a_id: number;
	longitudeService: number = null;
	latitudeService: number = null;
	private currentMarker: L.Marker = null;

	constructor() {}

	formInit(event) {
		this.a_id = event.A_ID;
		this.latitudeService = event.A_LATITUDE;
		this.longitudeService = event.A_LONGITUDE;
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
}

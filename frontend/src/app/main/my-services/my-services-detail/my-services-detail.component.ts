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

	acceptedAgreementsPercentage: number;
	declinedAgreementsPercentage: number;
	pendingAgreementsPercentage: number;
	acc_ags: number;
	dec_ags: number;
	pen_ags: number;
	ags_count: number;
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

	metricsCalculator() {
		if (this.ags_count !== 0) {
			this.acceptedAgreementsPercentage = Math.round((this.acc_ags * 100) / this.ags_count);
			this.declinedAgreementsPercentage = Math.round((this.dec_ags * 100) / this.ags_count);
			this.pendingAgreementsPercentage = Math.round((this.pen_ags * 100) / this.ags_count);
		} else {
			this.declinedAgreementsPercentage = 0;
			this.acceptedAgreementsPercentage = 0;
			this.pendingAgreementsPercentage = 0;
		}

		console.log(this.acceptedAgreementsPercentage + "%");
		console.log(this.declinedAgreementsPercentage + "%");
		console.log(this.pendingAgreementsPercentage + "%");
	}

	dataLoaded(event) {
		this.a_id = event.A_ID;
		this.acc_ags = event.accepted_agreements_count;
		this.dec_ags = event.declined_agreements_count;
		this.ags_count = event.agreements_count;
		this.pen_ags = this.ags_count - this.acc_ags - this.dec_ags;
		/*
		console.log(this.a_id);
		console.log(this.acc_ags);
		console.log(this.dec_ags);
		console.log(this.ags_count);
		*/
		this.metricsCalculator();
	}
}

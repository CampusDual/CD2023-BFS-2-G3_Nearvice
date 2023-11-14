import { Component, OnInit, ViewChild, Inject, Injector } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { Router } from "@angular/router";
import { OMapComponent } from "ontimize-web-ngx-map";
import { OFormComponent, OntimizeService } from "ontimize-web-ngx";

@Component({
	selector: "announces-detail",
	templateUrl: "./announces-detail.component.html",
	styleUrls: ["./announces-detail.component.css"],
})
export class AnnouncesDetailComponent implements OnInit {
	protected service: OntimizeService;
	@ViewChild("form", { static: false }) form: OFormComponent;
	@ViewChild("oMapMarker", { static: false }) omap: OMapComponent;
	localStorageData: any;
	sessionData: any;
	user: any;
	latitudeannounce: number;
	longitudeannounce: number;
	conversationExists: boolean = false;
	conversation: any;

	constructor(
		private router: Router,
		@Inject(MAT_DIALOG_DATA) public data: any,
		protected injector: Injector,
		public dialogRef: MatDialogRef<AnnouncesDetailComponent>
	) {
		this.service = this.injector.get(OntimizeService);
	}

	ngOnInit() {
		this.localStorageData = localStorage.getItem("com.ontimize.web.ngx.jee.seed");
		this.sessionData = JSON.parse(this.localStorageData);
		this.user = this.sessionData.session.user;
		this.configureService();
		this.getConversations(this.data);
	}

	protected configureService() {
		const conf = this.service.getDefaultServiceConfiguration("conversations");
		this.service.configureService(conf);
	}

	getConversations(data) {
		if (data.hasOwnProperty("A_ID") && this.service !== null) {
			const filter = {
				A_ID: data["A_ID"],
				U_CLIENT: this.user,
			};

			const columns = ["C_ID"];
			this.service.query(filter, columns, "conversation").subscribe((resp) => {
				if (resp.code === 0 && resp.data[0]) {
					if (resp.data[0]) {
						this.conversationExists = true;
						this.conversation = resp.data[0].C_ID;
					}
				}
			});
		}
	}

	conversationInit() {
		console.log(this.data);
		if (this.form && this.form.insert) {
			const data2 = this.form.getAttributesValuesToInsert();
			this.form.insertData(data2).subscribe((data3) => {
				this.dialogRef.close();
				this.router.navigateByUrl(`/main/mailbox/${data3["C_ID"]}?isdetail=true`);
			});
		}
	}
	hasGPSPositition(latitude, longitude) {
		if (latitude && longitude) {
			this.latitudeannounce = latitude;
			this.longitudeannounce = longitude;
			return true;
		}
		return false;
	}

	getPositionGPS() {
		return this.latitudeannounce + "," + this.longitudeannounce;
	}
	goToAnnounceDetail() {
		this.dialogRef.close();
		this.router.navigateByUrl(`/main/services/${this.data.A_ID}?isdetail=true`);
	}
	goToChat() {
		this.dialogRef.close();
		this.router.navigateByUrl(`/main/mailbox/${this.conversation}?isdetail=true`);
	}
	ngOnDestroy() {
		if (this.omap) {
			this.omap.ngOnDestroy();
		}
	}
}

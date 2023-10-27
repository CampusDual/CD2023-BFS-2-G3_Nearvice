import { Component, OnInit } from "@angular/core";
import { MyServicesDetailMessageService } from "./my-services-detail-message.service";

@Component({
	selector: "app-my-services-detail",
	templateUrl: "./my-services-detail.component.html",
	styleUrls: ["./my-services-detail.component.css"],
	providers: [
		{ provide: "myServicesDetailMessageService", useValue: MyServicesDetailMessageService },
	],
})
export class MyServicesDetailComponent implements OnInit {
	constructor() {}

	ngOnInit() {}
}

import { Component, OnInit, Input } from "@angular/core";

@Component({
	selector: "home-detail-card",
	templateUrl: "./home-detail-card.component.html",
	// template: "{{data}}",
	styleUrls: ["./home-detail-card.component.css"],
})
export class HomeDetailCardComponent implements OnInit {
	@Input() data: any;

	constructor() {}

	ngOnInit() {
		console.log("Hola");
	}
}

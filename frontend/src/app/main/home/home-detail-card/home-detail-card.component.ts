import { Component, OnInit, Input, ViewChild } from "@angular/core";
import {  OFormComponent } from "ontimize-web-ngx";

@Component({
	selector: "home-detail-card",
	templateUrl: "./home-detail-card.component.html",
	styleUrls: ["./home-detail-card.component.css"],
})
export class HomeDetailCardComponent implements OnInit {
	@Input() data: any;
	@ViewChild("form", { static: false }) form: OFormComponent;

	constructor() {}

	ngOnInit() {
		console.log("Hola");
	}
	 onAction1() {
	
		console.log("Dentro del método");
	  if (this.form && this.form.insert) {
	     console.log("Dentro del if");
	    this.form.insert();
	 }
	 }
}

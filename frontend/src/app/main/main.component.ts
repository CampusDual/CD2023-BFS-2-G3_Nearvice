import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
	selector: "app-main",
	templateUrl: "./main.component.html",
	styleUrls: ["./main.component.scss"],
})
export class MainComponent {
	public closedSidenavImage: string;
	public openedSidenavImage: string;
	constructor(protected router: Router) {
		this.checkSidenavImage();
	}

	checkSidenavImage() {
		let path = "assets/images/";
		this.closedSidenavImage = path + "sidenav-closed.png";
		this.openedSidenavImage = path + "sidenav-opened.png";
	}
}

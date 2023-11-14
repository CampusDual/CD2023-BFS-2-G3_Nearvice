import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialogRef } from "@angular/material";
import {
	OCheckboxComponent,
	OFormComponent,
	OTextInputComponent,
	OntimizeService,
} from "ontimize-web-ngx";

@Component({
	selector: "app-register-home",
	templateUrl: "./register-home.component.html",
	styleUrls: ["./register-home.component.scss"],
})
export class RegisterHomeComponent implements OnInit {
	protected userService: OntimizeService;

	@ViewChild("registerForm", { static: false }) form: OFormComponent;

	constructor(private dialogRef: MatDialogRef<RegisterHomeComponent>) {}

	ngOnInit() {}

	public async send() {
		const password = this.form.formGroup.get("PASSWORD").value;
		const confirmPassword = this.form.formGroup.get("confirm_password").value;
		const userName = this.form.formGroup.get("USER_").value;

		if (password !== confirmPassword) {
			console.log("pass no igual");
		} else {
			this.form.insert();
		}
	}

	public forceInsertMode(event: any) {
		if (event != OFormComponent.Mode().INSERT) {
			this.form.setInsertMode();
		}
	}

	public closeDialog(event: any) {
		this.dialogRef.close();
	}

	passwordMatchValidator(control: any): any {
		try {
			const password = control.parent ? control.parent.controls["password"].value : null;
			const confirm_password = control.value;
			return password === confirm_password ? null : { passwordsNotMatched: true };
		} catch (e) {}
	}
	public reviewMatches(event: Event) {
		this.form.formGroup.controls["confirm_password"].updateValueAndValidity();
		this.form.formGroup.get("confirm_password").markAsTouched();
	}
}

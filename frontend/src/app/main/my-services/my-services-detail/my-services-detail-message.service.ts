import { Injectable } from "@angular/core";
import { OFormMessageService } from "ontimize-web-ngx";

@Injectable()
export class MyServicesDetailMessageService extends OFormMessageService {
	getDeleteErrorMessage(): string {
		return "MSG_DELETE_ERROR_MY_SERVICES";
	}
}

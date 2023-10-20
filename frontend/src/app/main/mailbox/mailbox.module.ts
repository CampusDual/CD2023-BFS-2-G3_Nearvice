import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MailboxRoutingModule } from "./mailbox-routing.module";
import { OntimizeWebModule } from "ontimize-web-ngx";
import { MailboxHomeComponent } from "./mailbox-home/mailbox-home.component";
import { MailboxChatComponent } from "./mailbox-chat/mailbox-chat.component";
import { AgreementsHomeComponent } from "../agreements/agreements-home/agreements-home.component";

@NgModule({
	declarations: [MailboxHomeComponent, MailboxChatComponent, AgreementsHomeComponent],
	imports: [CommonModule, OntimizeWebModule, MailboxRoutingModule],
})
export class MailboxModule {}

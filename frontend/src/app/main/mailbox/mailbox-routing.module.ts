import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MailboxHomeComponent } from "./mailbox-home/mailbox-home.component";
import { MailboxChatComponent } from "./mailbox-chat/mailbox-chat.component";

const routes: Routes = [
	{
		path: "",
		component: MailboxHomeComponent,
	},
	{
		path: ":C_ID",
		component: MailboxChatComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class MailboxRoutingModule {}

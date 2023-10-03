import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MailboxHomeComponent } from "./mailbox-home/mailbox-home.component";

const routes: Routes = [
  {
    path: "",
    component: MailboxHomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MailboxRoutingModule {}

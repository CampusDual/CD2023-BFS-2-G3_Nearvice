import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MyServicesDetailComponent } from "./my-services-detail/my-services-detail.component";
import { MyServicesHomeComponent } from "./my-services-home/my-services-home.component";
import { MyServicesNewComponent } from "./my-services-new/my-services-new.component";

const routes: Routes = [
  {
    path: "",
    component: MyServicesHomeComponent,
  },
  {
    path: "new",
    component: MyServicesNewComponent,
  },
  {
    path: ":A_ID",
    component: MyServicesDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyServicesRoutingModule {}

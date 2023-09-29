import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MyServicesHomeComponent } from "./my-services-home/my-services-home.component";

const routes: Routes = [
  {
    path: "",
    component: MyServicesHomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyServicesRoutingModule {}

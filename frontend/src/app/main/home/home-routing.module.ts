import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { HomeComponent } from "./home.component";
import { HomeDetailCardComponent } from "./home-detail-card/home-detail-card.component";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
  },
  {
    path: "/detail",
    component: HomeDetailCardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}

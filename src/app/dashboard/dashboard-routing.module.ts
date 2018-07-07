import { NgModule } from "@angular/core";
import { DashboardComponent } from "./dashboard.component";
import { RouterModule } from "@angular/router";

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: "", component: DashboardComponent, pathMatch: "full" }
    ])
  ],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}

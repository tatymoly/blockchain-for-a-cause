import { NgModule } from "@angular/core";
import { DashboardComponent } from "./dashboard.component";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { CommonModule } from "@angular/common";
import { HttpClient } from "@angular/common/http";

@NgModule({
  imports: [DashboardRoutingModule, CommonModule],
  declarations: [DashboardComponent],
  exports: [DashboardComponent],
  providers: [HttpClient]
})
export class DashboardModule {}

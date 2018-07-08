import { NgModule } from "@angular/core";
import { DashboardComponent } from "./dashboard.component";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { CommonModule } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Web3Service } from "../services/web3.service";
import { AngelTokenService } from "../services/angel-token.service";
import { AngelHackService } from "../services/angel-hack.service";

@NgModule({
  imports: [DashboardRoutingModule, CommonModule],
  declarations: [DashboardComponent],
  exports: [DashboardComponent],
  providers: [HttpClient]
})
export class DashboardModule {}

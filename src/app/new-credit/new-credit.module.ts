import { NgModule } from "@angular/core";
import { NewCreditComponent } from "./new-credit.component";
import { NewCreditRoutingModule } from "./new-credit-routing.module";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { AngelTokenService } from "../services/angel-token.service";
import { Web3Service } from "../services/web3.service";

@NgModule({
  imports: [
    NewCreditRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  declarations: [NewCreditComponent],
  exports: [NewCreditComponent],
  providers: [HttpClient, AngelTokenService, Web3Service]
})
export class NewCreditModule {}

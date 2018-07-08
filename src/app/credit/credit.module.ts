import { NgModule } from "@angular/core";
import { CreditComponent } from "./credit.component";
import { CreditRoutingModule } from "./credit-routing.module";
import { CommonModule } from "@angular/common";
import { HttpClient } from "@angular/common/http";

@NgModule({
  imports: [CreditRoutingModule, CommonModule],
  declarations: [CreditComponent],
  exports: [CreditComponent],
  providers: [HttpClient]
})
export class CreditModule {}
